import React from 'react'
import { useRouter } from 'next/router'

import AppLayout from '@layouts/AppLayout'
import JoblistDetail from '@views/JobList/detail'

export default function UserEditPage() {
  const router = useRouter()
  const id = (router.query.id)?router.query.id.toString():''

  return (
    <AppLayout>
      <JoblistDetail 
        id={id} 
      />
    </AppLayout>
  )
}