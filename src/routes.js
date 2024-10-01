import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile= React.lazy(()=> import('./views/profile/Profile'))
const DataSensor=React.lazy(()=> import('./views/datasensor/DataSensor'))
const HistoryAction= React.lazy(()=> import('./views/historyAction/HistoryAction'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard ,component:'Dashboard'},
  { path: '/profile', name: 'Profile', element: Profile, component:'Profile'},
  { path: '/datasensor', name:'DataSensor', element: DataSensor, component:'DataSensor'},
  { path: '/history', name:'HistoryAction', element:HistoryAction, component:'HistoryAction'},
  
]

export default routes
