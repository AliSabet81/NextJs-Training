"use server";
import Answer from "@/database/answer.mode";
import Question from "@/database/question.model";
import User from "@/database/user.mode";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";

const SearchableTypes = ["question", "answer", "user", "tag"];

export const globalSearch = async (params: SearchParams) => {
  try {
    connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndType = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];
    const typeLower = type?.toLowerCase();
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelsAndType) {
        const quesryResult = await model
          .find({ [searchField]: regexQuery })
          .limit(2);
        results.push(
          ...quesryResult.map((item: any) => ({
            title:
              type === "answer"
                ? `Answers contaning ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndType.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error("invalid search type");
      }
      const queryResult = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResult.map((item: any) => ({
        title:
          type === "answer"
            ? `Answers contaning ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw error;
  }
};
