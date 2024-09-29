'use server';
import {any, z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import {redirect} from "next/navigation";
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import {Creator, CreatorOnboardData} from "@/app/lib/definitions";

// Helper function to create a date schema
const dateSchema = z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
}, {
    message: "Invalid date format",
});

// Helper function to create a time schema
const timeSchema = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format. Use HH:MM",
});

const CreatePromotion = z.object({
    businessId: z.string().uuid(),
    promotionType: z.enum(['restaurant', 'bar', 'hotel', 'shopping', 'spa']),
    startDate: dateSchema,
    endDate: dateSchema,
    quantity: z.coerce
        .number()
        .gt(0, { message: 'Please enter a quantity greater than 0.' }),
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    suggestedItems: z.string().optional(),
    availabilityStart: z.string().optional(),
    availabilityEnd: z.string().optional(),
    pricingType: z.string().optional(),
    maxTotalSpend: z.string().or(z.literal('')),
    postType:  z.string().optional().or(z.literal('')),
    mediaType: z.string().optional().or(z.literal('')),
    tags: z.string().optional(),
})


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});


const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    city: z.string(),
    instagram: z.string(),
    tiktok: z.string(),
    password: z.string(),
    date: z.string(),
});
const RegisterUser = UserSchema.omit({ id: true, date: true });

export type BusinessState = {
    errors?: {
        id?: string[];
        businessType?: string[];
        businessName?: string[];
        businessDescription?: string[];
        businessInstagram?: string[];
        businessTikTok?: string[];
        contactName?: string[];
        contactPhoneNumber?: string[];
        contactEmail?: string[];
        address?: string[];
        placesId?: string[];
        password?: string[];
        date?: string[];
    };
    message?: string | null;
};

const BusinessSchema = z.object({
    id: z.string(),
    businessType: z.string(),
    businessName: z.string(),
    businessDescription: z.string(),
    businessInstagram: z.string(),
    businessTikTok: z.string(),
    contactName: z.string(),
    contactPhoneNumber: z.string(),
    contactEmail: z.string(),
    address: z.string(),
    placesId: z.string(),
    password: z.string(),
    date: z.string(),
});
const RegisterBusiness = BusinessSchema.omit({ id: true, date: true });


