import Map from "@/app/ui/main/map/map";
import Panel from "@/app/ui/main/map/panel";

export default async function Page() {
    return (
        <div className="flex flex-col w-full h-full relative">
            <Map />
            <Panel />
        </div>
    );
}