import { 
  DashboardOutlined, 
  DatabaseOutlined, 
  StockOutlined,
  ReadOutlined,
} from "@ant-design/icons"

export default [
  { 
    id: 'ed054dd1-78f6-4be9-b9bb-4fc6c790b1c8',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    url: '/',
  },
  { 
    id: '020cab35-e93c-47d7-9ad9-a1b3ca3d9664',
    title: 'Job List', 
    icon: <ReadOutlined />,
    url: '/job-list',
    // children: [
    //   { 
    //     id: 'f8c05393-e067-47db-a3eb-2f20be527532',
    //     title: 'Sales Report', 
    //     url: '/report', 
    //   },
    // ]
  },
]