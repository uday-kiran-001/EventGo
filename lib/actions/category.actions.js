'use server'

import { db } from '@/drizzle/index';
import { categories } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export const getAllCategories = async () => {
    try{
        const result = await db.select().from(categories);
  
        return result;
    }catch(error){
        console.log(error)
    }
}

export const getCategoryByName = async (name) => {
    try{
        const result = await db
            .select({'category_id': categories.id})
            .from(categories)
            .where(eq(categories.name, name));

        // console.log(result);
        return result[0];
    }catch(error){
        console.log(error)
    }
}
