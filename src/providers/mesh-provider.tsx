"use client";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components/ui/spinner";

export default dynamic(
  async function PageComponent() {
    const { MeshProvider } = await import("@meshsdk/react");
    return function PageComponentLoaded({ children }: { children: ReactNode }) {
      return <MeshProvider>{children}</MeshProvider>;
    };
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    ),
  }
);
