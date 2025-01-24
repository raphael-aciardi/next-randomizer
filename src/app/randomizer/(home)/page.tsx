import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";



export default async function Home() {
    return (
        <div className="h-[99px] px-32 top-44 relative ">
            <Card className="px-5 h-full flex items-center justify-between">
                <form className="grid grid-cols-9  gap-4 w-full" action="">
                    <div className="col-span-4 flex flex-col gap-2">
                        <label className="font-semibold" htmlFor="">Nome</label>
                        <Input placeholder="Nome do participante" />
                    </div>
                    <div className="col-span-4 flex flex-col gap-2">
                        <label className="font-semibold">Username do Github</label>
                        <Input placeholder="Nome do participante" />
                    </div>
                    <div className="h-full col-span-1 flex items-end justify-center">
                        <Button className="px-10 w-36" type="submit">Adicionar</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}