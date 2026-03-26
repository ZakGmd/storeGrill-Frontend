// prisma/seed.ts - Simple data to test your interfaces

import { PrismaClient, UserRole, OrderStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Create supplier users
  const supplier1 = await prisma.user.create({
    data: {
      name: 'Zakaria Ghoumidate',
      email: 'zakaria@restolink.com',
      phone: '+212 6XX XX XX XX',
      role: UserRole.SUPPLIER,
      companyName: 'RestoLink',
      location: 'Casablanca',
    },
  })

  const supplier2 = await prisma.user.create({
    data: {
      name: 'Ahmed Benali',
      email: 'ahmed@supplypro.ma',
      role: UserRole.SUPPLIER,
      companyName: 'Supply Pro Morocco',
      location: 'Rabat',
    },
  })

  // Create restaurant users
  const restaurant1 = await prisma.user.create({
    data: {
      name: 'Restaurant Atlas',
      email: 'manager@restaurantatlas.com',
      phone: '+212 5XX XX XX XX',
      role: UserRole.RESTAURANT,
      location: 'Casablanca',
    },
  })

  const restaurant2 = await prisma.user.create({
    data: {
      name: 'Café Central',
      email: 'info@cafecentral.ma',
      role: UserRole.RESTAURANT,
      location: 'Marrakech',
    },
  })

  // Create products for supplier 1
  const products1 = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Glass water bottles',
        description: 'Professional glass water bottles for restaurants',
        price: '22.00',
        category: 'Glassware',
        stock: 95,
        supplierId: supplier1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gold tea glasses',
        description: 'Premium gold-rimmed tea glasses',
        price: '45.00',
        category: 'Glassware', 
        stock: 156,
        supplierId: supplier1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Professional chef knives',
        description: 'High-quality stainless steel chef knives',
        price: '125.00',
        category: 'Cutlery',
        stock: 18,
        supplierId: supplier1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Stainless steel cutlery set',
        description: 'Complete cutlery set for professional use',
        price: '78.00',
        category: 'Cutlery',
        stock: 25,
        supplierId: supplier1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'White ceramic plates 25cm',
        description: 'Professional white ceramic plates',
        price: '32.00',
        category: 'Dinnerware',
        stock: 40,
        supplierId: supplier1.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Various coffee cups',
        description: 'Mixed collection of coffee cups',
        price: '28.00',
        category: 'Drinkware',
        stock: 0, // Out of stock
        supplierId: supplier1.id,
        isActive: false,
      },
    }),
  ])

  // Create products for supplier 2
  const products2 = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Industrial coffee machine',
        description: 'Professional coffee machine for restaurants',
        price: '2500.00',
        category: 'Equipment',
        stock: 3,
        supplierId: supplier2.id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Commercial blender',
        description: 'Heavy-duty blender for kitchen use',
        price: '450.00',
        category: 'Equipment',
        stock: 12,
        supplierId: supplier2.id,
        isActive: true,
      },
    }),
  ])

  // Create some orders to populate the orders table
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-4772827',
      status: OrderStatus.IN_PROGRESS,
      total: '4361.00',
      customerId: restaurant1.id,
      deliveryAddress: '123 Avenue Mohammed V, Casablanca',
      notes: 'Urgent order for weekend event',
      items: {
        create: [
          {
            quantity: 25,
            price: '45.00',
            productId: products1[1].id, // Gold tea glasses
          },
          {
            quantity: 50,
            price: '22.00', 
            productId: products1[0].id, // Glass water bottles
          },
        ],
      },
    },
  })

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-5839201',
      status: OrderStatus.COMPLETED,
      total: '2890.00',
      customerId: restaurant2.id,
      deliveryAddress: 'Rue de la Liberté, Marrakech',
      items: {
        create: [
          {
            quantity: 15,
            price: '32.00',
            productId: products1[4].id, // White ceramic plates
          },
          {
            quantity: 1,
            price: '2500.00',
            productId: products2[0].id, // Coffee machine
          },
        ],
      },
    },
  })

  const order3 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-6273845', 
      status: OrderStatus.PENDING,
      total: '1250.00',
      customerId: restaurant1.id,
      deliveryAddress: '123 Avenue Mohammed V, Casablanca',
      items: {
        create: [
          {
            quantity: 10,
            price: '125.00',
            productId: products1[2].id, // Chef knives
          },
        ],
      },
    },
  })

  console.log(`✅ Created:`)
  console.log(`- ${2} suppliers`)
  console.log(`- ${2} restaurants`) 
  console.log(`- ${8} products`)
  console.log(`- ${3} orders`)
  console.log(`\nTest accounts:`)
  console.log(`Supplier: zakaria@restolink.com`)
  console.log(`Restaurant: manager@restaurantatlas.com`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })