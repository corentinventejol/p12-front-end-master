import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EmployeeProvider } from './context/EmployeeContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import EmployeeList from './pages/EmployeeList/EmployeeList'

function App() {
  return (
    <ThemeProvider>
      <EmployeeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee-list" element={<EmployeeList />} />
            </Routes>
          </div>
        </BrowserRouter>
      </EmployeeProvider>
    </ThemeProvider>
  )
}

export default App
