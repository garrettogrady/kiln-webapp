const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  businesses,
    promotions
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE users`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        city VARCHAR(255) NOT NULL,
        instagram VARCHAR(255) NOT NULL UNIQUE,
        tiktok VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, phone, city, instagram, tiktok, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.phone}, ${user.city}, ${user.instagram}, ${user.tiktok}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedBusiness(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      await client.sql`DROP TABLE businesses`;
    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS businesses (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "businessType" VARCHAR(255) NOT NULL,
        "promotions" TEXT[],
        "businessName" VARCHAR(255) NOT NULL,
        "businessDescription" TEXT NOT NULL,
        "businessInstagram" VARCHAR(255),
        "businessTikTok" VARCHAR(255),
        "contactName" VARCHAR(255),
        "contactPhoneNumber" VARCHAR(255),
        "contactEmail" VARCHAR(255),
        "businessEmailAddress" VARCHAR(255) NOT NULL,
        "businessPhoneNumber" VARCHAR(255) NOT NULL,
        "featuredImage" VARCHAR(255),
        "address1" VARCHAR(255) ,
        "address2" VARCHAR(255),
        "city" VARCHAR(255),
        "state" VARCHAR(255),
        "zipcode" VARCHAR(255),
        "tags" TEXT[]
      );
    `;

    console.log(`Created "business" table`);
    console.log(businesses)

    // Insert data into the "customers" table
    const insertedBusiness = await Promise.all(
        businesses.map(
            (business) => client.sql`
        INSERT INTO businesses (
        "id", 
        "businessType", 
        "promotions", 
        "businessName",
        "businessDescription",
        "businessInstagram",
        "businessTikTok",
        "contactName",
        "contactPhoneNumber",
        "contactEmail",
        "address1",
        "address2",
        "city",
        "state",
        "zipcode",
        "businessEmailAddress",
        "businessPhoneNumber",
        "featuredImage",
        "tags")
        VALUES (${business.id}, 
        ${business.businessType}, 
        ${business.promotions}, 
        ${business.businessName}, 
        ${business.businessDescription}, 
        ${business.businessInstagram}, 
        ${business.businessTikTok}, 
        ${business.contactName}, 
        ${business.contactPhoneNumber}, 
        ${business.contactEmail}, 
        ${business.address1}, 
        ${business.address2}, 
        ${business.city}, 
        ${business.state}, 
        ${business.zipcode}, 
        ${business.businessEmailAddress}, 
        ${business.businessPhoneNumber}, 
        ${business.featuredImage}, 
        ${business.tags})
        ON CONFLICT (id) DO NOTHING;
      `,
        ),
    );

    console.log(`Seeded ${insertedBusiness.length} businesses`);

    return {
      createTable,
      customers: insertedBusiness,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedPromotions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE promotions`;
    // Create the "promotions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS promotions (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "businessId" UUID NOT NULL,
        "startDate" VARCHAR(255) NOT NULL,
        "endDate" VARCHAR(255) NOT NULL,
        "quantity" VARCHAR(255) NOT NULL,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT NOT NULL,
        "maxOfferPrice" VARCHAR(255) NOT NULL,
        "minOfferPrice" VARCHAR(255) NOT NULL,
        "platform" VARCHAR(255),
        "postType" VARCHAR(255),
        "featuredImage" VARCHAR(255),
        "images" TEXT[],
        "tags" TEXT[]
      );
    `;

    console.log(`Created "promotions" table`);
    console.log(promotions)

    // Insert data into the "customers" table
    const insertedPromotions = await Promise.all(
        promotions.map(
            (promotion) => client.sql`
        INSERT INTO promotions (
        "id", 
        "businessId", 
        "startDate", 
        "endDate",
        "quantity",
        "title",
        "description",
        "maxOfferPrice",
        "minOfferPrice",
        "platform",
        "postType",
        "featuredImage",
        "images",
        "tags")
        VALUES (uuid_generate_v4(), 
        ${promotion.businessId}, 
        ${promotion.startDate}, 
        ${promotion.endDate}, 
        ${promotion.quantity}, 
        ${promotion.title}, 
        ${promotion.description}, 
        ${promotion.maxOfferPrice}, 
        ${promotion.minOfferPrice}, 
        ${promotion.platform}, 
        ${promotion.postType}, 
        ${promotion.featuredImage}, 
        ${promotion.images}, 
        ${promotion.tags})
        ON CONFLICT (id) DO NOTHING;
      `,
        ),
    );

    console.log(`Seeded ${insertedPromotions.length} promotions`);

    return {
      createTable,
      promotions: insertedPromotions,
    };
  } catch (error) {
    console.error('Error seeding promotions:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  // await seedCustomers(client);
  // await seedInvoices(client);
  // await seedRevenue(client);
  await seedBusiness(client);
  await seedPromotions(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
