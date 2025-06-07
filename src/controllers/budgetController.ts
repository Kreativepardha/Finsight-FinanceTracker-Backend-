import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { budgetSchema } from "../schemas/budgetSchema";
import logger from "../utils/logger";
import { error } from "winston";

const prisma = new PrismaClient()






export const BudgetController = {
  async setBudget(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = budgetSchema.safeParse(req.body)

      if (!parsed.success) {
        return res.status(400).json({
          errors: parsed.error.format()
        })
      }


      const { category, amount, month, year } = parsed.data;


      const budget = await prisma.budget.upsert({
        where: { category_month_year: { category, month, year } },
        update: { amount },
        create: { category, amount, month, year }
      })


      logger.info('Budget Set', {
        meta: budget
      })


      res.status(200).json(budget)
    } catch (err) {
      next(err)
    }
  },

  async getInsights(req: Request, res: Response, next: NextFunction) {
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const monthStart = new Date(year, now.getMonth(), 1);

      const [transactions, budgets] = await Promise.all([
        prisma.transaction.findMany({ where: { date: { gte: monthStart } } }),
        prisma.budget.findMany({ where: { month, year } }),
      ]);

      const actuals: Record<string, number> = {};
      for (const tx of transactions) {
        actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
      }

      const insights = budgets.map((b) => {
        const spent = actuals[b.category] || 0;
        return {
          category: b.category,
          budget: b.amount,
          spent,
          overBudget: spent > b.amount,
        };
      });

      const topSpending = Object.entries(actuals).sort((a, b) => b[1] - a[1])[0] || [];

      res.json({
        month,
        year,
        insights,
        topSpendingCategory: topSpending[0] || null,
        topSpendingAmount: topSpending[1] || 0,
      });
    } catch (err) {
      next(err);
    }
  },
};














