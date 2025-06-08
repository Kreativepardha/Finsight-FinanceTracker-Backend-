import { Router } from 'express'
import { BudgetController } from '../controllers/budgetController'
import { budgetSchema } from '../schemas/budgetSchema'


const router = Router()


router.post('/', BudgetController.setBudget)
router.get('/insights', BudgetController.getInsights)
router.get('/', BudgetController.getAllBudgets);


export default router;



