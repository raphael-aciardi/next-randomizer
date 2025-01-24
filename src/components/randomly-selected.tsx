import Image from "next/image";

export default function RandomlySelected() {
    return (
        <div className="flex">
            <Image className="rounded-sm w-40" src="https://github.com/raphael-aciardi.png" width={300} height={300} alt="randomly selected" />
            <h1>Raphael</h1>
            <span>Primeiro Sorteado</span>
        </div>
    )
}