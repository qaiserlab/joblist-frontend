import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Space, Pagination, Button, Modal, Row, Col, Input, Spin, Checkbox } from 'antd'
import { ReloadOutlined } from "@ant-design/icons"
import { AxiosError } from 'axios'

import axios from '@helpers/axiosInstance'
import StickArea from '@components/StickArea'
import { ActivityStore } from '@stores/ActivityStore'
import { useFormik } from 'formik'

interface TSearchParams {
  description?: string
  location?: string
  full_time?: boolean
}

export default function JobList() {
  const pageSize = 10

  const { setServerSaid } = useContext(ActivityStore)

  const [isLoading, setIsLoading] = useState(false)
  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useState({})

  useEffect(() => {
    (handleRefresh)()
  }, [])
  
  useEffect(() => {
    handleRefresh(1)
  }, [searchParams])

  const formik = useFormik({
    initialValues: {
      description: '',
      location: '',
      full_time: false,
    },

    onSubmit: async (values, { setSubmitting }) => {

      const params:TSearchParams = {}

      if (values.description) params.description = values.description.toLowerCase()
      if (values.location) params.location = values.location.toLowerCase()
      if (values.full_time) params.full_time = values.full_time

      setSearchParams(params)
    },
    
  })
  
  const handleRefresh = async (page?: number, description?: Array<any>) => {
    try {
      setIsLoading(true)
  
      page = (page)?page:1
      const response = await axios.get('/joblist', {
        params: {
          page,
          ...searchParams
        }
      })
      const result = response.data
  
      setRecords(result.data)
      setTotal(result.total)
      setCurrentPage(page)
    }
    catch (error: AxiosError | any) {
      setRecords([])
      setTotal(0)

      if (error.response) {
        const result = error.response.data
        setServerSaid(result)
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Job List</title>
      </Head> 
      <section>

        <form onSubmit={formik.handleSubmit}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={9}>
              <label>Job Description</label>
              <Input
                name={'description'}
                placeholder={'Description'}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
            </Col>
            <Col xs={24} lg={9}>
              <label>Location</label>
              <Input
                name={'location'}
                placeholder={'Location'}
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
            </Col>
            <Col xs={24} lg={3}>
              <br />
              <Checkbox
                name={'full_time'}
                value={formik.values.full_time}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
              >
                Full Time Only
              </Checkbox>
            </Col>
            <Col xs={24} lg={3}>
            <br />
              <Button htmlType={'submit'}>Search</Button>
            </Col>
          </Row>
        </form>
        <br />

        <Space direction={'vertical'} style={{width: '100%', background: '#fff', padding: '16px', border: 'solid #f0f0f0 4px' }}>
          <h2>Job List</h2>

          <Spin tip="Loading..." spinning={isLoading}>
            <div>
              {records.filter((record: any) => (record !== null)).map((record: any) => {
                return (
                  <div style={{ padding: '8px', borderBottom: 'solid silver 1px' }}>
                    <Link href={`/job-list/${record.id}`}>
                      <a href="javascript:">
                        <strong>{record.title}</strong>
                      </a>
                    </Link>
                    
                    <br />
                    <small>
                      <span style={{ color: 'gray' }}>{record.location} - </span>
                      <span style={{ color: 'green' }}>{record.type}</span>
                    </small>
                  </div>
                )
              })}
            </div>
          </Spin>

          { (total > pageSize) &&
            <Pagination 
              onChange={(page: number) => {
                handleRefresh(page)
              }}
              pageSize={pageSize} 
              total={total} 
              current={currentPage}
            />
          }
        </Space>

        <StickArea>
          <Space>
            <Button 
              icon={<ReloadOutlined />}
              shape={'circle'} 
              size={'large'} 
              onClick={() => {
                formik.resetForm()
                setSearchParams({})
                handleRefresh()
              }}
            />
          </Space>
        </StickArea>
      </section>
    </React.Fragment>
  )
}