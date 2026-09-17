import { Router } from 'express';
import type { Request, Response } from 'express';
import { validateItem } from '../middleware/validateItem';

const router = Router();

interface Item {
  id: number;
  name: string;
}

// In-memory "database" — resets when the server restarts
let items: Item[] = [
  { id: 1, name: 'First item' }
];
let nextId = 2;

// READ all
router.get('/', (req: Request, res: Response) => {
  res.json(items);
});

// READ one
router.get('/:id', (req: Request, res: Response) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// CREATE
router.post('/', validateItem, (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const newItem: Item = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// UPDATE
router.put('/:id', (req: Request, res: Response) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  item.name = req.body.name ?? item.name;
  res.json(item);
});

// DELETE
router.delete('/:id', (req: Request, res: Response) => {
  const index = items.findIndex(i => i.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(index, 1);
  res.status(204).send();
});

export default router;