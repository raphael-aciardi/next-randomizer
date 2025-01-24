import { dateToday } from "@/lib/utils";

export default function Header() {
    return (
        <div className="absolute w-full bg-bannerImg h-[12.5rem] items-center">
            <header className="flex justify-between h-full items-center px-32">
                <div>
                    <h1 className="text-4xl font-bold">Sorteio Da Daily 🍀</h1>
                    <p className="opacity-70">Gere uma sequência de pessoas aleatórias</p>
                </div>
                <span  className="opacity-70 px-10">{dateToday()}</span>
            </header>
        </div>


    )
}