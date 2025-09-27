import { Hono } from 'hono';
import { DietService } from './service';
import { DietData } from './types';

export class DietController {
  public dietService: DietService;
  public router: Hono;

  constructor(dietData: DietData) {
    this.dietService = new DietService(dietData);
    this.router = new Hono();
    this.setupRoutes();
  }

  private setupRoutes() {
    // Ottieni piano dietetico per un giorno
    this.router.get('/diet/plan/:day', (c) => {
      const day = c.req.param('day');
      const plan = this.dietService.getDayPlan(day);
      
      if (!plan) {
        return c.json({ error: 'Giorno non trovato' }, 404);
      }
      
      return c.json({ day, plan });
    });

    // Ottieni alternative per un piatto
    this.router.get('/diet/alternatives/:dishId', (c) => {
      const dishId = c.req.param('dishId');
      const alternatives = this.dietService.getAlternatives(dishId);
      
      if (!alternatives) {
        return c.json({ error: 'Piatto non trovato' }, 404);
      }
      
      return c.json(alternatives);
    });

    // Genera lista della spesa per un giorno
    this.router.get('/diet/shopping-list', (c) => {
      const day = c.req.query('day');
      
      if (day) {
        const shoppingList = this.dietService.generateShoppingList(day);
        return c.json({ day, shoppingList });
      } else {
        const weeklyList = this.dietService.generateWeeklyShoppingList();
        return c.json({ shoppingList: weeklyList });
      }
    });
  }
}
