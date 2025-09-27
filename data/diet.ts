// routes/days.ts
import { OpenAPIRoute } from 'chanfana';
import { Day, Meal } from '../types';
import { week, swaps } from '../data/diet';

export class GetDay extends OpenAPIRoute {
  schema = {
    tags: ['Days'],
    summary: 'Get one day with meals resolved',
    parameters: [
      {
        name: 'day',
        in: 'path',
        required: true,
        schema: { type: 'string', enum: Day.shape.name.enum },
      },
    ],
    responses: {
      '200': {
        description: 'Day object',
        content: { 'application/json': { schema: Day } },
      },
    },
  };

  async handle(c) {
    const { day } = c.req.param();
    const idx = week.findIndex(d => d.name === day);
    if (idx === -1) return c.json({ error: 'Day not found' }, 404);

    const resolvedMeals = week[idx].meals.map(m => {
      const key = `${idx}-${m.type}`;
      if (swaps.has(key)) {
        const [tIdx, tMeal] = swaps.get(key)!.split('-');
        const targetDay = week[Number(tIdx)];
        return targetDay.meals.find(mm => mm.type === tMeal)!;
      }
      return m;
    });

    return c.json({ name: day, meals: resolvedMeals });
  }
}
