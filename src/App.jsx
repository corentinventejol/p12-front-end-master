import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EmployeeProvider } from './context/EmployeeContext'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import EmployeeList from './pages/EmployeeList/EmployeeList'

function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  )
}

export default App
