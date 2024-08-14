import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="sm:container w-full !max-w-[1380px] py-8 dark:md:bg-primary rounded-lg">
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <h1 className="scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to the Ultimate Gaming Experience
          </h1>
          <p className="mt-3 text-sm tracking-wide">
            Explore a world of endless possibilities and immerse yourself in the
            best gaming content available. Join us now and start your gaming
            journey!
          </p>
          {/* Buttons */}
          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <Button variant={"secondary"} size={"lg"}>
              Get started
            </Button>
          </div>
        </div>
        {/* Col */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-md object-cover h-[400px]"
            src="https://i.pinimg.com/originals/1d/46/27/1d4627f8b0a294c5e98e87f6cdbeaa8d.jpg"
            alt="Image Description"
          />
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default Hero;
