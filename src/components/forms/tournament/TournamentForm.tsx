"use client";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/spinner";
import { createTournament } from "@/actions/tournament.actions";
import { format, parse } from "date-fns";
import { FileUploader } from "@/components/FileUploader";
import { convertTo12Hour } from "@/lib/utils";

interface TournamentFormProps {
  children: ReactNode;
  onSubmit?: (data: TournamentFormData) => void;
}

export const formSchema = z.object({
  banner: z
    .array(z.custom<File>())
    .min(1, "Banner Image is required")
    .nonempty("Banner is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  prize: z
    .string()
    .min(1, "Prize is required")
    .refine((val) => /^\d+$/.test(val ?? ""), "Prize must be a numeric value"),
  entryFee: z
    .string()
    .min(1, "Entry fee is required")
    .refine(
      (val) => /^\d+$/.test(val ?? ""),
      "Entry fee must be a numeric value"
    ),
  startTime: z
    .string()
    .optional()
    .refine(
      (val) => /^(?:[01]?\d|2[0-3]):([0-5]\d)$/.test(val ?? ""),
      "Start time must be in H:MM or HH:MM format"
    ),
  startDate: z.date({
    message: "Start date is required",
  }),
  countdown: z
    .string()
    .optional()
    .refine(
      (val) => /^\d*$/.test(val ?? ""),
      "Countdown must be a numeric value"
    ),
  teamSize: z
    .string()
    .optional()
    .refine(
      (val) => /^\d*$/.test(val ?? ""),
      "Team size must be a numeric value"
    ),
});

export type TournamentFormData = z.infer<typeof formSchema>;

export function TournamentForm({ children }: TournamentFormProps) {
  const { toast } = useToast();
  const { mutate: submitForm, isPending: isLoading } = useMutation({
    mutationFn: createTournament,
    onSuccess: () => {
      form.reset();
      toast({
        title: "Tournament Created",
        description: "Tournament created successfully",
      });
      setTimeout(() => document.getElementById("closeDialog")?.click(), 500);
    },
  });

  const form = useForm<TournamentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      banner: [],
      title: "",
      description: "",
      tags: [],
      prize: "",
      entryFee: "0",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { startDate, banner, startTime, ...rest } = values;
    const formattedDate = format(startDate as Date, "yyyy-MM-dd");
    const formattedTimeto12 = convertTo12Hour(startTime as string);
    const formData = new FormData();
    if (values.banner && values.banner?.length > 0) {
      const blobs = [values.banner![0]].map(
        (file) => new Blob([file], { type: file.type })
      );
      formData.append("banner", blobs[0]);
    }
    const finalData = {
      ...rest,
      startDate: formattedDate,
      startTime: formattedTimeto12,
      files: formData,
    };

    submitForm(finalData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner</FormLabel>
              <FormControl>
                <FileUploader onChange={field.onChange} files={field.value} />
              </FormControl>
              <FormDescription>
                The banner image for the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Tournament Title" {...field} />
              </FormControl>
              <FormDescription>The title of the tournament.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Tournament Description" {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Comma-separated tags"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((tag) => tag.trim())
                    )
                  }
                />
              </FormControl>
              <FormDescription>
                Tags describing the tournament. eg tag1, tag2
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prize</FormLabel>
              <FormControl>
                <Input placeholder="Prize Amount" {...field} />
              </FormControl>
              <FormDescription>The prize for the tournament.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" placeholder="Start Time" {...field} />
              </FormControl>
              <FormDescription>
                The start time of the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker
                  onChange={field.onChange}
                  name={field.name}
                  value={field.value}
                  disabled={(date) =>
                    date < new Date(new Date().toDateString())
                  }
                />
              </FormControl>
              <FormDescription>
                The start date of the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entryFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Fee</FormLabel>
              <FormControl>
                <Input placeholder="Entry Fee" {...field} />
              </FormControl>
              <FormDescription>
                The entry fee for the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countdown"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Countdown</FormLabel>
              <FormControl>
                <Input placeholder="Countdown" {...field} />
              </FormControl>
              <FormDescription>
                The countdown to the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Size</FormLabel>
              <FormControl>
                <Input placeholder="Team Size" {...field} />
              </FormControl>
              <FormDescription>
                The team size for the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
          {children}
          {isLoading && <LoadingSpinner />}
        </div>
      </form>
    </Form>
  );
}
