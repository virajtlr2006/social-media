'use client'

import { FetchPostBYIDAction, UpdatePostAction } from '@/Actions/postActions'
import { Posts } from '@/db/schema'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

const page = () => {
    // 📍 Get post ID from URL
    const { id } = useParams()

    // 👤 Get current user
    const {user} = useUser()

    // 🔀 Navigation hook
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Posts>()

    // Fetch Old Post Data
    const fetchOldPost = async (id: number) => {

        // Fetch post data by ID
        const data = (await FetchPostBYIDAction(Number(id))) as Posts | null;
        console.log(data)

        // If no data found, alert and redirect
        if (!data) {
            alert("Post not found");
            router.push(`/post/${id}`);
            return;
        }

        // Pre-fill the form with fetched data
        reset({
            title: data.title,
            image: data.image || "viraj.jpg",
            description: data.description,
            username: data.username,
        });
    };

    useEffect(() => {
        fetchOldPost(Number(id));
    }, []);

    // Handle Post Update
    const UpdatePost: SubmitHandler<Posts> = async(data) => {
        // Update the post with new data and ID , data sent to server action
        await UpdatePostAction(Number(id),data)
        // console.log(data)
        alert("Post UPdated Successfully")
        router.push(`/post/${id}`)
    }

    return (
        <div>Update The post from here
            <form onSubmit={handleSubmit(UpdatePost)}>

                <p hidden>{user?.username}</p>

                <input placeholder='Title'  {...register("title", { required: true })} />
                {errors.title && <span>This field is required</span>}

                <input placeholder='Image' {...register("image", { required: true })} />
                {errors.image && <span>This field is required</span>}

                <input placeholder='Description' {...register("description", { required: true })} />
                {errors.description && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    )
}

export default page