import mongoose from "mongoose";

import { PaletteMode } from "@mui/material";

export interface User extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  signUpDate: string;
  billingHistory?: mongoose.Schema.Types.ObjectId[];
  stripeCustomerId?: string;
  theme: PaletteMode;
}

const UserSchema = new mongoose.Schema<User>(
  {
    theme: { type: String, required: false, default: "dark" },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    signUpDate: { type: String, require: true, default: "" },
    billingHistory: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    stripeCustomerId: { type: String, require: false, defualt: "" },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", UserSchema);
