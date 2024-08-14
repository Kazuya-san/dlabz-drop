"use server";

import {
  TournamentListingDocument,
  TournamentListingModel,
} from "@/schemas/tournament-listing.schema";
import { mongoose } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import { FileEsque } from "uploadthing/types";

const utapi = new UTApi();

interface TournamentType {
  startDate: string;
  files: FormData;
  title: string;
  description: string;
  tags: string[];
  prize: string;
  entryFee: string;
  startTime?: string | undefined;
  countdown?: string | undefined;
  teamSize?: string | undefined;
}

export const createTournament = async (tournament: TournamentType) => {
  try {
    await mongoose;
    const { files, ...rest } = tournament;
    const banner = files.get("banner");
    const response = await utapi.uploadFiles(banner as FileEsque);
    if (response) {
      const bannerUrl = response.data?.url;
      const newTournament =
        await TournamentListingModel.create<TournamentListingDocument>({
          ...rest,
          bannerUrl,
        });
      if (newTournament) {
        revalidatePath("/tournaments");
        return { success: true };
      }
    } else {
      return {
        success: false,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};
