'use server';
import {any, z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import {redirect} from "next/navigation";
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import {BusinessOnboardData, CardInfo, Creator, CreatorOnboardData} from "@/app/lib/definitions";
import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";

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

export async function createPromotion(prevState: State, formData: FormData) {
    const user = await auth();
    const isAdmin = user?.user?.type === 'admin';
    let businessId = "";
    if (isAdmin) {
        businessId = formData.get('businessId')!.toString();
    } else {
        businessId = await fetchAuthedUserId();
    }
    console.log(formData);
    console.log(formData.get('tierOneOffer'))
    const validatedFields = CreatePromotion.safeParse({
        businessId: businessId,
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
    const mediaType = formData.get('mediaType') ?? "";

    const platform = "instagram";
    const postDeliverable = "after";

    const {
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
    if (isAdmin) {
        console.log("is admin")
        revalidatePath('/business/'+businessId+'/promotions');
        redirect('/business/'+businessId+'/promotions');
    } else {
        revalidatePath('/business/promotions');
        redirect('/business/promotions');
    }


}

// Define the schema for promotion update
const UpdatePromotionSchema = z.object({
    id: z.string(),
    promotionType: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    quantity: z.coerce.number(),
    title: z.string(),
    description: z.string(),
    suggestedItems: z.string(),
    availabilityStart: z.string(),
    availabilityEnd: z.string(),
    pricingType: z.enum(['fixed', 'tiered']),
    fixedOffer: z.string().optional(),
    tierOneOffer:  z.string().optional(),
    tierTwoOffer:  z.string().optional(),
    tierThreeOffer:  z.string().optional(),
    maxTotalSpend:  z.string(),
    postType: z.string(),
    mediaType: z.string(),
    tags: z.string(),
});

export async function updatePromotion(prevState: any, formData: FormData) {
    console.log(formData);
    // Validate form data
    const validatedFields = UpdatePromotionSchema.safeParse({
        id: formData.get('id'),
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
        fixedOffer: formData.get('fixedOffer'),
        tierOneOffer: formData.get('tierOneOffer'),
        tierTwoOffer: formData.get('tierTwoOffer'),
        tierThreeOffer: formData.get('tierThreeOffer'),
        maxTotalSpend: formData.get('maxTotalSpend'),
        postType: formData.get('postType'),
        mediaType: formData.get('mediaType'),
        tags: formData.get('tags'),
    });

    console.log(validatedFields.success)
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Promotion.',
        };
    }

    // Prepare data for database update
    const {
        id,
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
        fixedOffer,
        tierOneOffer,
        tierTwoOffer,
        tierThreeOffer,
        maxTotalSpend,
        postType,
        mediaType,
        tags,
    } = validatedFields.data;

    try {
        await sql`
      UPDATE promotions
      SET "promotionType" = ${promotionType},
          "startDate" = ${startDate},
          "endDate" = ${endDate},
          "quantity" = ${quantity},
          "title" = ${title},
          "description" = ${description},
          "suggestedItems" = ${suggestedItems},
          "availabilityStart" = ${availabilityStart},
          "availabilityEnd" = ${availabilityEnd},
          "pricingType" = ${pricingType},
          "fixedOffer" = ${fixedOffer},
          "tierOneOffer" = ${tierOneOffer},
          "tierTwoOffer" = ${tierTwoOffer},
          "tierThreeOffer" = ${tierThreeOffer},
          "maxTotalSpend" = ${maxTotalSpend},
          "postType" = ${postType},
          "mediaType" = ${mediaType},
          "tags" = ${tags}
      WHERE "id" = ${id}
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Promotion.',
        };
    }

    revalidatePath('/business/promotions/' + id);
    redirect('/business/promotions/' + id);
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

        const { id, name, email, phone, city, instagram, tiktok } = creatorData;
        const userType = "creator";
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
        INSERT INTO creators (id, name, email, phone, city, instagram, tiktok)
        VALUES (${id}, ${name}, ${email}, ${phone}, ${city}, ${instagram}, ${tiktok})
        ON CONFLICT (id) DO NOTHING;`;

        await sql`
        INSERT INTO users ( id, email, password, type)
        VALUES (${id}, ${email}, ${hashedPassword}, ${userType})
        ON CONFLICT (id) DO NOTHING;`;

        const signInData = {email: creatorData.email, password: password }
        await signIn('credentials', signInData);
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


export async function businessOnboard(
    businessData: BusinessOnboardData,
    password: string,
) {
    try {
        // Prepare data for insertion into the database

        const { id, businessName, contactName, contactEmail, contactPhoneNumber, businessInstagram, businessType, businessDescription, address, placesId, locationLat, locationLng } = businessData;
        const userType = "business";
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
        INSERT INTO businesses (id, "businessName", "contactName", "contactEmail", "contactPhoneNumber", "businessInstagram", "businessType", "businessDescription", "address", "placesId", "locationLat", "locationLng" )
        VALUES (${id}, ${businessName}, ${contactName}, ${contactEmail}, ${contactPhoneNumber}, ${businessInstagram}, ${businessType}, ${businessDescription}, ${address}, ${placesId}, ${locationLat}, ${locationLng} )
        ON CONFLICT (id) DO NOTHING;`;

        await sql`
        INSERT INTO users ( id, email, password, type)
        VALUES (${id}, ${contactEmail}, ${hashedPassword}, ${userType})
        ON CONFLICT (id) DO NOTHING;`;

        const signInData = {email: contactEmail, password: password }
        await signIn('credentials', signInData);
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

export async function updateBusinessData(userData: BusinessOnboardData) {
    try {
        await sql`
      UPDATE businesssignup
      SET name = ${userData.companyName},
          email = ${userData.name},
          phone = ${userData.jobtitle},
          instagram = ${userData.email},
          instagram = ${userData.phoneNumber},
          instagram = ${userData.businesslocation},
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

export async function fetchCardObject(id: string) {
    noStore();
    try {
        console.log(id);
        console.log(process.env.CARD_ENCRYPTION_KEY);
        const data = await sql<CardInfo>`
      SELECT 
      "userId", 
      pgp_sym_decrypt("cardNumber", ${process.env.CARD_ENCRYPTION_KEY}) AS "cardNumber", 
      "expirationDate", 
      "cvv"
      FROM cardinfo
      WHERE "userId" = ${id};
    `;
        const cardInfo = data.rows[0];
        console.log("card info = " + cardInfo)
        return cardInfo;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card user. ');
    }
}


export async function fetchAuthedUserId() {
    const user = await auth();
    const userId = user?.user.id;

    if (userId != null) {
        return userId;
    }
}

export async function fetchAuthedUserTier() {
    const user = await auth();
    const userId = user?.user.id;

    if (userId != null) {
        return userId;
    }
}