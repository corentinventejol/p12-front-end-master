import { useState } from 'react'
import { useEmployees } from '../../context/EmployeeContext'
import './EmployeeList.css'

function EmployeeList() {
  const { employees } = useEmployees()
  const [search, setSearch] = useState('')
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredEmployees = employees.filter(emp => 
    emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.city.toLowerCase().includes(search.toLowerCase()) ||
    emp.state.toLowerCase().includes(search.toLowerCase())
  )

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex)

  // Réinitialiser à la page 1 quand on change le filtre
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="employee-list-page">
      <h1>Current Employees</h1>
      
      <div className="table-controls">
        <div className="entries-control">
          <label>
            Show 
            <select value={entriesPerPage} onChange={handleEntriesChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </label>
        </div>
        
        <div className="search-control">
          <label>
            Search:
            <input 
              type="text" 
              value={search} 
              onChange={handleSearchChange}
            />
          </label>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">No data available in table</td>
              </tr>
            ) : (
              currentEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.startDate}</td>
                  <td>{emp.department}</td>
                  <td>{emp.dateOfBirth}</td>
                  <td>{emp.street}</td>
                  <td>{emp.city}</td>
                  <td>{emp.state}</td>
                  <td>{emp.zipCode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="showing-info">
          Showing {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} entries
        </div>
        
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
          <button onClick={handleNext} disabled={currentPage === totalPages || filteredEmployees.length === 0}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
