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
  const { asset, assets, connected } = useConnectedWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full grid min-h-[100dvh] md:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[250px] lg:w-[350px] xs:w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-xl font-bold">Reserve your Gamer Tag</h1>
          </div>
          <div className="grid gap-4">
            {/* <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" />
            <Label htmlFor="gamertag">Gamer Tag</Label>
            <Input id="gamertag" placeholder="Gamer Tag" />
            <Label htmlFor="dob">Date of Birth</Label>
            <DatePicker onChange={() => {}} name={"dob"} value={new Date()} /> */}
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
            <Button variant="default">Next</Button>
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
