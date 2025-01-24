import { dateToday } from "@/lib/utils";

export default function Header() {


    return (
        <header className="absolute w-full bg-bannerImg h-[12.5rem] items-center">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 pt-11">
                <div>
                    <h1 className="text-4xl font-bold">Sorteio Da Daily 🍀</h1>
                    <p className="opacity-70">Gere uma sequência de pessoas aleatórias</p>
                </div>
                <span className="opacity-70">{dateToday()}</span>
            </div>
        </header>
    )
}