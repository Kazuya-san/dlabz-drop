import GameCard from "@/components/GameCard";
import { data } from "@/utils/games";

async function Event() {
  return (
    <div className="sm:container py-8">
      <div className="border-l-4 border-primary pl-2 my-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Events & Tournaments
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((i: any, index: number) => (
          <GameCard
            key={index}
            url={"https://utfs.io/f/db1e4b07-fe43-4a97-8506-af680cfa03eb-1svj1"}
            title={i.groupName}
            description={i.name}
            image={i.gameImageUrl}
            tags={["NOVICE", "Amateur", "VETERAN", "PRO"]}
            prize={`$${i.prize} PRIZE`}
            entryFee={i.cost > 0 ? `$${i.cost} ENTRY` : "FREE ENTRY"}
            startDate={i.startTime}
            tournamentPath={i.tournamentPath}
          />
        ))}
      </div>
    </div>
  );
}

export default Event;
