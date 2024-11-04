"use server";

import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    connectToDatabase();

    const { userId, questionId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        return console.log("User has already viewed");
      } else {
        await Interaction.create({
          user: userId,
          action: "view",
          question: questionId,
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
