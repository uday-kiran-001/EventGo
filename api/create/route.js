'use server'

import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { events } from "@/drizzle/schema";
import { verifySession } from "@/app/auth/stateless-session";
import { redirect } from "next/navigation";

export const POST = async (req) => {
    try {
        const eventData = await req.json();
        console.log('Received event data:', eventData);

        // Verify the session and get the userId
        const { isAuth, userId } = await verifySession();

        if (!isAuth || !userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

        return NextResponse.json({ success: true, eventId: data[0].id }, { status: 201 });
    } catch (error) {
        console.error("Error processing event data:", error);
        return NextResponse.json({ error: "Failed to process event data.", details: error.message }, { status: 500 });
    }
};