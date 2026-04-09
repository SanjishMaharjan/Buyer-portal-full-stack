import type { Request, Response } from "express";
import { db } from "../db";
import { items } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";

const itemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().int().min(0),
  price: z.number().optional(),
  category: z.string().optional(),
});

export const getItems = async (req: Request, res: Response) => {
  const result = await db.query.items.findMany({
    where: eq(items.userId, req.user!.id),
    orderBy: desc(items.createdAt),
  });
  res.json({data: result});
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const data = itemSchema.parse(req.body);
    const [item] = await db.insert(items).values({ ...data, userId: req.user!.id }).returning();
    res.status(201).json(item);
  } catch (error: any) {
    if (error.name === "ZodError")
      return res.status(400).json({ message: error.errors[0].message });
    res.status(500).json({ message: "Server error" });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ message: "Item ID required" });

    const data = itemSchema.parse(req.body);

    const item = await db.query.items.findFirst({ where: eq(items.id, id) });
    if (!item || item.userId !== req.user!.id)
      return res.status(403).json({ message: "Forbidden" });

    const [updated] = await db.update(items)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(items.id, id), eq(items.userId, req.user!.id)))
      .returning();
    res.json(updated);
  } catch (error: any) {
    if (error.name === "ZodError")
      return res.status(400).json({ message: error.errors[0].message });
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!id) return res.status(400).json({ message: "Item ID required" });

  const item = await db.query.items.findFirst({ where: eq(items.id, id) });
  if (!item || item.userId !== req.user!.id)
    return res.status(403).json({ message: "Forbidden" });

  await db.delete(items).where(eq(items.id, id));
  res.json({ message: "Item deleted" });
};