import { useRouter } from 'next/router'
import React from 'react'

const User = () => {
    const router = useRouter()
    const {id} =  router.query;
  return (
    <div>
        <h1> {id}</h1>
    </div>
  )
}

export default User