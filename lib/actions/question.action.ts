"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { GetQuestionParams } from "./shared.types";

export const getQuestions = async (params:GetQuestionParams) => {
  const { page } = params;
}

export const createQuestion = async (params: any) => {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocument = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: {
            question: question._id,
          },
        },
        { upsert: true, new: true }
      );
      tagDocument.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    });
  } catch (error) {}
};
