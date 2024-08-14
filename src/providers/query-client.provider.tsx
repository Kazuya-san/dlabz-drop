"use client";
import {
  QueryClient,
  QueryClientProvider as TQueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TQueryClientProvider client={queryClient}>{children}</TQueryClientProvider>
  );
};
