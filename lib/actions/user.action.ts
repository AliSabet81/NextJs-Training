"use server";

import User from "@/database/user.mode";
import { connectToDatabase } from "../mongoose";

export const GetUserById = async (params: any) => {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error
  }
};
