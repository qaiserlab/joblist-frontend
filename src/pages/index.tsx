import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import AppLayout from '@layouts/AppLayout'

export default function DashboardPage() {
  return (
    <AppLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <section>
        Please go to 
        <Link href={'/job-list'}>
          <a href="javascript:"> -- Joblist Page -- </a>
        </Link>
      </section>
    </AppLayout>
  )
}