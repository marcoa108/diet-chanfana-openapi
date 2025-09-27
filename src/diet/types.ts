export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Dish {
  id: string;
  name: string;
  quantityFromName: string;
  ingredients: Ingredient[];
  notes: string;
  alternatives: Dish[];
}

export interface MealPlan {
  [mealType: string]: Dish[];
}

export interface DietData {
  [day: string]: MealPlan;
}

export interface ShoppingListItem {
  name: string;
  quantity: string;
  category?: string;
}

export interface AlternativeResponse {
  originalDish: Dish;
  alternatives: Dish[];
}
