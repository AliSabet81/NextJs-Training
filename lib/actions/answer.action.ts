"use server";

import Answer from "@/database/answer.mode";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export const createAswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase();

    const { author, content, question, path } = params;

    const newAnswer = new Answer({
      content,
      author,
      question,
    });

    await newAnswer.save();

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};
