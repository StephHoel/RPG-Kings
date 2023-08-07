import { Route, Routes } from 'react-router-dom'

import './index.css'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />

      <Route path="KingsAcademy/" element={<Home />} />
    </Routes>
  )
}
