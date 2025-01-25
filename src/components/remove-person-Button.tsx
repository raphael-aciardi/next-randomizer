'use client'

import { removePerson } from "@/actions/draw"
import { Button } from "./ui/button"
interface RemovePersonButtonProps {
  name: string; 
}

export default function RemovePersonButton({ name }: RemovePersonButtonProps) {
  async function handleRemovePerson() {
    await removePerson(name)
  }

  return (
    <Button onClick={handleRemovePerson} className="bg-red-500 hover:bg-red-400">Remover</Button>
  )
}