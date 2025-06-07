import { Router } from 'express'
import { TransactionController } from '../controllers/transactionController'
import { transactionSchema } from '../schemas/transactionSchema'





const router = Router()


router.post('/', TransactionController.create)
router.get('/', TransactionController.getAll)
router.get('/dashboard', TransactionController.dashboard)
router.put('/:id', TransactionController.update)
router.delete('/:id', TransactionController.delete)



export default router;



