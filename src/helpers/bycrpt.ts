import * as bcrypt from 'bcrypt';
export async function generateHash(password: string): Promise<string> {
  const salt = await bcrypt.salt(10);
  return await bcrypt.hash(password, salt);
}
export async function comparePass(oldPassword: string, password: string) {
  return await bcrypt.compare(password, oldPassword);
}
