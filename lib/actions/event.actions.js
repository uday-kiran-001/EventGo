'use server'

import { db } from "@/drizzle/index";
import { categories, events, users } from "@/drizzle/schema";
import { verifySession } from "@/app/auth/stateless-session";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCategoryByName } from "./category.actions";

export const createEvent =  async ({ eventData, path }) => {
    console.log(eventData);
    try{
        // Verify the session and get the userId
        const { isAuth, userId } = await verifySession();

        if (!isAuth || !userId) {
            throw new Error('Unauthorized.')
        }

        // Prepare the event data for insertion, matching the database column names
        const eventDataForInsertion = {
            title: eventData.title,
            description: eventData.description,
            location: eventData.location,
            image_url: eventData.imageURL,
            start_date_time: new Date(eventData.startDateTime),
            end_date_time: new Date(eventData.endDateTime),
            price: eventData.price,
            is_free: eventData.isFree,
            category_id: parseInt(eventData.categoryId, 10),
            organizer_id: userId
        };

        // Insert into events table
        const data = await db
            .insert(events)
            .values(eventDataForInsertion)
            .returning({ id: events.id });

        //   revalidatePath(path)
    
        return ({id: data[0].id});
    }catch(error) {
        console.log(error)
        throw error;
    }
}

export const getEventById = async (event_id) => {
    try {
        const eventDetails = await db
            .select() 
            .from(events)
            .where(eq(events.id, event_id));

        if (!eventDetails.length) {
            throw new Error("Event not found");
        }

        // console.log("eventDetails: ", eventDetails);

        const userDetails = await db
            .select({id: users.id, name: users.name})
            .from(users)
            .where(eq(users.id, eventDetails[0].organizer_id));

        if (!userDetails.length) {
            throw new Error("User not found");
        }

        // console.log("userDetails: ", userDetails);

        const categoryDetails = await db
            .select()  
            .from(categories)
            .where(eq(categories.id, eventDetails[0].category_id));

        if (!categoryDetails.length) {
            throw new Error("Category not found");
        }

        // console.log("categoryDetails: ", categoryDetails);

        return {
            ...eventDetails[0], 
            organizer_name: userDetails[0].name, 
            category_name: categoryDetails[0].name
        };

    } catch (error) {
        console.error("Error fetching event details:", error);
        throw error;
    }
};

export const getAllEvents = async ({searchQuery = '', category = '', page = 0, pageLimit = 6, user_id = ''}) => {
    try {
        // console.log(searchQuery, category, page, pageLimit);
        let query = db
            .select({
                ...events,
                organizer_name: users.name,
                category_name: categories.name
            })
            .from(events)
            .leftJoin(users, eq(events.organizer_id, users.id))
            .leftJoin(categories, eq(events.category_id, categories.id));

        const whereConditions = [];

        if (searchQuery !== '') {
            whereConditions.push(ilike(events.title, `%${searchQuery}%`));
        }

        if (category !== '') {
            const {category_id} = await getCategoryByName(category);
            whereConditions.push(eq(events.category_id, Number(category_id)));
        }

        if(user_id != ''){
            whereConditions.push(eq(events.organizer_id, Number(user_id)));
        }

        let filteredCountQuery = db.select({ count: count() }).from(events);
        if (whereConditions.length > 0) {
            query = query.where(and(...whereConditions));
            filteredCountQuery = filteredCountQuery.where(and(...whereConditions));
        }

        
        const filteredCount = await filteredCountQuery;

        const numberOfRowsToSkip = (Number(page) - 1) * pageLimit;
        query = query
            .offset(numberOfRowsToSkip)
            .limit(pageLimit)
            .orderBy(desc(events.id));

        const allEvents = await query;

        // console.log("getAllEvents: ", allEvents);
        const totalPages = Math.ceil(filteredCount[0].count / pageLimit);
        // console.log(allEvents.length, filteredCount);
        return {allEvents, totalPages};

    } catch (error) {
        console.log(error);
        throw error;
    }    
};

// export const getEventByUserId = async ({user_id, page, pageLimit}) => {
//     try {
//         const eventCount = await db
//                         .select({count: count()})
//                         .from(events)
//                         .where(eq(events.organizer_id, Number(user_id)));

//         const totalPages = Math.ceil(eventCount[0].count / pageLimit);

//         const allEvents = await db 
//                         .select()
//                         .from(events)
//                         .where(eq(events.organizer_id, Number(user_id)));
    
//         return {allEvents, totalPages}
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

export const deleteEvent = async ({eventId, path}) => {
    try {
        // console.log(eventId, path);
        const result = await db
                        .delete(events)
                        .where(eq(events.id, eventId));
        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}