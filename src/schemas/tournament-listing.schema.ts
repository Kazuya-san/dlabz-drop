import { Document, Schema, model, models } from "mongoose";

export interface TournamentListingDocument extends Document {
  bannerUrl: string;
  title: string;
  description: string;
  tags: string[];
  prize: string;
  entryFee: string;
  startTime?: string;
  startDate?: Date | string;
  teamSize?: string;
}

const TournamentListingSchema = new Schema<TournamentListingDocument>({
  bannerUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  prize: { type: String, required: true },
  entryFee: { type: String, required: true },
  startTime: { type: String, required: false },
  startDate: { type: String, required: false },
  teamSize: { type: String, required: false },
});

export const TournamentListingModel =
  models.TournamentListing ||
  model("TournamentListing", TournamentListingSchema);
