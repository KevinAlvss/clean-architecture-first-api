import bcrypt from "bcrypt";

export class Encrypter {
  async compare(value: string, hashed_value: string) {
    const isValid = await bcrypt.compare(value, hashed_value);
    return isValid;
  }
}
