'use server'

import path from "path";
import { writeFile } from "fs/promises";

export const uploadImage = async (formData) =>{
    try{
        const file = formData.get("image");

        if (!file) {
            throw new Error("No files received.")
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        const filePath = path.join(process.cwd(), "public/assets/events/" + filename);
        
        await writeFile(filePath, buffer);
        
        // Return the file location relative to the public folder
        return JSON.parse(JSON.stringify({ fileLocation: `/assets/events/${filename}`}));
    }catch(error){
        console.log(error);
    }
}