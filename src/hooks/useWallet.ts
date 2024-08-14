import { useEffect, useState } from "react";
import { useAssets, useWallet, useWalletList } from "@meshsdk/react";

const useConnectedWallet = () => {
  const { connect, connected, disconnect, name } = useWallet();
  const [loading, setLoading] = useState(true);
  const wallets = useWalletList();
  const assets = useAssets();
  const policyId = "d34743543ccbda22bb948400a4a919b7b54e82123030702e38cc62b6";

  useEffect(() => {
    if (connected) {
      if (assets) setLoading(false);
    } else {
      setLoading(false);
    }
  }, [assets, connected]);

  useEffect(() => {
    const wallet = localStorage.getItem("walletName") as string;
    if (wallet && wallet?.length > 0) {
      connect(wallet);
    }
  }, [connect]);

  useEffect(() => {
    localStorage.setItem("walletName", name);
  }, [name]);

  const asset =
    assets && assets?.find((asset: any) => asset.policyId === policyId);

  return {
    connected,
    name,
    asset,
    connect,
    disconnect: () => {
      disconnect();
      localStorage.setItem("walletName", "");
    },
    wallets,
    loading,
    assets,
  };
};

export default useConnectedWallet;
