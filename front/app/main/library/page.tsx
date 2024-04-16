import { LoadMore } from "@/app/ui/main/load-more";
import GameListing from "@/app/ui/main/library/game-listing";

export default async function Page() {
    return (
        <div className="container mx-auto p-2 min-h-screen">
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <GameListing />
            <LoadMore />
        </div>
    );
}