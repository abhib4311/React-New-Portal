import React from 'react'

const Loading = () => {
    return (
        <div className='bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 pb-4 min-h-screen flex flex-col items-center justify-center'>
            <l-quantum
                size="80"
                speed="1.75"
                color="white"
            ></l-quantum>
            <p className="text-white mt-8">Loading...</p>
        </div>
    )
}
export default Loading;
