import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import UserBilling from "@/models/Billing";

import User from "../../../models/User";
import dbConnect from "../database/dbConnect";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function stripeWebhook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buffers = await buffer(req);
  //console.log("BUFFER:", { buff: buffers, head: req.headers });
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buffers,
      sig as string,
      String(process.env.STRIPE_WEBHOOK_SECRET)
    );
    await dbConnect();

    switch (event.type) {
      case "checkout.session.completed":
        {
          const session = event.data.object as Stripe.Checkout.Session;

          const user = await User.findOne({
            stripeCustomerId: String(session?.customer),
          });

          if (user) {
            const billingData = {
              userId: user?._id,
              billingReason: "purchase",
              amountPaid: session?.amount_total,
            };

            const newPurchaseAction = new UserBilling(billingData);
            await newPurchaseAction.save();
            user?.billingHistory?.push(newPurchaseAction._id);
            await user.save();
          }
        }
        break;
      default:
        console.log("no callback...");
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error(`Webhook Error: ${err}`);
    res.status(400).send(`Webhook Error: ${err}`);
  }
}
