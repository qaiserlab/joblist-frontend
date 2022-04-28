import React from 'react'

import AppLayout from '@layouts/AppLayout'
import JobList from '@views/JobList'

export default function UserPage() {
  return (
    <AppLayout>
      <JobList />
    </AppLayout>
  )
}