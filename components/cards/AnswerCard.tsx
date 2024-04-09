import Link from "next/link";
import React from "react";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";
import { IQuestion } from "@/database/question.model";

interface AnswerProps {
  _id: string;
  question: IQuestion;
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
  clerkId?: string | null;
}

const AnswerCard = ({
  _id,
  author,
  upvotes,
  question,
  createdAt,
  clerkId,
}: AnswerProps) => {
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper block rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>
        {/* If signed in add edit delete actions */}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes)}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
