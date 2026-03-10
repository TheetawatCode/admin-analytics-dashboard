import "dotenv/config"
import { PrismaClient, OrderStatus } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set")
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("has customer:", typeof prisma.customer)
  console.log("has product:", typeof prisma.product)
  console.log("has order:", typeof prisma.order)
  console.log("has orderItem:", typeof prisma.orderItem)

  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.customer.deleteMany()

  const customers = await prisma.customer.createMany({
    data: [
      { name: "John Carter", email: "john.carter@example.com" },
      { name: "Sarah Kim", email: "sarah.kim@example.com" },
      { name: "Michael Lee", email: "michael.lee@example.com" },
      { name: "Emma Wilson", email: "emma.wilson@example.com" },
      { name: "David Chen", email: "david.chen@example.com" },
    ],
  })

  const createdCustomers = await prisma.customer.findMany({
    orderBy: { createdAt: "asc" },
  })

  const createdProducts = await Promise.all([
    prisma.product.create({
      data: { name: "Analytics Pro Plan", price: 120, stock: 50 },
    }),
    prisma.product.create({
      data: { name: "Dashboard UI Kit", price: 80, stock: 35 },
    }),
    prisma.product.create({
      data: { name: "Admin Template", price: 150, stock: 20 },
    }),
    prisma.product.create({
      data: { name: "Chart Components Pack", price: 95, stock: 40 },
    }),
  ])

  const order1 = await prisma.order.create({
    data: {
      customerId: createdCustomers[0].id,
      status: OrderStatus.PAID,
      totalAmount: 240,
    },
  })

  const order2 = await prisma.order.create({
    data: {
      customerId: createdCustomers[1].id,
      status: OrderStatus.PENDING,
      totalAmount: 125,
    },
  })

  const order3 = await prisma.order.create({
    data: {
      customerId: createdCustomers[2].id,
      status: OrderStatus.COMPLETED,
      totalAmount: 560,
    },
  })

  const order4 = await prisma.order.create({
    data: {
      customerId: createdCustomers[3].id,
      status: OrderStatus.PAID,
      totalAmount: 89,
    },
  })

  await prisma.orderItem.createMany({
    data: [
      { orderId: order1.id, productId: createdProducts[0].id, quantity: 2, price: 120 },
      { orderId: order2.id, productId: createdProducts[1].id, quantity: 1, price: 125 },
      { orderId: order3.id, productId: createdProducts[2].id, quantity: 2, price: 280 },
      { orderId: order4.id, productId: createdProducts[3].id, quantity: 1, price: 89 },
    ],
  })

  console.log("Seed completed successfully")
  console.log({
    customersCount: customers.count,
    productsCount: createdProducts.length,
    ordersCount: 4,
  })
}

main()
  .catch((error) => {
    console.error("Seed failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })