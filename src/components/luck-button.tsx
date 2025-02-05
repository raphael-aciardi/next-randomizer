'use client'

import { Dices } from "lucide-react"
import { Button } from "./ui/button"
import { drawPersonRandomly } from "@/actions/draw"

export default function LuckButton() {

  async function handleDrawPersonRandomly() {
    drawPersonRandomly()
  }

  return (
    <Button onClick={handleDrawPersonRandomly} className="bg-green-500 hover:bg-green-400 mt-5">
      <Dices /> Sortear
    </Button>
  )
}