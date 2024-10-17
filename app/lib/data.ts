import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  Promotion,
  PromotionTable,
  Business,
  PromotionGrid,
  LatestPromotionRaw, CreatorOnboardData, CardInfo, BusinessOnboardData,
} from './definitions';
import { formatCurrency } from './utils';
import {GetServerSideProps} from "next";
import {auth} from "@/auth";

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const data = await sql<Revenue>`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData(userId: string) {
  noStore();
  try {
    //const enrollmentCountPromise = sql`SELECT COUNT(*) FROM enrollment where "userId"=${userId}`;
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const enrolledCountPromise = sql`SELECT COUNT(*) FROM enrollment WHERE "userId"=${userId} AND status='enrolled'`;
    const redeemedCountPromise = sql`SELECT COUNT(*) FROM enrollment WHERE "userId"=${userId} AND status='redeemed'`;
    const enrolledTotalPromise = sql`SELECT SUM("amount") FROM enrollment WHERE "userId"=${userId} AND status='redeemed'`;
    const totalBusinessPromise = sql`SELECT COUNT(DISTINCT "businessId") FROM enrollment WHERE "userId"=${userId} AND status='redeemed'`;

    const data = await Promise.all([
      enrolledCountPromise,
      redeemedCountPromise,
      enrolledTotalPromise,
      totalBusinessPromise
    ]);
    console.log(data[2]);

    const numberOfEnrollments = Number(data[0].rows[0].count ?? '0');
    const numberOfRedemptions = Number(data[1].rows[0].count ?? '0');
    const totalEnrolledPromotions = formatCurrency(data[2].rows[0].sum ?? '0');
    const totalBusiness = Number(data[3].rows[0].count ?? '0');

    return {
      numberOfEnrollments,
      numberOfRedemptions,
      totalEnrolledPromotions,
      totalBusiness,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}


export async function fetchAdminCardData() {
  noStore();
  try {
    //const enrollmentCountPromise = sql`SELECT COUNT(*) FROM enrollment where "userId"=${userId}`;
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const signupCountPromise = sql`SELECT COUNT(*) FROM creatorsignup`;
    const creatorCountPromise = sql`SELECT COUNT(*) FROM creators`;
    const businessCountPromise = sql`SELECT COUNT(*) FROM businesses`;
    const promotionCountPromise = sql`SELECT COUNT(*) FROM promotions`;
    // const redeemedCountPromise = sql`SELECT COUNT(*) FROM enrollment WHERE "userId"=${userId} AND status='redeemed'`;
    // const enrolledTotalPromise = sql`SELECT SUM("amount") FROM enrollment WHERE "userId"=${userId} AND status='redeemed'`;
    // const totalBusinessPromise = sql`SELECT COUNT(DISTINCT "businessId") FROM enrollment WHERE "userId"=${userId} AND status='redeemed'`;

    const data = await Promise.all([
      signupCountPromise,
      creatorCountPromise,
      businessCountPromise,
      promotionCountPromise,
    ]);

    const numberOfSignups = Number(data[0].rows[0].count ?? '0');
    const numberOfCreators = Number(data[1].rows[0].count ?? '0');
    const numberOfBusinesses = Number(data[2].rows[0].count ?? '0');
    const numberOfPromotions = Number(data[3].rows[0].count ?? '0');
    // const totalEnrolledPromotions = formatCurrency(data[2].rows[0].sum ?? '0');
    // const totalBusiness = Number(data[3].rows[0].count ?? '0');

    return {
      numberOfSignups,
      numberOfCreators,
      numberOfBusinesses,
      numberOfPromotions,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchCampaignCardData(promotionId: string) {
  noStore();
  try {
    console.log(promotionId);
    const redeemedEnrollments = await sql`SELECT COUNT(*) FROM enrollment WHERE id=${promotionId} AND status='redeemed'`;
    return redeemedEnrollments.rows[0].count;

  } catch (error) {
    console.error('Database Errord:', error);
    throw new Error('Failed to fetch card data.');
  }
}


export async function fetchCampaignBusinessCardData(businessId: string) {
  noStore();
  try {
    const openEnrollments = await sql`SELECT COUNT(*) FROM promotions WHERE "businessId"=${businessId}`;
    const closedEnrollments = await sql`SELECT COUNT(*) FROM promotions WHERE "businessId"=${businessId}`;

    //    const openEnrollments = await sql`SELECT COUNT(*) FROM promotions WHERE "businessId"=${businessId} and CAST("endDate" As DateTime) <= NOW()`;
    //     const closedEnrollments = await sql`SELECT COUNT(*) FROM promotions WHERE "businessId"=${businessId} and  CAST("endDate" As DateTime) > NOW()`;


    const openEnrollmentsNumber = Number(openEnrollments.rows[0].count ?? '0');
    const closedEnrollmentsNumber = Number(closedEnrollments.rows[0].count ?? '0');
    return {
      openEnrollmentsNumber,
      closedEnrollmentsNumber
    };

  } catch (error) {
    console.error('Database Errord:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchCampaigns(id: string) {
  noStore();
  try {
    const promotions = await sql<PromotionTable>`
      SELECT
        id,
        title,
        "promotionType",
        "maxTotalSpend",
        "startDate",
        "endDate",
        "quantity"
      FROM promotions
      WHERE "businessId"=${id}
      ORDER BY promotions."endDate" DESC
    `;
    return promotions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch business.');
  }
}

export async function fetchEnrollments(promotionId: string) {
  noStore();
  try {
    const enrollments = await sql`
        SELECT 
        COUNT(*)
      FROM enrollment
      WHERE "promotionId"=${promotionId}
    `;

    return enrollments.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch enrollment counts.');
  }
}

export async function fetchEnrollmentCount(promotionId: string) {
  noStore();
  try {
    const enrollments = await sql`
        SELECT 
        COUNT(*)
      FROM enrollment
      WHERE "promotionId"=${promotionId}
    `;

    return enrollments.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch enrollment counts.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of business.');
  }
}

export async function fetchCampaignPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of business.');
  }
}

export async function fetchFilteredPromotions(
    query: string,
    currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const promotions = await sql<PromotionGrid>`
      SELECT
        promotions."id",
        promotions."title",
        promotions."description",
        promotions."featuredImage",
        promotions."pricingType",
        promotions."fixedOffer",
        promotions."tierOneOffer",
        promotions."tierTwoOffer",
        promotions."tierThreeOffer",
        promotions."maxTotalSpend",
        businesses."placesId",
        businesses."locationLat",
        businesses."locationLng",
        businesses."businessName"
      FROM promotions
      JOIN businesses ON promotions."businessId" = businesses.id
      WHERE
        promotions.title ILIKE ${`%${query}%`} OR
        promotions.description ILIKE ${`%${query}%`} OR
        businesses."businessName" ILIKE ${`%${query}%`} OR
        businesses."businessDescription" ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return promotions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch business.');
  }
}

