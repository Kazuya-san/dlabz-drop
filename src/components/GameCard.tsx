import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type GameCardProps = {
  url: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  prize: string;
  entryFee: string;
  startTime?: string;
  startDate?: string;
  countdown?: string;
  teamSize?: string;
  tournamentPath?: string;
};

const tagColors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

const GameCard: React.FC<GameCardProps> = ({
  url,
  title,
  description,
  image,
  tags,
  prize,
  entryFee,
  startTime,
  startDate,
  countdown,
  teamSize,
  tournamentPath,
}) => {
  return (
    <Card
      className="w-full h-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      <div className="w-full h-full backdrop-brightness-[0.15]">
        {/* <a
          href={`https://www.checkmategaming.com${tournamentPath}`}
          target="_blank"
        > */}
        <CardHeader>
          <CardTitle>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {image ? (
              <img src={image} alt={title} className="w-38 h-24" />
            ) : (
              title
            )}
          </CardTitle>
          <CardDescription className="font-bold text-white">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 font-semibold">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded uppercase ${
                  tagColors[index % 6]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          {startTime && (
            <div className="text-white">Start Time: {startTime}</div>
          )}
          {startDate && (
            <div className="text-white">Start Date: {startDate}</div>
          )}
          {countdown && (
            <div className="text-white">Countdown: {countdown}</div>
          )}
          {teamSize && <div className="text-white">Team Size: {teamSize}</div>}
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center mt-2 gap-3">
            <span className="text-lg font-bold">{prize}</span>
            <span className="text-lg font-bold">{entryFee}</span>
          </div>
        </CardFooter>
        {/* </a> */}
      </div>
    </Card>
  );
};

export default GameCard;
