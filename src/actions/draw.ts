"use server";

import { cookies } from "next/headers";
import { z } from "zod";

type Person = {
  id: string;
  name: string ;
  usernameGithub: string;
};

export async function drawAction(data: FormData) {
  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(3, "O nome precisa ter pelo menos 3 caracteres"),
    usernameGithub: z
      .string()
      .trim()
      .min(3, "O username precisa ter pelo menos 3 caracteres"),
  });
  const parsed = schema.safeParse(Object.fromEntries(data));

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { success: false, errors };
  }

  const { name, usernameGithub } = parsed.data;
  const person = { id: Math.random() * Date.now(), name, usernameGithub };

  const cookieStore = await cookies();
  const currentList = JSON.parse(cookieStore.get("listPeople")?.value ?? "[]");
  const newList = [...currentList, person];

  cookieStore.set("listPeople", JSON.stringify(newList));

  return { success: true, errors: null };
}

export async function getList() {
  const cookieStore = await cookies();
  const currentList = JSON.parse(cookieStore.get("listPeople")?.value ?? "[]");
  return currentList as Person[];
}

export async function removePerson(id: string) {
  const cookieStore = await cookies();
  const currentList = JSON.parse(
    cookieStore.get("listPeople")?.value ?? "[]"
  ) as Person[];
  const newList = currentList.filter((person) => person.id !== id);
  cookieStore.set("listPeople", JSON.stringify(newList));
}

export async function editPerson(id: string, data: FormData) {
  const cookieStore = await cookies();
  const currentList = JSON.parse(
    cookieStore.get("listPeople")?.value ?? "[]"
  ) as Person[];
  const person = currentList.find((person) =>  (person.id === id)) as Person;
  person.name? = data.get("name");
  person.usernameGithub = data.get("usernameGithub") as string;
  return person
}
