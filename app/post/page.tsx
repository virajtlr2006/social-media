'use client'

import { FetchAllPostAction } from '@/Actions/postActions'
import { Posts } from '@/db/schema'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

  const {id} = useParams()

  // Store all posts in this state
  const [allposts, setallposts] = useState<Posts[] | null>(null)

  useEffect(() => {
    FetchAllPost()
  }, [])

  // Fetching all posts here
  const FetchAllPost = async () => {
    // All posts Fetched form the backend
    const FetchPosts = await FetchAllPostAction()
    // Set in setallPosts 
    setallposts(FetchPosts)
  }
  return (
    // All posts shows on display
    
    <div>{allposts && allposts.map((p) =>
      <Link key={p.id} href={`/post/${p.id}`}>
      
      <p>{p.username}</p>
      <p>{p.title}</p>
      <img src={p.image} alt='image.jpg'/>
      <p>{p.description}</p>
      
      </Link>
    )}</div>
  )
}

export default page