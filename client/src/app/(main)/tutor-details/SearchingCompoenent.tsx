'use client'
import React, { useState } from 'react'

const SearchingCompoenent = () => {
    const [searching,setSearching] = useState('')
    return (
        <div>
            <div className='card'>
                <input name='searching' placeholder='search' type='text' value={searching} onChange={(e) => setSearching(e.target.value)} />
            </div>
        </div>
    )
}

export default SearchingCompoenent
