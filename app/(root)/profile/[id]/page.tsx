import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUserInfo({ userId: params.id });
  return <div>Page</div>;
};

export default Page;
