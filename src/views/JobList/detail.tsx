import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Space, Button, Card, Spin, Divider, Row, Col } from 'antd'
import { ArrowLeftOutlined } from "@ant-design/icons"
import { AxiosError } from 'axios'

import axios from '@helpers/axiosInstance'
import StickArea from '@components/StickArea'
import { ActivityStore } from '@stores/ActivityStore'

export default function JobListDetail(props: { id: string }) {
  const id = props.id
  const [joblistData, setJoblistData] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    company: '',
    company_logo: '',
    company_url: '',
    how_to_apply: '',
  })

  const router = useRouter()
  const { setServerSaid } = useContext(ActivityStore)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async function() {
      if (!id) router.push('/job-list')

      try {
        setIsLoading(true)
  
        const response = await axios.get(`/joblist/${id}`)
        const result = response.data
        
        setJoblistData(result.data)
      }
      catch (error: AxiosError | any) {
        if (error.response) {
          const result = error.response.data
          setServerSaid(result)
        }
      }
      finally {
        setIsLoading(false)
      }
    
    })()
  }, [id])

  return (
    <React.Fragment>
      <Head>
        <title>Joblist Detail</title>
      </Head>

      <Spin spinning={isLoading}>
        <Card title={(
          <h2>
            <small style={{ fontSize: '14px', color: 'gray' }}>
              {joblistData.type} / {joblistData.location}
            </small><br />
            <strong>{joblistData.title}</strong>
          </h2>
        )}>
          <Row>
            <Col xs={24} lg={16}><div dangerouslySetInnerHTML={{ __html: joblistData.description }} /></Col>
            <Col xs={24} lg={8}>

              <Card title={joblistData.company}>
                <img 
                  src={joblistData.company_logo} 
                  alt="Company Logo"
                  style={{ width: '100%' }} 
                />
                <br />
                <br />
                <a href={joblistData.company_url}>{joblistData.company_url}</a>
              </Card>

              <Card title={'How to Apply'}>
                <div dangerouslySetInnerHTML={{ __html: joblistData.how_to_apply }} />
              </Card>

            </Col>
          </Row>
        </Card>
      </Spin>
      
      <StickArea>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />}
            shape={'circle'} 
            size={'large'}
            onClick={() => router.push('/job-list')}
          />
        </Space>
      </StickArea>
    </React.Fragment>
  )
}