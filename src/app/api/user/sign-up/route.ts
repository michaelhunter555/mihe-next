import { NextResponse } from "next/server";

import User, { type UserProps } from "@/models/User";

import dbConnect from "../../database/dbConnect";

export async function POST(req: Request) {
  const body = await req.json();

  const { userData } = body;
  await dbConnect();
  const existingUser = await User.findOne({ email: userData?.email });

  if (existingUser) {
    return NextResponse.json(
      { error: "User Already Exists", ok: false },
      { status: 405 }
    );
  }

  //const encryptedPassword = encryptData(userData.password);

  const newUserData: Partial<UserProps> = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    signUpDate: String(new Date()),
  };

  try {
    const user = new User(newUserData);
    await user.save();
    return NextResponse.json(
      { user, message: "Successfully created user", ok: true },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "There was an error creating a new user: ", ok: false },
      { status: 500 }
    );
  }
}
