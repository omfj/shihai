import { sha256 } from "oslo/crypto";

export const hash = async (password: string) => {
  const buffer = await sha256(new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const compare = async (password: string, hashedPassword: string) => {
  const hashed = await hash(password);
  return hashed === hashedPassword;
};
