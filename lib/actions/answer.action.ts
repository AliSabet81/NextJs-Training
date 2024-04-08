"use server";

import Answer from "@/database/answer.mode";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
  QuestionVoteParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export const createAnswer = async (params: CreateAnswerParams) => {
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

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({
      question: questionId,
    })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
  }
};

export const upVoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectToDatabase();

    const { answerId, hasdownVoted, hasupVoted, userId, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
