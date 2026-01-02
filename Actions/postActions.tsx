'use server'

import { NewPost, PostTable } from "@/db/schema"
import db from ".."
import { eq } from "drizzle-orm"

// Create Post Action
export const CreatePostAction = async (data:NewPost) => {
    // Insert the Created post data in database
    const create = await db.insert(PostTable).values(data).returning()
    // console.log(create)
    return true
}

// Fetch All Post Action
export const FetchAllPostAction = async () => {
    // Fetch all posts from the databse
    const FetchAllPost = await db.select().from(PostTable)
    // console.log(FetchAllPost)
    return FetchAllPost
}

// Fetch Post by ID
export const FetchPostBYIDAction = async (id:number) => {
    // Fetch The single post from db id the id from params and db match
    const FetchSinglePost = await db.select().from(PostTable).where(eq(PostTable.id,Number(id)))
    // console.log(id)
    return FetchSinglePost[0]
}


// Delete Post by ID
export const DeletePostAction = async (id:number) => {
    const deletePost = await db.delete(PostTable).where(eq(PostTable.id,Number(id)))
    return true
}