import { NextApiRequest, NextApiResponse } from "next";

import UserBilling from "../../../models/Billing";

const getUserBillingData = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId } = req.query;
  const { page, limit } = req.body;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 5;

  if (!userId) {
    return res.status(404).json({
      message: "unable to retrieve billing data without a valid id.",
      ok: false,
    });
  }

  try {
    const userBilling = await UserBilling.find({ userId })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalDocuments = await UserBilling.countDocuments({
      userId,
    });
    const totalPages = Math.ceil(totalDocuments / limitNum);

    res.status(200).json({ userBilling, pageNum, totalPages, totalDocuments });
  } catch (err) {
    res.status(500).json({ error: "An internal error has occured", ok: false });
  }
};

export default getUserBillingData;
