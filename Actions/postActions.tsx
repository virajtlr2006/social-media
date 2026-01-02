'use server'

import { NewPost, PostTable } from "@/db/schema"
import db from ".."

// Create Post Action
export const CreatePostAction = async (data:NewPost) => {
    // Insert the Created post data in database
    const create = await db.insert(PostTable).values(data).returning()
    // console.log(create)
    return true
}