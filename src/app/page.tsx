import { getEditedPersonOnCookie, getList } from "@/actions/draw";

import ParticipantRegistrationForm from "@/components/participant-registration-form";
import { Card, CardContent } from "@/components/ui/card";
import { DrawResults } from "@/components/ui/drawresults";
export default async function Home() {
    const people = await getList();
    const editedPerson = await getEditedPersonOnCookie();


    return (
        <div className="top-40 relative flex flex-col gap-5">
            <Card>
                <CardContent className="pt-5">
                    <ParticipantRegistrationForm editedPerson={editedPerson} />
                </CardContent>
            </Card>
            <DrawResults people={people} />
        </div>
    )
}