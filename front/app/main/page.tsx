import { LoadMore } from "@/app/ui/main/load-more";
import QuestListing from "@/app/ui/main/quest-listing";

export default async function Page() {
    return (
        <div className="container mx-auto p-2 min-h-screen relative">
            <div className="">
                <QuestListing />
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