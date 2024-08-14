import { AAA_GAMES } from "@/utils/games";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function Games() {
  return (
    <div className="sm:container py-8">
      <div className="border-l-4 border-primary pl-2 my-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Games
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AAA_GAMES.map((game, index) => {
          return (
            <Card
              key={index}
              className="w-full relative min-h-[500px] bg-cover bg-center bg-no-repeat overflow-hidden"
              style={{
                backgroundImage: `url(${game.image})`,
              }}
            >
              <div className="w-[102%] h-full absolute top-[86%]">
                <CardHeader className="backdrop-brightness-[0.1]">
                  <CardTitle>{game.name}</CardTitle>
                </CardHeader>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Games;
