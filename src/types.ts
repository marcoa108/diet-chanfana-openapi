import { z } from 'zod';

/* ------- primitives ------- */
export const Quantity = z.string();                // "250 g"
export const Id        = z.string();               // random uuid

/* ------- nested models ------- */
export const Ingredient = z.object({
  name:     z.string(),
  quantity: Quantity,
});

export const Dish = z.object({
  id:             Id,
  name:           z.string(),
  quantityFromName: z.string().optional(),
  ingredients:    Ingredient.array(),
  notes:          z.string().optional(),
  alternatives:   z.lazy(() => Dish.array()),     // self-reference
});

export const Meal = z.object({
  type:  z.enum(['Colazione','Tra colazione e pranzo','Pranzo',
                 'Tra pranzo e cena','Cena','Dopo cena']),
  dishes: Dish.array(),
});

export const Day = z.object({
  name: z.enum(['Lunedì','Martedì','Mercoledì','Giovedì',
                'Venerdì','Sabato','Domenica']),
  meals: Meal.array(),
});

/* ------- user selections ------- */
export const Swap = z.object({
  dayIndex1: z.number().int().min(0).max(6),
  mealType1: Meal.shape.type,
  dayIndex2: z.number().int().min(0).max(6),
  mealType2: Meal.shape.type,
});

export const AlternativePick = z.object({
  dayIndex:     z.number().int().min(0).max(6),
  mealType:     Meal.shape.type,
  dishId:       Id,
  alternativeId: Id,
});
