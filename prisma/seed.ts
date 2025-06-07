
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {

  const categories = ['Food', 'Rent', 'Travel', 'Groceries', 'Subscriptions', 'other'];

  for (let i = 0; i < 20; i++) {
    await prisma.transaction.create({
      data: {
        amount: parseFloat((Math.random() * 5000).toFixed(2)),
        description: `Sample transaction ${i + 1}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
        category: categories[Math.floor(Math.random() * categories.length)] as any,
      },
    });
  }

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  for (const cat of categories) {
    await prisma.budget.upsert({
      where: {
        category_month_year: {
          category: cat as any,
          month,
          year,
        },
      },
      update: {},
      create: {
        category: cat as any,
        amount: parseFloat((Math.random() * 10000 + 1000).toFixed(2)),
        month,
        year,
      },
    });
  }

  console.log(' Seeded database with mock transactions and budgets');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
