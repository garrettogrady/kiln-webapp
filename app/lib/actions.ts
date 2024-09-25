'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import {redirect} from "next/navigation";
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import {Creator, CreatorOnboardData} from "@/app/lib/definitions";


const CampaignSchema = z.object({
    id: z.string(),
    businessId: z.string({
        invalid_type_error: 'Not signed In',
    }),
    promotionType: z.string({
        invalid_type_error: 'Please select a promotion selection',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    quantity: z.coerce
        .number()
        .gt(0, { message: 'Please enter a quantity greater than 0.' }),
    platform: z.enum(['tiktok', 'instagram'], {
        invalid_type_error: 'Please select a platform',
    }),
    postType: z.enum(['story', 'post'], {
        invalid_type_error: 'Please select a platform',
    }),
    title: z.string({
        invalid_type_error: 'Please enter a title',
    }),
    description: z.string({
        invalid_type_error: 'Please enter a description',
    }),
    tags: z.string(),
    startDate: z.string(),
    endDate: z.string(),
});
const CreateCampaign = CampaignSchema.omit({id: true});


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


export async function createCampaign(prevState: State, formData: FormData) {
    console.log(formData);
    const businessIds = await fetchAuthedUserId();
    const validatedFields = CreateCampaign.safeParse({
        businessId: businessIds,
        promotionType: formData.get('promotionType'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        amount: formData.get('amount'),
        quantity: formData.get('quantity'),
        title: formData.get('title'),
        description: formData.get('description'),
        platform: formData.get('platform'),
        postType: formData.get('postType'),
        tags: formData.get('tags'),
    });
    console.log(validatedFields);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Campaign.',
        };
    }
    // Prepare data for insertion into the database
    const { businessId,
        promotionType,
        startDate,
        endDate,
        amount,
        quantity,
        title,
        description,
        platform,
        postType,
        tags } = validatedFields.data;

    const amountInCents = amount * 100;
    const tagList = tags.split(",");
    const defaultList = "/business/placeholder.jpg";
    const date = new Date().toISOString().split('T')[0];
    console.log(tagList);
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
        "maxOfferPrice",
        "minOfferPrice",
        "platform",
        "postType",
        "featuredImage",
        "tags")
        VALUES (uuid_generate_v4(), 
        ${businessId}, 
        ${promotionType}, 
        ${startDate}, 
        ${endDate}, 
        ${quantity}, 
        ${title}, 
        ${description}, 
        ${amountInCents}, 
        ${amount}, 
        ${platform}, 
        ${postType}, 
        ${defaultList}, 
        ${tagList})
  `;
    }
    catch (error) {
        console.log(error);
        return {
            message: "Database Error: failed to create campaign"
        }
    }
    revalidatePath('/dashboard/campaigns');
    redirect('/dashboard/campaigns');
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