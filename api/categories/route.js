'use server'

import { NextResponse } from 'next/server';
import { db } from '@/drizzle/index';
import { categories } from '@/drizzle/schema';

export const GET = async () => {
  try {
    const result = await db.select().from(categories);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing event data:', error);
    return NextResponse.json(
      { error: 'Failed to process event data.', details: error.message },
      { status: 500 }
    );
  }
};
