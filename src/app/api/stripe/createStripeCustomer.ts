import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import findAuth from "@/lib/findAuth";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

const createStripeCheckout = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const { priceId, quantity } = req.body;

  const user = await findAuth(String(id), res);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  //TODO: handle promotional options

  let customer;

  if (!user.stripeCustomerId) {
    customer = await stripe.customers.create({
      email: user?.email,
      name: user?.name,
    });

    user.stripeCustomerId = customer.id;
    await user.save();
  }

  if (user?.stripeCustomerId) {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: quantity }],
        mode: "payment",
        customer: user.stripeCustomerId,
        success_url: `${req.headers.origin}/?stripe=success`,
        cancel_url: `${req.headers.origin}/?stripe=cancel`,
        metadata: {
          userId: user?._id.toString(),
          quantity: quantity,
        },
      });

      res.status(200).json({ url: session?.url, ok: true });
    } catch (err) {
      res.status(500).json({
        message: "there was an error with your request: " + err,
        ok: false,
      });
    }
  }
};
export default createStripeCheckout;
