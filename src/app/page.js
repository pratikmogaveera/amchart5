// import Chart from "@/components/Chart";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("../components/Chart"), { ssr: false });

export default function Home() {
    return (
        <main className="bg-muted h-screen w-full pt-10 md:pt-20 px-4 md:px-20 mx-auto">
            <div>
                <h1 className="text-5xl font-bold mb-4">Amchart 5</h1>
                <div className="w-full h-[250px] md:h-[500px] border-2 p-4 rounded-lg bg-white">
                    <Chart />
                </div>
            </div>
        </main>
    );
}
