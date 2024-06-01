'use client'
import { fetchSubjectApi } from '@lib/slices/subject-slice/subject-slice'
import { AppDispatch } from '@lib/store/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(fetchSubjectApi())
  },[dispatch])
  console.log('did this run')
  return (
    <div>
      
    </div>
  )
}

export default MainPage
