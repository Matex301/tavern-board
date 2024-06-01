"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "@/app/ui/main/spinner";
import { fetchGames } from "@/app/api-actions/games";
import { Game } from "@/app/types/Game";
import GameListing, { GameListingSkeleton } from "./game-listing";
import clsx from "clsx";

export function LoadGames() {
  const { ref, inView } = useInView({delay: 1000});
  const [games, setGames] = useState<Game[]>([]);
  const [end, setEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async (signal: AbortSignal) => {
    const hydra = await fetchGames(signal, page);
    setLoading(false);
    if(!hydra)
      return;

    const next = hydra["hydra:view"]?.["hydra:next"];
    if(!next)
      setEnd(true);

    const member = hydra["hydra:member"] ?? [];
    if(!member)
      return;

    setGames((prev: Game[]) => [...prev, ...member]);
    setPage(page + 1);
  };

  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      load(signal);

      return () => {
        controller.abort();
        setLoading(false);
      }
    }
  }, [inView]);

  return (
    <>
      <GameListing games={games}/>
      <div
        className={clsx("flex justify-center items-center p-4 w-full", end && "hidden")}
        ref={ref}
      >
        <Spinner />
      </div>
      <div className={clsx("text-xl font-bold text-center", !end && "hidden")}>
        No games available
      </div>
    </>
  );
}