export async function fetchPromotionsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM promotions
    JOIN businesses ON promotions."businessId" = businesses.id
    WHERE
      promotions.title ILIKE ${`%${query}%`} OR
      promotions.description ILIKE ${`%${query}%`} OR
      businesses."businessName" ILIKE ${`%${query}%`} OR
      businesses."businessDescription" ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of business.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;
    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice);
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchPromotionById(id: string) {
  noStore();
  console.log(id)
  try {
    const data = await sql<Promotion>`
      SELECT *
      FROM promotions
      WHERE id = ${id};
    `;
    const promotions = data.rows
    console.log(promotions);
    return promotions[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchOnboardById(id: string) {
  noStore();
  try {
    const data = await sql<CreatorOnboardData>`
      SELECT *
      FROM creatorsignup
      WHERE id = ${id};
    `;
    const creator = data.rows[0];
    console.log("creator = " + creator)
    return creator;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch onboarded user. ');
  }
}

export async function fetchOnboardBusinessById(id: string) {
  noStore();
  try {
    const data = await sql<BusinessOnboardData>`
      SELECT *
      FROM businesssignup
      WHERE id = ${id};
    `;
    const business = data.rows[0];
    console.log("business = " + business)
    return business;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch onboarded business. ');
  }
}

export async function fetchCreatorSignups() {
  noStore();
  try {
    const data = await sql<CreatorOnboardData>`
      SELECT *
      FROM creatorsignup;    `;
    const creators = data.rows
    console.log("creators = " + creators)
    return creators;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch onboarded user2. ');
  }
}

export async function fetchBusinessById(id: string) {
  noStore();
  try {
    const data = await sql<Business>`
      SELECT *
      FROM businesses
      WHERE id = ${id};
    `;
    const businesses = data.rows
    console.log(businesses);
    return businesses[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchBusinesses() {
  noStore();
  try {
    const data = await sql<Business>`
      SELECT *
      FROM businesses;
    `;
    const businesses = data.rows
    console.log(businesses);
    return businesses;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}


export async function fetchPromotions() {
  noStore();
  try {
    const data = await sql<Promotion>`
      SELECT *
      FROM promotions
      ORDER BY title ASC
    `;

    const promotions = data.rows;
    console.log(promotions)
    return promotions;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
export async function fetchLatestPromotionsFromUser(id: string) {
  noStore();
  try {
    const data = await sql<LatestPromotionRaw>`
      SELECT enrollment."amount" AS amount, promotions.title as name, businesses."businessType" as "promotionType", businesses."businessName" as business, promotions.id
      FROM promotions
      JOIN businesses ON promotions."businessId" = businesses.id
      JOIN enrollment ON promotions.id = enrollment."promotionId"
      where enrollment.status = 'enrolled' and enrollment."userId" = ${id}
      LIMIT 5`;

    const latestPromotions = data.rows.map((promotion) => ({
      ...promotion,
      amount: formatCurrency(promotion.amount),
    }));

    return latestPromotions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest business from user.');
  }

}

export async function fetchLatestTransactionsFromUser(id: string) {
  noStore();
  try {
    const data = {
        rows: [
            {
            amount: 9326,
            name: "8/25/24-9/1/24",
            promotionType: "Discount",
            business: "Chase Checking",
            id: "1"
            },
            {
            amount: 4257,
            name: "9/2/24-9/8/24",
            promotionType: "Discount",
            business: "Chase Checking",
            id: "2"
            },
            {
            amount: 1290,
            name: "9/9/24-9/15/24",
            promotionType: "Discount",
            business: "Chase Checking",
            id: "3"
            }
        ]
    }

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest business from user.');
  }

}

export async function fetchPastPromotionsFromUser(id: string) {
  noStore();
  try {
    const data = await sql<LatestPromotionRaw>`
      SELECT enrollment.amount AS amount, promotions.title as name, businesses."businessType" as "promotionType", businesses."businessName" as business, promotions.id
      FROM promotions
      JOIN businesses ON promotions."businessId" = businesses.id
      JOIN enrollment ON promotions.id = enrollment."promotionId"
      where enrollment.status = 'redeemed' and enrollment."userId" = ${id}
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest business from user.');
  }


}
export async function fetchPromotionCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card promotion data.');
  }
}

export async function checkUserEnrollment(promotionId: string) {
  noStore();
  const user = await auth();
  const userId = user?.user.id;
  console.log(userId)

  try {
    const enrollment = await sql`SELECT * FROM enrollment WHERE "promotionId"=${promotionId} and "userId"=${userId}`;

    if (enrollment.rowCount == 0) {
      console.log("user not enrolled")
      return false;
    } else {
      console.log("user enrolled")
      return true;
    }
  } catch (error) {
    console.log(error)
    return false;
  }
}

export async function fetchCreatorTier() {
  noStore();
  try {
    const user = await auth();
    const userId = user?.user.id;
    if (userId != null) {
      const tier = await sql`SELECT "tier" FROM creators WHERE "id"=${userId}`;
      return tier.rows[0].tier;
    }
  } catch (error) {
    console.log(error)
  }
}
