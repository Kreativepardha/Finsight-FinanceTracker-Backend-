import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger.ts'
import { transactionSchema } from '../schemas/transactionSchema.ts'
import { error } from 'winston'
import { AppError } from '../middlewares/errorHandler'


const prisma = new PrismaClient()


export const TransactionController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = transactionSchema.safeParse(req.body)

      if (!parsed.success) {
        return res.status(400).json({
          errors: parsed.error.format()
        })
      }

      const transaction = await prisma.transaction.create({
        data: parsed.data
      })


      logger.info('Transaction Created', {
        meta: transaction
      })

      res.status(201).json(transaction)
    } catch (err) {
      next(err)
    }
  },


  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: {
          date: 'desc',
        }
      })

      res.status(200).json(transactions)
    } catch (err) {
      next(err)
    },



    async update(req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;
        const parsed = transactionSchema.safeParse(req.body)

        if (!parsed.success) {
          return res.status(400).json({
            errors: parsed.error.format()
          })
        }

        const existsing = await prisma.transaction.findUnique({
          where: { id }
        })


        if (!existsing) {
          return res.status(404).json({
            error: 'Transaction not found'
          })
        }

        const updated = await prisma.transaction.update({
          where: { id },
          data: parsed.data
        })

        logger.info('Transaction updated', {
          meta: updated
        })

        res.status(200).json(updated)

      } catch (err) {
        next(err)
      }
    },

    async delete (req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;

        const existsing = await prisma.transaction.findUnique({
          where: { id }
        })

        if (!existsing) {
          return res.status(404).json({
            error(: 'Transaction not found')
          })
        }

        await prisma.transaction.delete({
          where: { id }
        })

        logger.info('Transaction deleted', {
          meta: { id }
        })

        res.status(204).send()
      } catch (err) {
        next(err)
      }
    }
  
    async dashboard(req: Request, res: Response, next: NextFunction) {
      try {
        const present = new Date()
        const monthStart = new Date(present.getFullYear(), present.getMonth(), 1);

        const transactions = await prisma.transaction.findMany({
          where: { date: { gte: monthStart } }
        })

        const total = transactions.reduce((sum, tx) => sum + tx.amount, 0)

        const byCategory = transactions.reduce((acc: Record<string, number>, tx) => {
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          return acc;
        }, {})

        const recent = await prisma.transaction.findMany({
          orderBy: { date: 'desc' },
          take: 5,
        })


        res.json({
          totalMonthlyExpenses: total,
          categoryBreakdown: byCategory,
          recentTransactions: recent,
        })
      } catch (err) {
        next(err)
      }
    }

  }


}

