'use client'

import { Dices } from "lucide-react"
import { Button } from "./ui/button"

export default function LuckButton() {

  return (
    <Button className="bg-green-500 hover:bg-green-400 mt-5">
      <Dices /> Sortear
    </Button>
  )
}