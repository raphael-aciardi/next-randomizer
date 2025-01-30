'use client'

import { removePerson } from "@/actions/draw"
import { Button } from "./ui/button"
import { Trash } from "lucide-react";
interface RemovePersonButtonProps {
  id: string; 
}

export default function RemovePersonButton({ id }: RemovePersonButtonProps) {
  async function handleRemovePerson() {
    await removePerson(id)
  }

  return (
    <Button onClick={handleRemovePerson} className="bg-red-500 hover:bg-red-400"> Remover <Trash /> </Button>
  )
}