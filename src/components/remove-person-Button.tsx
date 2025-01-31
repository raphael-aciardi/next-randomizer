'use client'

import { editPerson, removePerson } from "@/actions/draw"
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
    const updatedList = await editPerson(id); 
    console.log(updatedList);
  }
  

  return (
    <div>
      <Button onClick={handleRemovePerson} className="bg-red-500 hover:bg-red-400"> Remover <Trash /> </Button>
      <Button onClick={handleEditPerson}> Editar <Pencil /> </Button>
    </div>
  )
}