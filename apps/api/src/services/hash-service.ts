import { sha256 } from "oslo/crypto";

export class HashService {
  static async hash(password: string): Promise<string> {
    const buffer = await sha256(new TextEncoder().encode(password));

    return new TextDecoder().decode(buffer);
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    const hash = await this.hash(password);
    return hash === hashedPassword;
  }
}
