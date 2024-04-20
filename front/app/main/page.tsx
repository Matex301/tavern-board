import { LoadMore } from "@/app/ui/main/load-more";
import QuestListing from "@/app/ui/main/quest-listing";
import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "../ui/main/finder/search-game";

export default function Page() {
    return (
        <div className="container mx-auto p-2 min-h-screen relative">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <SearchGame />
                <SearchDate />
            </div>
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <QuestListing />
                <LoadMore />
        </div>
    );
}