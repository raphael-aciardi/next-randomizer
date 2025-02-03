'use client'

import { removePerson, setEditedPersonOnCookie } from "@/actions/draw"
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
    await setEditedPersonOnCookie(id);
  }


  return (
    <div className="space-x-2">
      <Button onClick={handleRemovePerson} className="bg-red-500 hover:bg-red-400"><Trash /> Remover </Button>
      <Button onClick={handleEditPerson}><Pencil /> Editar</Button>
    </div>
  )
}