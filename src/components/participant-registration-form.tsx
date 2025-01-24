'use client'

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { drawAction } from "@/actions/draw";



export default function ParticipantRegistrationForm() {
    const [errorName, setErrorName] = useState<string [] | null>(null)
    const [errorGithub, setErrorGithub] = useState<string [] | null>(null)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const response = await drawAction(formData);
        
       if(!response.success && response.errors) {
          if(response.errors.name) setErrorName(response.errors.name)
            else setErrorName(null)
          if(response.errors.usernameGithub) setErrorGithub(response.errors.usernameGithub)
            else setErrorGithub(null)
       } else {
          setErrorName(null)
          setErrorGithub(null)
       }
    }

    return (
        <div>
            <form className="flex gap-4 items-end" onSubmit={handleSubmit}>
                <div className={`flex-1 flex flex-col gap-2 ${errorGithub ? 'border-1 border-red-400 self-start' : ''}`}>
                    <label className="font-semibold" htmlFor="name">Nome</label>
                    <Input placeholder="Nome do participante" id="name" name="name"/>
                    {errorName && <span className="text-red-400">{errorName}</span>}
                </div>
                <div className={`flex-1 flex flex-col gap-2 ${errorName ? 'border-1 border-red-400 self-start' : ''}`}>
                    <label className="font-semibold">Username do Github</label>
                    <Input placeholder="Nome do participante" name="usernameGithub"/>
                    {errorGithub && <span className="text-red-400">{errorGithub}</span>}
                </div>
                <Button type="submit" className={`${errorName || errorGithub ? 'self-center' : ''}`}>
                    <Plus />
                    Adicionar
                </Button>
            </form>
        </div>
    )
}
