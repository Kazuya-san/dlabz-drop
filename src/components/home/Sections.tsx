import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface SectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?:
    | "secondary"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
  buttonSize?: string;
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  sectionName: string;
  dir?: "rtl" | "ltr" | "auto";
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  buttonText,
  buttonVariant = "secondary",
  imageSrc,
  imageAlt = "Image Description",
  imageWidth = 800,
  imageHeight = 700,
  sectionName,
  dir = "auto",
}) => {
  return (
    <div className="sm:container py-8">
      <div className="border-l-4 border-primary pl-2 my-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {sectionName}
        </h1>
      </div>
      {/* Grid */}
      <div
        className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center"
        dir={dir}
      >
        <div className={`${dir === "rtl" ? "text-left" : ""}`}>
          <h1 className="scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm tracking-wide">{description}</p>
          {/* Buttons */}
          <div className="mt-7 grid gap-3 sm:inline-flex">
            <Button variant={buttonVariant} size={"lg"}>
              {buttonText}
            </Button>
          </div>
        </div>
        {/* Col */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-md"
            src={imageSrc}
            width={imageWidth}
            height={imageHeight}
            alt={imageAlt}
          />
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default Section;
