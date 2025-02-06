'use client'

import { Card, CardContent } from "./card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { drawPersonRandomly, Person } from "@/actions/draw"
import Image from "next/image"
import ActionsPersonButton from "../remove-person-Button"
import { Separator } from "./separator"
import { Button } from "./button"
import { Dices } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type DrawResultsProps = {
    people: Person[]
}


export function DrawResults({ people }: DrawResultsProps) {
    const [randomList, setRandomList] = useState(people)
    const [clickButton, setClickButton] = useState(0)

    async function handleDrawPersonRandomly() {
        const drawPerson = await drawPersonRandomly()
        setRandomList(drawPerson)
        setClickButton(1)
        if (people.length > 1) {
            toast.success("A ordem dos participantes foi sorteada!")
        } else {
            toast.error("É preciso ter pelo menos 2 ou mais participantes para sortear!")
        }
    }

    return (
        <div>
            <Card>
                <CardContent className="pt-5 w-full flex flex-col items-center">
                    <h1 className="text-2xl font-semibold">Participantes do Sorteio da Daily</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Participantes</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {people.length > 0 ? people.map((person, index) => (
                                <TableRow key={`person-${index}-${person.name}`}>
                                    <TableCell className="font-medium flex items-center gap-4">
                                        <Image className="h-10 w-10 rounded-sm" src={`https://github.com/${person.usernameGithub}.png`} width={300} height={300} alt="randomly selected" />
                                        <span className="font-medium">{person.name}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ActionsPersonButton id={person.id} />
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell colSpan={3} className="text-center opacity-70 pt-8">Nenhum participante cadastrado</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                    <Separator />
                </CardContent>
            </Card>
            <div className="w-full h-full flex items-center justify-center mt-4 mb-4">
                <Button onClick={handleDrawPersonRandomly} className="bg-green-500 hover:bg-green-400">
                    <Dices /> Sortear
                </Button>
            </div>
            {clickButton === 1 && randomList.length > 0 ? (
                <Card>
                    <CardContent className="pt-5 w-full flex flex-col items-center">
                        <h1 className="text-2xl font-semibold">Posição dos Sorteados</h1>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Posição</TableHead>
                                    <TableHead>Pessoa</TableHead>
                                 
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {randomList.length > 0 ? randomList.map((person, index) => (
                                    <TableRow key={`person-${index}-${person.name}`}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium flex items-center gap-4">
                                            <Image className="h-10 w-10 rounded-sm" src={`https://github.com/${person.usernameGithub}.png`} width={300} height={300} alt="randomly selected" />
                                            <span className="font-medium">{person.name}</span>
                                        </TableCell>
                                    </TableRow>
                                )) : <TableRow>
                                    <TableCell colSpan={3} className="text-center opacity-70 pt-8">Nenhum participante cadastrado</TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>
                        <Separator />
                    </CardContent>
                </Card>
            ) : null}
        </div>
    )
}