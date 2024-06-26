"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "@/app/ui/main/spinner";
import { fetchQuests } from "@/app/api-actions/quests";
import QuestListing, { QuestListingSkeleton } from "@/app/ui/main/quests/quest-listing";
import { Quest } from "@/app/types/Quest";
import clsx from "clsx";

export function MainQuests({quests, setQuests, date, game, tavern}: {quests: Quest[], setQuests: Dispatch<SetStateAction<Quest[]>>, date: Date | undefined, game: string | undefined, tavern: string | undefined}) {
  const { ref, inView } = useInView({delay: 1000});
  const [end, setEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async (signal: AbortSignal) => {

    const hydra = await fetchQuests(signal, page, date, game, tavern);
    setLoading(false);
    if(!hydra)
      return;

    const next = hydra["hydra:view"]?.["hydra:next"];
    if(!next)
      setEnd(true);

    const member = hydra?.["hydra:member"] ?? [];
    if(!member)
      return;

    setQuests((prev: Quest[]) => [...prev, ...member]);
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
      }
    }
  }, [inView]);

  useEffect(() => {
      setEnd(false);
      setPage(1);
      setQuests([]);
  }, [date, game, tavern]);

  return (
    <>
      <QuestListing quests={quests}/>
      <div
        className={clsx("flex justify-center items-center p-4 w-full", end && "hidden")}
        ref={ref}
      >
        <Spinner />
      </div>
      <div className={clsx("text-xl font-bold text-center", !end && "hidden")}>
        No quests available
      </div>
    </>
  );
}