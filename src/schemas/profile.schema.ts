import { Schema, model, models } from "mongoose";

export interface ProfileDocument {
  userId: string;
  username: string;
  dob: Date | string;
  completed?: boolean;
  exp?: number;
  level?: number;
  matches?: number;
  wins?: number;
  socials?: {
    discord?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    twitch?: string;
    youtube?: string;
  };
}

const ProfileSchema = new Schema<ProfileDocument>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  dob: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  exp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  matches: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  socials: {
    discord: { type: String, required: false },
    twitter: { type: String, required: false },
    instagram: { type: String, required: false },
    facebook: { type: String, required: false },
    twitch: { type: String, required: false },
    youtube: { type: String, required: false },
  },
});

export const ProfileModel = models.Profile || model("Profile", ProfileSchema);
