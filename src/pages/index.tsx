// import { Badge } from "@/components/ui/badge";
// import { LoadingSpinner } from "@/components/ui/spinner";
// import useConnectedWallet from "@/hooks/useWallet";
// import { Button } from "@/components/ui/button";
// import { useEffect, useLayoutEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter } from "next/navigation";

// export default function ConnectWallet() {
//   const router = useRouter();
//   const {
//     connected,
//     asset,
//     loading,
//     connect,
//     wallets,
//     disconnect,
//     name,
//     assets,
//   } = useConnectedWallet();
//   const [selectedWallet, setSelectedWallet] = useState<string>(name);

//   useEffect(() => {
//     if (name.length > 0) {
//       setSelectedWallet(name);
//     }
//   }, [name]);

//   useLayoutEffect(() => {
//     if (asset) {
//       router.replace("/reservation");
//     }
//   }, [asset, router]);

//   return (
//     <div className="flex flex-col gap-4 justify-center items-center h-screen">
//       <Select
//         disabled={connected}
//         value={selectedWallet}
//         onValueChange={(value) => setSelectedWallet(value)}
//       >
//         <SelectTrigger className="w-[200px]">
//           <SelectValue placeholder="Select a wallet" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>Wallets</SelectLabel>
//             {wallets.map((wallet) => (
//               <SelectItem key={wallet.name} value={wallet.id}>
//                 {wallet.name}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       {!asset && connected && assets && (
//         <Badge variant={"destructive"}>Sorry, You aren&apos;t a Katz</Badge>
//       )}
//       <Button
//         onClick={() => {
//           if (connected) {
//             disconnect();
//           } else {
//             if (selectedWallet === "") return;
//             connect(selectedWallet);
//           }
//         }}
//         disabled={selectedWallet === ""}
//       >
//         {connected ? "Disconnect" : "Connect"}
//       </Button>
//     </div>
//   );
// }

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import useConnectedWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function AuthLayout() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 2) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  return (
    <div className="w-full grid min-h-[100dvh] md:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[250px] lg:w-[350px] xs:w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-xl font-bold">Reserve your Gamer Tag</h1>
          </div>
          <div className="grid gap-4">
            {step === 1 && (
              <>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" />
                <div className="w-full flex items-center justify-center">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" />
                <Label htmlFor="gamertag">Gamer Tag</Label>
                <Input id="gamertag" placeholder="Gamer Tag" />
                <Label htmlFor="dob">Date of Birth</Label>
                <DatePicker
                  onChange={() => {}}
                  name={"dob"}
                  value={new Date()}
                />
              </>
            )}

            {step === 1 ? (
              <Button variant="default" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="default" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted md:block top-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.pinimg.com/originals/1d/46/27/1d4627f8b0a294c5e98e87f6cdbeaa8d.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
