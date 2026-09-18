import * as fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(__dirname, 'items.json');

export interface Item {
  id: number;
  name: string;
}

export async function readItems(): Promise<Item[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Item[];
}

export async function writeItems(items: Item[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}