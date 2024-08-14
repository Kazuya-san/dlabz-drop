import React from "react";
import Image from "next/image";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  return (
    <div className="bg-background border-t flex flex-col justify-center w-full bg-no-repeat bg-top pt-5 z-50">
      <div className="bg-dark w-full flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://dl-one.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-footer.b49f032a.png&w=48&q=75"
          alt="desturction-labs-logo"
          className="w-[20px] h-[40px] md:w-[35px] md:h-[60px]"
        />{" "}
      </div>
      <div className="flex md:flex-row flex-col items-center gap-4 mb-6 mt-5 justify-around w-full">
        <div className="text-foreground text-sm text-center flex w-full items-center justify-center">
          © {new Date().getFullYear()} Destruction Labz, All rights reserved.
        </div>
        <div className="flex w-full mt-2 md:mt-0 text-foreground items-center justify-center gap-4">
          <a
            href="https://twitter.com/destructionlabz"
            target="_blank"
            aria-label="Twitter"
          >
            <IoLogoTwitter size={26} />
          </a>
        </div>
        <div className="flex w-full text-sm mt-2 md:mt-0 items-center justify-center gap-2 text-foreground">
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
