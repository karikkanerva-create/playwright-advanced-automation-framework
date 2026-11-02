import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type UserCredentials = {
  username: string;
  password: string;
};

export type Product = {
  name: string;
  price: number;
};

type UserData = {
  standard: UserCredentials;
};

function readJson<T>(fileName: string): T {
  const filePath = resolve(process.cwd(), 'data', fileName);
  return JSON.parse(readFileSync(filePath, 'utf8')) as T;
}

export function getStandardUser(): UserCredentials {
  return readJson<UserData>('users.json').standard;
}

export function getProducts(): Product[] {
  return readJson<Product[]>('products.json');
}

