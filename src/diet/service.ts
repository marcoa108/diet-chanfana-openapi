import { DietData, Dish, ShoppingListItem } from './types';

export class DietService {
  private dietData: DietData;

  constructor(dietData: DietData) {
    this.dietData = dietData;
  }

  // Ottieni piano dietetico per un giorno
  getDayPlan(day: string): MealPlan | null {
    return this.dietData[day] || null;
  }

  // Ottieni alternative per un piatto
  getAlternatives(dishId: string): AlternativeResponse | null {
    for (const day in this.dietData) {
      for (const mealType in this.dietData[day]) {
        const dish = this.dietData[day][mealType].find(d => d.id === dishId);
        if (dish) {
          return {
            originalDish: dish,
            alternatives: dish.alternatives
          };
        }
      }
    }
    return null;
  }

  // Genera lista della spesa per un giorno
  generateShoppingList(day: string): ShoppingListItem[] {
    const dayPlan = this.dietData[day];
    if (!dayPlan) return [];

    const shoppingList: ShoppingListItem[] = [];
    
    for (const mealType in dayPlan) {
      for (const dish of dayPlan[mealType]) {
        for (const ingredient of dish.ingredients) {
          shoppingList.push({
            name: ingredient.name,
            quantity: ingredient.quantity,
            category: this.categorizeIngredient(ingredient.name)
          });
        }
      }
    }
    
    return this.aggregateIngredients(shoppingList);
  }

  // Genera lista della spesa settimanale
  generateWeeklyShoppingList(): ShoppingListItem[] {
    const weeklyList: ShoppingListItem[] = [];
    
    for (const day in this.dietData) {
      const dayList = this.generateShoppingList(day);
      weeklyList.push(...dayList);
    }
    
    return this.aggregateIngredients(weeklyList);
  }

  // Funzioni helper private
  private categorizeIngredient(name: string): string {
    if (name.includes('latte') || name.includes('yogurt')) return 'Latticini';
    if (name.includes('carne') || name.includes('pesce')) return 'Proteine';
    if (name.includes('frutta') || name.includes('verdura')) return 'Frutta e Verdura';
    if (name.includes('olio') || name.includes('burro')) return 'Grassi';
    return 'Altro';
  }

  private aggregateIngredients(list: ShoppingListItem[]): ShoppingListItem[] {
    const aggregated: Record<string, ShoppingListItem> = {};
    
    list.forEach(item => {
      if (aggregated[item.name]) {
        // Logica per aggregare quantità simili
        aggregated[item.name].quantity = `${aggregated[item.name].quantity} + ${item.quantity}`;
      } else {
        aggregated[item.name] = { ...item };
      }
    });
    
    return Object.values(aggregated);
  }
}
