import { getList } from "@/actions/draw";
import ParticipantRegistrationForm from "@/components/participant-registration-form";
import RemovePersonButton from "@/components/remove-person-Button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

export default async function Home() {
    const people = await getList();

    return (
        <div className="top-40 relative flex flex-col gap-5 ">
            <Card>
                <CardContent className="pt-5">
                    <ParticipantRegistrationForm />
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-5 w-full">
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Posição</TableHead>
                                <TableHead>Pessoa</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {people.length > 0 ? people.map((person, index) => (
                                <TableRow key={`person-${index}-${person.name}`}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium flex items-center gap-4">
                                        <Image className="h-10 w-10 rounded-sm" src={`https://github.com/${person.usernameGithub}.png`} width={300} height={300} alt="randomly selected" />
                                        <span className="font-medium">{person.name}</span>
                                    </TableCell>
                                    <TableCell>
                                        <RemovePersonButton name={person.name} />
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell colSpan={2} className="text-center opacity-70 pt-8">Nenhum participante cadastrado</TableCell>

                            </TableRow>}

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}