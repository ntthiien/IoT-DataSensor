import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile= React.lazy(()=> import('./views/profile/Profile'))
const DataSensor=React.lazy(()=> import('./views/datasensor/DataSensor'))
const HistoryAction= React.lazy(()=> import('./views/historyAction/HistoryAction'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile},
  { path: '/datasensor', name:'DataSensor', element: DataSensor},
  { path: '/history', name:'HistoryAction', element:HistoryAction},
  
]

export default routes
