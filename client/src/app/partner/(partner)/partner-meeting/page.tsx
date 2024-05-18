'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const PartnerMeetingPage = () => {
    const [roomCode, setRoomCode] = useState<string>('')
    const router = useRouter()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // router.push(`/video-call/${roomCode}`)
    }
    return (
        <>
            {/* <div className='card-header'  style={{backgroundColor:'#FFD259'}}> */}
            <div className='card-header'>

                <h3>Create Room</h3>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group mt-4">
                    <input
                        type="text"
                        name='roomId'
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter room code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                </div>
                <div className='mt-2'>
                    <Link href={`/video-call/${roomCode}`}>

                        <button type="submit" className="btn-md btn btn-warning effect  form-control">
                            Submit
                        </button>
                    </Link>
                </div>
            </form>

        </>
    )
}

export default PartnerMeetingPage
