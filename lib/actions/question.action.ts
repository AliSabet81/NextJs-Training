"use server";

import { connectToDatabase } from "../mongoose";

export const createQuestion = async (params) => {
  try {
    connectToDatabase();
  } catch (error) {}
};
