'use client'

import { Pencil } from "lucide-react"
import { Button } from "./ui/button"

interface EditPersonButtonProps{
  name: string
}

export default function EditPersonButton({ name }: EditPersonButtonProps) {
  return (
    <Button>Editar <Pencil /></Button>
  )
}