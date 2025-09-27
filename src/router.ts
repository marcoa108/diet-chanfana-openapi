import { Router } from 'chanfana';
import { GetDay } from './routes/days';
import { GetMeal } from './routes/meals';
import { PatchDish } from './routes/dishes';
import { CreateSwap, DeleteSwap } from './routes/swaps';
import { GetShoppingList } from './routes/shopping-list';

export const router = new Router();

router.get('/days',          () => new GetDays());        // list all 7 days
router.get('/days/:day',     () => new GetDay());         // single day
router.get('/days/:day/meals/:meal', () => new GetMeal()); // single meal
router.patch('/dishes/:dishId',      () => new PatchDish()); // pick alternative
router.post('/swaps',                () => new CreateSwap());
router.delete('/swaps',              () => new DeleteSwap());
router.get('/shopping-list',         () => new GetShoppingList());
