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
import { DatePicker } from "../../ui/date-picker";
import { createProfile, usernameExists } from "@/actions/profile.actions";
import { useToast } from "../../ui/use-toast";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "../../ui/spinner";
import { formSchema } from "./profile-form.schema";
import { debounce } from "@/lib/utils";

interface ProfileFormProps {
  children: ReactNode;
  userId: string;
}

export function ProfileForm({ children, userId }: ProfileFormProps) {
  const { toast } = useToast();
  const { mutate: registerProfile, isPending: isLoading } = useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      if (data?.success) {
        form.reset();
        toast({
          title: "Profile Updated",
          description: "Profile Updated Successfully",
        });
        setTimeout(() => document.getElementById("closeDialog")?.click(), 500);
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      dob: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerProfile({
      username: values.username,
      dob: format(values.dob, "yyyy-MM-dd"),
      userId,
      completed: true,
      // exp: 123,
      // level: 2,
      // matches: 4,
      // wins: 2,
    });
  }

  const handleUsernameChange = debounce(async (username: string) => {
    const user = await usernameExists(username);
    if (user) {
      form.setError("username", {
        type: "manual",
        message: "Username already exists",
      });
    } else {
      form.clearErrors("username");
    }
    return true;
  }, 1000);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Kaz_21"
                  {...field}
                  onChange={(e) => {
                    handleUsernameChange(e.target.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <DatePicker
                  onChange={field.onChange}
                  name={field.name}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                We use your date of birth to improve your experience.
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
