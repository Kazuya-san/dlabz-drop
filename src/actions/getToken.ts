"use server";

import { api } from "@/apiHandler/fetcherBase";
import { getAccessToken } from "@auth0/nextjs-auth0";

interface SocialMedia {
  name: string;
  url: string;
}

export interface LeaderBoardEntry {
  name: string;
  xp: number;
  rank: number;
  social: SocialMedia[];
}

export const getToken = async () => {
  try {
    const token = await getAccessToken();
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const getLeaderboard = async (): Promise<{
  leaderBoard: LeaderBoardEntry[];
}> => {
  return api.get("api/leaderboard");
};
