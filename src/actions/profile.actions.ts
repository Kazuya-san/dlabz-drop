"use server";
import { ProfileDocument, ProfileModel } from "@/schemas/profile.schema";
import { mongoose } from "@/utils/db";

export const createProfile = async (profile: Partial<ProfileDocument>) => {
  if (!profile.username || !profile.dob || !profile.userId)
    return { success: false };

  try {
    await mongoose;
    await ProfileModel.create<ProfileDocument>(profile);
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
  }
};

export const usernameExists = async (username: string) => {
  try {
    await mongoose;
    const profile = await ProfileModel.findOne({ username });
    if (profile) return true;
    return false;
  } catch (err) {
    console.error(err);
  }
};
