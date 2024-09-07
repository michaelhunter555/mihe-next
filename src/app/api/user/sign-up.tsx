import { NextApiRequest, NextApiResponse } from "next";

import User, { type User as UserProps } from "@/models/User";
import { encryptData } from "@/utils/encryption/encryptData";

import dbConnect from "../database/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { userData } = req.body;
  await dbConnect();
  const existingUser = await User.findOne({ email: userData?.email });

  if (existingUser) {
    return res.status(404).json({ message: "User already exists", ok: false });
  }

  const encryptedPassword = encryptData(userData.password);

  const newUserData: Partial<UserProps> = {
    name: userData.name,
    email: userData.email,
    password: encryptedPassword,
    signUpDate: String(new Date()),
  };

  try {
    const newUser = new User(newUserData);
    await newUser.save();

    res
      .status(201)
      .json({ newUser, message: "Successfully created User", ok: true });
  } catch (err) {
    res.status(500).json({
      error: "There was an error creating a new user: " + err,
      ok: false,
    });
  }
}