export type State = {
    errors?: {
        tags?: string[];
        postType?: string[];
        platform?: string[];
        description?: string[];
        title?: string[];
        quantity?: string[];
        startDate?: string[];
        endDate?: string[];
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
    }
    catch (error) {
        return {
            message: "Database Error: failed to create invoice"
        }
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}


export async function createPromotion(prevState: State, formData: FormData) {
    const businessIds = await fetchAuthedUserId();
    console.log(formData);
    console.log(formData.get('tierOneOffer'))
    const validatedFields = CreatePromotion.safeParse({
        businessId: businessIds,
        promotionType: formData.get('promotionType'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        quantity: formData.get('quantity'),
        title: formData.get('title'),
        description: formData.get('description'),
        suggestedItems: formData.get('suggestedItems'),
        availabilityStart: formData.get('availabilityStart'),
        availabilityEnd: formData.get('availabilityEnd'),
        pricingType: formData.get('pricingType'),
        maxTotalSpend: formData.get('maxTotalSpend'),
        postType: formData.get('postType'),
        mediaType: formData.get('mediaType'),
        tags: formData.get('tags'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Promotion.',
        };
    }
    console.log("validated fields sucessfully ");
    console.log("validated fields: " + validatedFields.data);

    const fixedOffer = formData.get('fixedOffer') ?? "";
    const tierOneOffer = formData.get('tierOneOffer') ?? "";
    const tierTwoOffer = formData.get('tierTwoOffer') ?? "";
    const tierThreeOffer = formData.get('tierThreeOffer') ?? "";
    const platform = "instagram";
    const postDeliverable = "after";


    const {
        businessId,
        promotionType,
        startDate,
        endDate,
        quantity,
        title,
        description,
        suggestedItems,
        availabilityStart,
        availabilityEnd,
        pricingType,
        maxTotalSpend,
        postType,
        mediaType,
        tags
    } = validatedFields.data;

    const tagList = tags.split(",");
    console.log("about to input")

    try {
        await sql`
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
                "tags"
            )
            VALUES (
                uuid_generate_v4(), 
                ${businessId}, 
                ${promotionType}, 
                ${startDate}, 
                ${endDate}, 
                ${quantity}, 
                ${title}, 
                ${description}, 
                ${suggestedItems},
                ${availabilityStart},
                ${availabilityEnd},
                ${pricingType},
                ${fixedOffer},
                ${tierOneOffer},
                ${tierTwoOffer},
                ${tierThreeOffer},
                ${maxTotalSpend},
                ${platform}, 
                ${postType},
                ${mediaType},
                ${postDeliverable},
                ${tagList}
            )
        `;
        console.log('Promotion created successfully')
    } catch (error) {
        console.error(error);
        return {
            message: "Database Error: Failed to create promotion."
        };
    }

    revalidatePath('/business/promotions');
    redirect('/business/promotions');
}

export async function updateInvoice(id: string, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    }
    catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {

        console.log('signing in')
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function creatorRegister(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const validatedFields = RegisterUser.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            city: formData.get('city'),
            instagram: formData.get('city'),
            tiktok: formData.get('tiktok'),
            password: formData.get('password'),
        });
        // If form validation fails, return errors early. Otherwise, continue.
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to register user',
            };
        }
        // Prepare data for insertion into the database
        const { name, email, phone, city, instagram, tiktok, password } = validatedFields.data;
        const userType = "creator";
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
        INSERT INTO creators (name, email, phone, city, instagram, tiktok)
        VALUES (${name}, ${email}, ${phone}, ${city}, ${instagram}, ${tiktok})
        ON CONFLICT (id) DO NOTHING;`;

        await sql`
        INSERT INTO users ( email, password, type)
        VALUES (${email}, ${hashedPassword}, ${userType})
        ON CONFLICT (id) DO NOTHING;`;

        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function creatorOnboard(
    creatorData: CreatorOnboardData,
    password: string,
) {
    try {
        // Prepare data for insertion into the database

        const { name, email, phone, city, instagram, tiktok } = creatorData;
        const userType = "creator";
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
        INSERT INTO creators (name, email, phone, city, instagram, tiktok)
        VALUES (${name}, ${email}, ${phone}, ${city}, ${instagram}, ${tiktok})
        ON CONFLICT (id) DO NOTHING;`;

        await sql`
        INSERT INTO users ( email, password, type)
        VALUES (${email}, ${hashedPassword}, ${userType})
        ON CONFLICT (id) DO NOTHING;`;

        await signIn('credentials', creatorData);
        //  await sql<CreatorOnboardData>`
        //               DELETE *
        //               FROM creatorsignup
        //               WHERE id = ${userId};
        //             `;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function businessRegister(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log(formData);
    try {
        const validatedFields = RegisterBusiness.safeParse({
            businessType: formData.get('businessType'),
            businessName: formData.get('businessName'),
            businessDescription: formData.get('businessDescription'),
            businessInstagram: formData.get('businessInstagram'),
            businessTikTok: formData.get('businessTikTok'),
            contactName: formData.get('contactName'),
            contactPhoneNumber: formData.get('contactPhoneNumber'),
            contactEmail: formData.get('email'),
            address: formData.get('address'),
            placesId: formData.get('placesId'),
            password: formData.get('password'),
        });
        console.log(validatedFields);
        // If form validation fails, return errors early. Otherwise, continue.
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to register user',
            };
        }
        console.log(validatedFields)

        // Prepare data for insertion into the database
        const {
            businessType,
            businessName,
            businessDescription,
            businessInstagram,
            businessTikTok,
            contactName,
            contactPhoneNumber,
            contactEmail,
            address,
            placesId,
            password
    } = validatedFields.data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userType = "business"
        //create business entry
        await sql`
        INSERT INTO businesses ("businessType", "businessName", "businessDescription", "businessInstagram", 
        "businessTikTok", "contactName", "contactPhoneNumber", "contactEmail", "address", "placesId")
        VALUES (${businessType}, ${businessName}, ${businessDescription}, ${businessInstagram}, ${businessTikTok}, ${contactName}, 
        ${contactPhoneNumber}, ${contactEmail}, ${address},${placesId} )
        ON CONFLICT (id) DO NOTHING;`;

        //create User
        await sql`
        INSERT INTO users ( email, password, type)
        VALUES (${contactEmail}, ${hashedPassword}, ${userType})
        ON CONFLICT (id) DO NOTHING;`;


        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


export async function enrollUserInPromotion(promotionId: string, businessId: string, amount: number) {
    const user = await auth();
    const userId = user?.user.id;
    const date = Date.now();
    console.log("enrolling")
    //find user ~clout ranking~ and factor that into amount

    try {
        await sql`INSERT INTO enrollment ("promotionId", "userId", "businessId", date, amount, status)
                  VALUES (${promotionId}, ${userId}, ${businessId}, ${date}, ${amount}, 'enrolled')`;
        //revalidatePath('/creator/business/'+promotionId);
        return { isUserEnrolled: true };
    } catch (error) {
        console.log(error)
        return { isUserEnrolled: false};
    }
}

export async function updateUserData(userData: CreatorOnboardData) {
    try {
        await sql`
      UPDATE creatorsignup
      SET name = ${userData.name},
          email = ${userData.email},
          phone = ${userData.phone},
          instagram = ${userData.instagram},
          tiktok = ${userData.tiktok},
          city = ${userData.city}
      WHERE id = ${userData.id}
    `;
        return { success: true };
    } catch (error) {
        console.error('Failed to update user data:', error);
        return { success: false, error: 'Failed to update user data' };
    }
}

export async function addCreatorData(userData: CreatorOnboardData) {
    try {
        await sql`
      UPDATE creatorsignup
      SET name = ${userData.name},
          email = ${userData.email},
          phone = ${userData.phone},
          instagram = ${userData.instagram},
          tiktok = ${userData.tiktok},
          city = ${userData.city}
      WHERE id = ${userData.id}
    `;
        return { success: true };
    } catch (error) {
        console.error('Failed to update user data:', error);
        return { success: false, error: 'Failed to update user data' };
    }
}



export async function fetchAuthedUserId() {
    const user = await auth();
    const userId = user?.user.id;

    if (userId != null) {
        return userId;
    }
}