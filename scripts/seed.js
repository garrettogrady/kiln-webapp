'use server';
const {db} = require('@vercel/postgres');
const {
    customers,
    users,
    enrollment,
    creatorsignup,
    creators,
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
        type TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                    INSERT INTO users (id, type, email, password)
                    VALUES (${user.id}, ${user.type}, ${user.email}, ${hashedPassword})
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


async function seedCreators(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        await client.sql`DROP TABLE creators`;
        // Create the "creators" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS creators (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            city VARCHAR(255) NOT NULL,
            instagram VARCHAR(255) NOT NULL UNIQUE,
            tiktok VARCHAR(255) NOT NULL UNIQUE
          );
        `;

        console.log(`Created "creators" table`);

        // Insert data into the "creators" table
        const insertedCreators = await Promise.all(
            creators.map(async (user) => {
                return client.sql`
                    INSERT INTO creators (id, name, email, phone, city, instagram, tiktok)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${user.phone}, ${user.city}, ${user.instagram}, ${user.tiktok})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertedCreators.length} creators`);

        return {
            createTable,
            creators: insertedCreators,
        };
    } catch (error) {
        console.error('Error seeding creators:', error);
        throw error;
    }
}

async function seedCreatorsSignups(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        await client.sql`DROP TABLE creatorsignup`;
        // Create the "creators" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS creatorsignup (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            city VARCHAR(255) NOT NULL,
            instagram VARCHAR(255) NOT NULL UNIQUE,
            tiktok VARCHAR(255) NOT NULL UNIQUE
          );
        `;

        console.log(`Created "creators" table`);

        // Insert data into the "creators" table
        const insertedCreators = await Promise.all(
            creatorsignup.map(async (user) => {
                return client.sql`
                    INSERT INTO creatorsignup (id, name, email, phone, city, instagram, tiktok)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${user.phone}, ${user.city}, ${user.instagram}, ${user.tiktok})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertedCreators.length} creators`);

        return {
            createTable,
            creators: insertedCreators,
        };
    } catch (error) {
        console.error('Error seeding creators:', error);
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
        "featuredImage" VARCHAR(255),
        "address" VARCHAR(255) ,
        "placesId" VARCHAR(255),
        "locationLat" VARCHAR(255),
        "locationLng" VARCHAR(255),
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
        "address",
        "placesId",
        "locationLat",
        "locationLng",
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
        ${business.address}, 
        ${business.placesId}, 
        ${business.locationLat}, 
        ${business.locationLng}, 
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
        // Create the "business" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS promotions (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "businessId" UUID NOT NULL,
        "promotionType" VARCHAR(255) NOT NULL,
        "startDate" VARCHAR(255) NOT NULL,
        "endDate" VARCHAR(255) NOT NULL,
        "quantity" VARCHAR(255) NOT NULL,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT NOT NULL,
        "suggestedItems" VARCHAR(255),
        "availabilityStart" VARCHAR(255),
        "availabilityEnd" VARCHAR(255),
        "pricingType" VARCHAR(255) NOT NULL,
        "fixedOffer" VARCHAR(255),
        "tierOneOffer" VARCHAR(255),
        "tierTwoOffer" VARCHAR(255),
        "tierThreeOffer" VARCHAR(255),
        "maxTotalSpend" VARCHAR(255) NOT NULL,
        "platform" VARCHAR(255),
        "postType" VARCHAR(255),
        "mediaType" VARCHAR(255),
        "postDeliverable" VARCHAR(255),
        "featuredImage" VARCHAR(255),
        "images" TEXT[],
        "tags" TEXT[]
      );
    `;

        console.log(`Created "promotions" table`);
        console.log(promotions)
        // Insert data into the "promotions" table
        const insertedPromotions = await Promise.all(
            promotions.map(
                (promotion) => client.sql`
        INSERT INTO promotions (
        "id", 
        "businessId", 
        "promotionType", 
        "startDate", 
        "endDate",
        "quantity",
        "title",
        "description",
        "suggestedItems",
        "availabilityStart",
        "availabilityEnd",
        "pricingType",
        "fixedOffer",
        "tierOneOffer",
        "tierTwoOffer",
        "tierThreeOffer",
        "maxTotalSpend",
        "platform",
        "postType",
        "mediaType",
        "postDeliverable",
        "featuredImage",
        "images",
        "tags")
        VALUES (${promotion.id},
        ${promotion.businessId}, 
        ${promotion.promotionType}, 
        ${promotion.startDate}, 
        ${promotion.endDate}, 
        ${promotion.quantity}, 
        ${promotion.title}, 
        ${promotion.description}, 
        ${promotion.suggestedItems}, 
        ${promotion.availabilityStart}, 
        ${promotion.availabilityEnd}, 
        ${promotion.pricingType}, 
        ${promotion.fixedOffer}, 
        ${promotion.tierOneOffer}, 
        ${promotion.tierTwoOffer}, 
        ${promotion.tierThreeOffer}, 
        ${promotion.maxTotalSpend}, 
        ${promotion.platform}, 
        ${promotion.postType}, 
        ${promotion.mediaType}, 
        ${promotion.postDeliverable}, 
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
        console.error('Error seeding business:', error);
        throw error;
    }
}

async function seedEnrollment(client) {
    try {
        // Create the "revenue" table if it doesn't exist
        await client.sql`DROP TABLE enrollment`;

        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS enrollment (
            "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            "promotionId" UUID NOT NULL,
            "userId" VARCHAR(255) NOT NULL,
            "businessId" VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            "amount" INT NOT NULL,
            "status" VARCHAR(255) NOT NULL
          );
        `;
        console.log(`Created "enrollment" table`);

        // Insert data into the "revenue" table
        const insertedEnrollment = await Promise.all(
            enrollment.map(
                (enroll) => client.sql`
                INSERT INTO enrollment ("promotionId", "userId", "businessId", "date", "amount", "status")
                VALUES (${enroll.promotionId}, ${enroll.userId}, ${enroll.businessId}, ${enroll.date}, ${enroll.amount}, ${enroll.status})
                ON CONFLICT (id) DO NOTHING;
              `,
            ),
        );

        console.log(`Seeded ${insertedEnrollment.length} enrollments`);

        return {
            createTable,
            enrollment: insertedEnrollment,
        };
    } catch (error) {
        console.error('Error seeding revenue:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedCreators(client);
    await seedCreatorsSignups(client);
    await seedBusiness(client);
    await seedPromotions(client);
    await seedEnrollment(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
