"use client";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/spinner";
// import useConnectedWallet from "@/hooks/useWallet";
import dynamic from "next/dynamic";
import useConnectedWallet from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
export default dynamic(
  async function PageComponent() {
    const { default: useConnectedWallet } = await import("@/hooks/useWallet");
    return function ConnectWallet() {
      const router = useRouter();
      const {
        connected,
        asset,
        loading,
        connect,
        wallets,
        disconnect,
        name,
        assets,
      } = useConnectedWallet();
      const [selectedWallet, setSelectedWallet] = useState<string>(name);

      useEffect(() => {
        if (name.length > 0) {
          setSelectedWallet(name);
        }
      }, [name]);

      useLayoutEffect(() => {
        if (asset) {
          router.replace("/reservation");
        }
      }, [asset, router]);

      return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
          <Select
            disabled={connected}
            value={selectedWallet}
            onValueChange={(value) => setSelectedWallet(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Wallets</SelectLabel>
                {wallets.map((wallet) => (
                  <SelectItem key={wallet.name} value={wallet.id}>
                    {wallet.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {!asset && connected && assets && (
            <Badge variant={"destructive"}>Sorry, You aren&apos;t a Katz</Badge>
          )}
          <Button
            onClick={() => {
              if (connected) {
                disconnect();
              } else {
                if (selectedWallet === "") return;
                connect(selectedWallet);
              }
            }}
            disabled={selectedWallet === ""}
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      );
    };
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <h1>Loading Wallets...</h1>
        <LoadingSpinner />
      </div>
    ),
  }
);
