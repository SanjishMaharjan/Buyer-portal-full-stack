import type { Request, Response } from "express";
import { db } from "../db";
import { favorites, items } from "../db/schema";
import { and, eq, desc } from "drizzle-orm";

export const toggleFavorite = async (req: Request, res: Response) => {
  const itemId = req.params.itemId as string;
  const userId = req.user!.id;

  if (!itemId) return res.status(400).json({ message: "Item ID required" });

  const existing = await db.query.favorites.findFirst({
    where: and(eq(favorites.userId, userId), eq(favorites.itemId, itemId)),
  });

  if (existing) {
    await db.delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.itemId, itemId)));
    return res.json({ message: "Removed from favorites" });
  }

  const item = await db.query.items.findFirst({ where: eq(items.id, itemId) });
  if (!item || item.userId !== userId)
    return res.status(403).json({ message: "Forbidden" });

  await db.insert(favorites).values({ userId, itemId });
  res.json({ message: "Added to favorites" });
};

export const getFavorites = async (req: Request, res: Response) => {
const result = await db.query.favorites.findMany({
  where: eq(favorites.userId, req.user!.id),
  with: { item: true }, 
  orderBy: desc(favorites.createdAt),
});
  res.json(result.map((f) => f.item));
};