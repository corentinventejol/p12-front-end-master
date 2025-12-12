import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmployees } from '../../context/EmployeeContext'
import './EmployeeForm.css'

function EmployeeForm() {
  const navigate = useNavigate()
  const { addEmployee } = useEmployees()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: 'Alabama',
    zipCode: '',
    department: 'Sales'
  })





  // Calculer la date maximum pour avoir au moins 16 ans
  const getMaxBirthDate = () => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate())
    return maxDate.toISOString().split('T')[0]
  }

  // Valider la date de naissance
  const validateBirthDate = (dateValue) => {
    if (!dateValue) return ''
    
    const selectedDate = new Date(dateValue)
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate())
    
    // Vérifier si la date est valide (pas de 31 février par exemple)
    if (isNaN(selectedDate.getTime()) || selectedDate.toISOString().split('T')[0] !== dateValue) {
      return 'Veuillez saisir une date valide'
    }
    
    // Vérifier si la date est dans le futur
    if (selectedDate > today) {
      return 'La date de naissance ne peut pas être dans le futur'
    }
    
    // Vérifier si la personne a moins de 16 ans
    if (selectedDate > minDate) {
      return 'L\'employé doit avoir au moins 16 ans'
    }
    
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Limiter le zipCode à 5 caractères maximum
    if (name === 'zipCode' && value.length > 5) {
      return
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Valider la date de naissance
    if (name === 'dateOfBirth') {
      const errorMessage = validateBirthDate(value)
      e.target.setCustomValidity(errorMessage)
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    addEmployee(formData)
    
    // Réinitialiser le formulaire
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: 'Alabama',
      zipCode: '',
      department: 'Sales'
    })
  }

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ]

  const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']

  return (
    <form className="employee-form dark:bg-slate-800 dark:text-blue-100" onSubmit={handleSubmit}>
      <h1 className="dark:text-blue-100">Create Employee</h1>
      
      <div className="form-content">
        <div className="form-left">
          <div className="form-group">
            <label htmlFor="firstName" className="dark:text-blue-200">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="dark:text-blue-200">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth" className="dark:text-blue-200">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              onInvalid={(e) => {
                const errorMessage = validateBirthDate(e.target.value)
                e.target.setCustomValidity(errorMessage || 'Veillez à bien compléter ce champ.')
              }}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              max={getMaxBirthDate()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate" className="dark:text-blue-200">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="dark:text-blue-200">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              required
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="address-fieldset dark:border-slate-600">
          <legend className="dark:text-blue-200">Address</legend>
          
          <div className="form-group">
            <label htmlFor="street" className="dark:text-blue-200">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city" className="dark:text-blue-200">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state" className="dark:text-blue-200">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              required
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="zipCode" className="dark:text-blue-200">Zip Code</label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="dark:bg-slate-700 dark:text-blue-100 dark:border-slate-600"
              placeholder="Max 5 chiffres"
              required
            />
          </div>
        </fieldset>
      </div>
      
      <button type="submit" className="submit-button dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-blue-50">Save</button>
    </form>
  )
}

export default EmployeeForm
