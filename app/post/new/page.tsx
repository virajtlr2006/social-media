'use client'

import { CreatePostAction } from '@/Actions/postActions'
import { Input } from '@/components/ui/input'
import { NewPost } from '@/db/schema'
import { useUser } from '@clerk/nextjs'
import { useForm, SubmitHandler } from "react-hook-form"

const page = () => {

  // Get the current user from Clerk
  const {user} = useUser()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPost>()

  // This function creates post
  const CreatePost: SubmitHandler<NewPost> = async (data) => {
    // Username is send to backend with rest of the form data
    const newData = { ...data, username: user?.username || "viraj_tlr" }
    // Data send to backend
    await CreatePostAction(newData)
  }


  return (
    <div>

      <p>Create your Post</p>

      <form onSubmit={handleSubmit(CreatePost)}>

        {/* Inputs for creating post */}

        <Input className='border-4 h-10 w-100' placeholder='Image URL' {...register("image")} />
        {errors.image && <span>This field is required</span>}

        <Input className='border-4 h-10 w-100' placeholder='Title' {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}

        <Input className='border-4 h-10 w-100' placeholder='Description' {...register("description", { required: true })} />
        {errors.description && <span>This field is required</span>}

        <Input type="submit" />
      </form>
    </div>
  )
}

export default page