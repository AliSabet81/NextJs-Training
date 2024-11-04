"use server";

import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import User from "@/database/user.mode";
import Question from "@/database/question.model";
// @ts-ignore
import { FilterQuery } from "mongoose";
import Interaction from "@/database/interaction.model";

export const getTopIntractedTags = async (
  params: GetTopInteractedTagsParams
) => {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("user not found");
    }

    // Find user's intractions
    const userIntractions = await Interaction.find({ user: user._id })
      .populate("tags")
      .exec();

    // group array of intraction tas by name id and count
    const groupedByTag = userIntractions.reduce((acc, item) => {
      item.tags.forEach((tag: ITag) => {
        const _id = tag._id;
        const name = tag.name;
        const key = `${_id}_${name}`;
        if (!acc[key]) {
          acc[key] = { _id, name, count: 0 };
        }
        acc[key].count++;
      });
      return acc;
    }, {});
    const groupedArray = Object.values(groupedByTag);

    // sort grouped tag by its count
    const sortedTags = groupedArray.sort(
      (
        a: { _id: string; name: string; count: number },
        b: { _id: string; name: string; count: number }
      ) => b.count - a.count
    );
    const topTwoTags = sortedTags.slice(0, 2);
    
    return topTwoTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOption = {};

    switch (filter) {
      case "popular":
        sortOption = { questions: -1 };
        break;
      case "recent":
        sortOption = { createdOn: -1 };
        break;
      case "name":
        sortOption = { name: 1 };
        break;
      case "old":
        sortOption = { createdOn: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query)
      .sort(sortOption)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await Question.countDocuments(query);
    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuestionByTagId = async (params: GetQuestionsByTagIdParams) => {
  try {
    connectToDatabase();

    const { tagId, searchQuery, page = 1, pageSize = 9 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ title: { $regex: new RegExp(searchQuery, "i") } }];
    }
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: "Tag", select: "_id name" },
        { path: "author", model: "User", select: "_id clerkId name picture" },
      ],
    });
    if (!tag) {
      throw new Error("Tag not found");
    }

    const isNext = tag.questions.length > pageSize;
    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopPopularTags = async () => {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
    ]).limit(5);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
