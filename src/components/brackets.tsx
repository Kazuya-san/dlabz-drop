"use client";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";

const URL = "/api/brackets";

function Bracket() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function render() {
      const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          return data.brackets;
        });

      (window as any).bracketsViewer.render({
        stages: data.stage,
        matches: data.match,
        matchGames: data.match_game,
        participants: data.participant,
      });
    }
    render();
  }, []);

  return <div className="brackets-viewer">{loading && <LoadingSpinner />}</div>;
}

export default Bracket;
