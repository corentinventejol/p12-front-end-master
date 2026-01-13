import { useState, useEffect } from 'react'
import { useEmployees } from '../../context/EmployeeContext'
import './EmployeeList.css'

function EmployeeList() {
  const { employees } = useEmployees()
  
  // Métadonnées SEO spécifiques à la page Employee List
  useEffect(() => {
    // Changer le titre de la page
    document.title = 'Liste des Employés - HRnet'
    
    // Ajouter ou mettre à jour la meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Consultez la liste complète des employés de votre entreprise. Recherchez, triez et naviguez facilement parmi tous les profils d\'employés avec des fonctionnalités de filtrage avancées.')
    
    // Nettoyage lors du démontage du composant
    return () => {
      document.title = 'HRnet'
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        meta.setAttribute('content', 'HRnet - Système de gestion des employés')
      }
    }
  }, [])
  const [search, setSearch] = useState('')
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState('asc') // 'asc' ou 'desc'

  const filteredAndSortedEmployees = employees
    .filter(emp => 
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      emp.city.toLowerCase().includes(search.toLowerCase()) ||
      emp.state.toLowerCase().includes(search.toLowerCase()) ||
      emp.street.toLowerCase().includes(search.toLowerCase()) ||
      emp.zipCode.toString().includes(search) ||
      emp.dateOfBirth.includes(search) ||
      emp.startDate.includes(search)
    )
    .sort((a, b) => {
      if (!sortField) return 0
      
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      // Conversion pour les dates
      if (sortField === 'dateOfBirth' || sortField === 'startDate') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }
      
      // Conversion pour les nombres
      if (sortField === 'zipCode') {
        aValue = parseInt(aValue) || 0
        bValue = parseInt(bValue) || 0
      }
      
      // Comparaison
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredAndSortedEmployees.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentEmployees = filteredAndSortedEmployees.slice(startIndex, endIndex)

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

  const handleSort = (field) => {
    if (sortField === field) {
      // Si on clique sur la même colonne, inverser la direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Nouvelle colonne, commencer par ordre croissant
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1) // Retour à la première page
  }

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return '↕' // Flèches neutres quand pas de tri
    }
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  return (
    <div className="employee-list-page dark:bg-slate-900">
      <h1 className="dark:text-blue-100">Current Employees</h1>
      
      <div className="table-controls dark:text-blue-100">
        <div className="entries-control">
          <label>
            Show 
            <select value={entriesPerPage} onChange={handleEntriesChange} className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600">
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
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
            />
          </label>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="employee-table dark:bg-slate-800 dark:text-blue-100">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('firstName')}>
                First Name <span className="sort-icon">{getSortIcon('firstName')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('lastName')}>
                Last Name <span className="sort-icon">{getSortIcon('lastName')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('startDate')}>
                Start Date <span className="sort-icon">{getSortIcon('startDate')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('department')}>
                Department <span className="sort-icon">{getSortIcon('department')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('dateOfBirth')}>
                Date of Birth <span className="sort-icon">{getSortIcon('dateOfBirth')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('street')}>
                Street <span className="sort-icon">{getSortIcon('street')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('city')}>
                City <span className="sort-icon">{getSortIcon('city')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('state')}>
                State <span className="sort-icon">{getSortIcon('state')}</span>
              </th>
              <th className="sortable" onClick={() => handleSort('zipCode')}>
                Zip Code <span className="sort-icon">{getSortIcon('zipCode')}</span>
              </th>
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

      <div className="table-footer dark:text-blue-100">
        <div className="showing-info">
          Showing {Math.min(endIndex, filteredAndSortedEmployees.length)} of {filteredAndSortedEmployees.length} entries
        </div>
        
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="dark:bg-slate-700 dark:text-blue-100 dark:hover:bg-slate-600">Previous</button>
          <button onClick={handleNext} disabled={currentPage === totalPages || filteredAndSortedEmployees.length === 0} className="dark:bg-slate-700 dark:text-blue-100 dark:hover:bg-slate-600">Next</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
