"use server";
import { writeFile } from "fs/promises";
import { join } from "path";

export default async function upload(data: FormData) {
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const projectRoot = process.cwd();

  const relativePath = join(projectRoot, "public", file.name);

  await writeFile(relativePath, buffer);

  return { success: true };
}
