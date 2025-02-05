'use client'

import { removePerson, setEditedPersonIdOnCookie } from "@/actions/draw"
import { Button } from "./ui/button"
import { Pencil, Trash } from "lucide-react";
interface ActionsPersonButtonProps {
  id: string;
}

export default function ActionsPersonButton({ id }: ActionsPersonButtonProps) {
  async function handleRemovePerson() {
    await removePerson(id)
  }

  async function handleEditPerson() {
    await setEditedPersonIdOnCookie(id);
  }


  return (
    <div>
      <Button onClick={handleEditPerson} variant={"ghost"} size={'icon'}>
        <Pencil className="text-primary" />
      </Button>
      <Button onClick={handleRemovePerson} variant={"ghost"} size={'icon'}>
        <Trash className="text-red-500" />
      </Button>
    </div>
  )
}