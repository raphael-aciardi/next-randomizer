"use server";

import { cookies } from "next/headers";
import { z } from "zod";

export type Person = {
  id: string;
  name: string;
  usernameGithub: string;
};

export async function drawAction(data: FormData) {
  const schema = z.object({
    name: z.string().trim().min(3, "O nome precisa ter pelo menos 3 caracteres"),
    usernameGithub: z.string().trim().min(3, "O username precisa ter pelo menos 3 caracteres"),
  });

  const parsed = schema.safeParse(Object.fromEntries(data));

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { success: false, errors };
  }

  const { name, usernameGithub } = parsed.data;
  const cookieStore = await cookies();
  const editedPerson = await getEditedPersonOnCookie();
  const currentList: Person[] = JSON.parse(cookieStore.get("listPeople")?.value ?? "[]");

  if (editedPerson !== null) {
    const updatedList = currentList.map((person) =>
      person.id === editedPerson.id ? { ...person, name, usernameGithub } : person
    );

    cookieStore.set("listPeople", JSON.stringify(updatedList), {maxAge: 5*365*24*60*60});
  } else {
    const newPerson: Person = { id: Date.now().toString(), name, usernameGithub };
    cookieStore.set("listPeople", JSON.stringify([...currentList, newPerson]), {maxAge: 5*365*24*60*60});
  }

  cookieStore.delete("editedPerson");
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
  cookieStore.set("listPeople", JSON.stringify(newList), {maxAge: 5*365*24*60*60});
}

export async function setEditedPersonIdOnCookie(id: string) {
  const cookieStore = await cookies();
  cookieStore.set("editedPerson", JSON.stringify(id));
}

export async function getEditedPersonOnCookie() {
  const cookieStore = await cookies();
  let editedPersonId = cookieStore.get("editedPerson")?.value as string | undefined;

  if (!editedPersonId) return null;

  editedPersonId = JSON.parse(editedPersonId) as string;

  const currentList = JSON.parse(
    cookieStore.get("listPeople")?.value ?? "[]"
  ) as Person[];
  const person = currentList.find((person: Person) => person.id === editedPersonId) as Person;

  if (person === undefined) {
    return null
  }

  return person
}

export async function drawPersonRandomly() {
  const cookieStore = await cookies();
  const currentList = JSON.parse(
    cookieStore.get("listPeople")?.value ?? "[]"
  ) as Person[];

  for (let i = currentList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentList[i], currentList[j]] = [currentList[j], currentList[i]];
  }

  return currentList;
}



