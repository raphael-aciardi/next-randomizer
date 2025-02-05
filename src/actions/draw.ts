"use server";

import { cookies } from "next/headers";
import { z } from "zod";

export type Person = {
  id: string;
  name: string ;
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

  if (editedPerson) {
    // Atualiza o usuário existente
    const updatedList = currentList.map((person) => 
      person.id === editedPerson.id ? { ...person, name, usernameGithub } : person
    );

    cookieStore.set("listPeople", JSON.stringify(updatedList));
  } else {
    // Cria um novo usuário
    const newPerson: Person = { id: Date.now().toString(), name, usernameGithub };
    cookieStore.set("listPeople", JSON.stringify([...currentList, newPerson]));
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
  cookieStore.set("listPeople", JSON.stringify(newList));
}

export async function setEditedPersonOnCookie(id: string) {
  const cookieStore = await cookies();
  const currentList = JSON.parse(
    cookieStore.get("listPeople")?.value ?? "[]"
  ) as Person[];
  const person = currentList.find((person) =>  (person.id === id)) as Person;
  
  cookieStore.set("editedPerson", JSON.stringify(person));
}

export async function getEditedPersonOnCookie() {
  const cookieStore = await cookies();
  const editedPerson = cookieStore.get("editedPerson");
  const currentList = JSON.parse(
    cookieStore.get("listPeople")?.value ?? "[]"
  ) as Person[];
  const person = currentList.find((person: Person) => person.id === editedPerson?.value) as Person;
  if (person === undefined) {
    return null
  }
  return person
} 
export async function editPerson(id: string, data: FormData) {
  const cookieStore = await cookies();
  const currentList: Person[] = JSON.parse(cookieStore.get("listPeople")?.value ?? "[]");

  const updatedList = currentList.map((person) => 
    person.id === id
      ? { ...person, name: data.get("name") as string, usernameGithub: data.get("usernameGithub") as string }
      : person
  );

  cookieStore.set("listPeople", JSON.stringify(updatedList));
}
