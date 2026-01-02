'use client'

import { useUser } from '@clerk/nextjs'

const page = () => {

    // Get user info from hook
    const { user, isLoaded } = useUser()

    // shows loading state while user is being fetched
    if (!isLoaded) return <div>Loading...</div>

    return (
        <div>
            This is Profile Page
            {/* Display user information */}
            <p>{user?.fullName}</p>
            <p>{user?.username}</p>
            <img className='h-10 w-10' src={user?.imageUrl} alt='No image' />

        </div>
    )
}

export default page