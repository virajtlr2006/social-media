'use client'

import { FetchPostBYIDAction } from '@/Actions/postActions'
import { Button } from '@/components/ui/button'
import { Posts } from '@/db/schema'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Component to display a single post with owner controls
const page = () => {

  // Get post ID from URL params
  const { id } = useParams()

  // Get current user info from Clerk authentication
  const { user, isLoaded } = useUser()

  // State to store the fetched post data
  const [singlepost, setSinglepost] = useState<Posts | null>(null)
  // State to track if current user is the post owner
  const [isOwner, setIsOwner] = useState(false)
  

  // Fetch post when user is loaded and authenticated
  useEffect(() => {
    if (!isLoaded || !user) return

    // Fetch post by ID once user is authenticated
    FetchPostByID(Number(id))
  }, [isLoaded, user])

  // Show loading state while user authentication is in progress
  if (!isLoaded) return <p>Loading....</p>

  // Fetch single post from database and check if current user is the owner
  const FetchPostByID = async (id: Number) => {
    const SinglePost = await FetchPostBYIDAction(Number(id))
    setSinglepost(SinglePost[0] || null)

    // Compare current user's username with post author's username
    if (user?.username == SinglePost[0].username) {
      console.log("Username form hook",user?.username)
      console.log("Username form post",SinglePost[0].username)
      setIsOwner(true)
    }
  }


  return (
    <div>
      {/* Display post content only if post data is available */}
      {singlepost &&
        <div>
          <p>{singlepost.username}</p>
          <p>{singlepost.title}</p>
          <img src={singlepost.image} alt='image.jpg' />
          <p>{singlepost.description}</p>
          {/* Show update and delete buttons only to post owner */}
          {isOwner &&
            <div>
              <Button className='border-4 bg-blue-500'>Update</Button>
              <Button className='border-4 bg-red-500'>Delete</Button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default page