"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaXTwitter } from "react-icons/fa6";
import { FaTwitch } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DatePicker } from "@/components/ui/date-picker";

const AUTH_BUTTONS = [
  {
    icon: <FaGoogle className="mr-2" size={22} />,
    name: "Google",
    providerId: "google-oauth2",
  },
  {
    icon: <FaTwitch className="mr-2" size={22} />,
    name: "Twitch",
    providerId: "twitch",
  },
  {
    icon: <FaXTwitter className="mr-2" size={22} />,
    name: "Twitter",
    providerId: "twitter",
  },
];

export default function Auth() {
  return (
    <>
      <AuthOptions />
    </>
  );
}

interface AuthOptionsProps {
  emailHandler?: (val: boolean) => void;
}

//5CCCJBTQMW1W1D7WVUBCNVN8

const AuthOptions = ({ emailHandler }: AuthOptionsProps) => {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-xl font-bold">Reserve your Gamer Tag</h1>
      </div>
      <div className="grid gap-4">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Name" />
        <Label htmlFor="gamertag">Gamer Tag</Label>
        <Input id="gamertag" placeholder="Gamer Tag" />
        <Label htmlFor="dob">Date of Birth</Label>
        <DatePicker onChange={() => {}} name={"dob"} value={new Date()} />
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
        <Button variant="default">Submit</Button>
      </div>
    </>
  );
};
