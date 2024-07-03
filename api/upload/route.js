'use server'

import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req) => {
  
  try {
    // Get form data from the request
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/assets/events/" + filename);
    
    await writeFile(filePath, buffer);
    
    // Return the file location relative to the public folder
    return NextResponse.json({ fileLocation: `/assets/events/${filename}`, status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Failed to upload file.", details: error.message }, { status: 500 });
  }
};
