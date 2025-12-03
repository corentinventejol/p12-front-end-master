import { createContext, useState, useContext } from 'react'

const EmployeeContext = createContext()

// Banque de données d'employés par défaut
const initialEmployees = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1990-05-15',
    startDate: '2020-01-10',
    street: '123 Main Street',
    city: 'New York',
    state: 'New York',
    zipCode: '10001',
    department: 'Sales'
  },
  {
    id: 2,
    firstName: 'Emily',
    lastName: 'Johnson',
    dateOfBirth: '1985-08-22',
    startDate: '2018-03-15',
    street: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'California',
    zipCode: '90001',
    department: 'Engineering'
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Williams',
    dateOfBirth: '1992-11-30',
    startDate: '2021-06-01',
    street: '789 Pine Road',
    city: 'Chicago',
    state: 'Illinois',
    zipCode: '60601',
    department: 'Marketing'
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Brown',
    dateOfBirth: '1988-03-12',
    startDate: '2019-09-20',
    street: '321 Elm Street',
    city: 'Houston',
    state: 'Texas',
    zipCode: '77001',
    department: 'Human Resources'
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Jones',
    dateOfBirth: '1995-07-08',
    startDate: '2022-02-14',
    street: '654 Maple Drive',
    city: 'Phoenix',
    state: 'Arizona',
    zipCode: '85001',
    department: 'Legal'
  },
  {
    id: 6,
    firstName: 'Jessica',
    lastName: 'Garcia',
    dateOfBirth: '1987-12-05',
    startDate: '2017-07-18',
    street: '987 Cedar Lane',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    zipCode: '19101',
    department: 'Sales'
  },
  {
    id: 7,
    firstName: 'James',
    lastName: 'Martinez',
    dateOfBirth: '1993-04-20',
    startDate: '2020-11-05',
    street: '147 Birch Court',
    city: 'San Antonio',
    state: 'Texas',
    zipCode: '78201',
    department: 'Engineering'
  },
  {
    id: 8,
    firstName: 'Jennifer',
    lastName: 'Rodriguez',
    dateOfBirth: '1991-09-14',
    startDate: '2019-04-22',
    street: '258 Walnut Place',
    city: 'San Diego',
    state: 'California',
    zipCode: '92101',
    department: 'Marketing'
  },
  {
    id: 9,
    firstName: 'Robert',
    lastName: 'Wilson',
    dateOfBirth: '1989-06-28',
    startDate: '2018-10-11',
    street: '369 Cherry Street',
    city: 'Dallas',
    state: 'Texas',
    zipCode: '75201',
    department: 'Human Resources'
  },
  {
    id: 10,
    firstName: 'Linda',
    lastName: 'Anderson',
    dateOfBirth: '1994-01-17',
    startDate: '2021-03-08',
    street: '741 Spruce Avenue',
    city: 'San Jose',
    state: 'California',
    zipCode: '95101',
    department: 'Legal'
  },
  {
    id: 11,
    firstName: 'William',
    lastName: 'Taylor',
    dateOfBirth: '1986-10-09',
    startDate: '2016-12-01',
    street: '852 Ash Boulevard',
    city: 'Austin',
    state: 'Texas',
    zipCode: '73301',
    department: 'Sales'
  },
  {
    id: 12,
    firstName: 'Mary',
    lastName: 'Thomas',
    dateOfBirth: '1992-03-25',
    startDate: '2020-05-15',
    street: '963 Poplar Road',
    city: 'Jacksonville',
    state: 'Florida',
    zipCode: '32099',
    department: 'Engineering'
  },
  {
    id: 13,
    firstName: 'Richard',
    lastName: 'Moore',
    dateOfBirth: '1990-08-11',
    startDate: '2019-02-20',
    street: '159 Willow Drive',
    city: 'Fort Worth',
    state: 'Texas',
    zipCode: '76101',
    department: 'Marketing'
  },
  {
    id: 14,
    firstName: 'Patricia',
    lastName: 'Jackson',
    dateOfBirth: '1988-11-03',
    startDate: '2018-08-07',
    street: '357 Hickory Lane',
    city: 'Columbus',
    state: 'Ohio',
    zipCode: '43004',
    department: 'Human Resources'
  },
  {
    id: 15,
    firstName: 'Charles',
    lastName: 'Martin',
    dateOfBirth: '1996-02-19',
    startDate: '2022-09-12',
    street: '486 Sycamore Court',
    city: 'Charlotte',
    state: 'North Carolina',
    zipCode: '28201',
    department: 'Legal'
  },
  {
    id: 16,
    firstName: 'Barbara',
    lastName: 'Lee',
    dateOfBirth: '1987-07-22',
    startDate: '2017-11-28',
    street: '624 Magnolia Street',
    city: 'Indianapolis',
    state: 'Indiana',
    zipCode: '46201',
    department: 'Sales'
  },
  {
    id: 17,
    firstName: 'Thomas',
    lastName: 'Perez',
    dateOfBirth: '1993-12-08',
    startDate: '2021-01-19',
    street: '735 Dogwood Place',
    city: 'San Francisco',
    state: 'California',
    zipCode: '94101',
    department: 'Engineering'
  },
  {
    id: 18,
    firstName: 'Susan',
    lastName: 'White',
    dateOfBirth: '1991-05-30',
    startDate: '2020-07-03',
    street: '846 Redwood Avenue',
    city: 'Seattle',
    state: 'Washington',
    zipCode: '98101',
    department: 'Marketing'
  },
  {
    id: 19,
    firstName: 'Daniel',
    lastName: 'Harris',
    dateOfBirth: '1989-09-16',
    startDate: '2019-06-25',
    street: '951 Beech Boulevard',
    city: 'Denver',
    state: 'Colorado',
    zipCode: '80201',
    department: 'Human Resources'
  },
  {
    id: 20,
    firstName: 'Karen',
    lastName: 'Clark',
    dateOfBirth: '1995-04-02',
    startDate: '2022-03-17',
    street: '753 Cypress Road',
    city: 'Boston',
    state: 'Massachusetts',
    zipCode: '02101',
    department: 'Legal'
  },
  {
    id: 21,
    firstName: 'Matthew',
    lastName: 'Lewis',
    dateOfBirth: '1986-11-27',
    startDate: '2016-09-08',
    street: '864 Palm Drive',
    city: 'Nashville',
    state: 'Tennessee',
    zipCode: '37201',
    department: 'Sales'
  },
  {
    id: 22,
    firstName: 'Nancy',
    lastName: 'Robinson',
    dateOfBirth: '1992-06-13',
    startDate: '2020-12-21',
    street: '975 Laurel Lane',
    city: 'Detroit',
    state: 'Michigan',
    zipCode: '48201',
    department: 'Engineering'
  },
  {
    id: 23,
    firstName: 'Joseph',
    lastName: 'Walker',
    dateOfBirth: '1990-02-07',
    startDate: '2019-08-14',
    street: '135 Fir Court',
    city: 'Portland',
    state: 'Oregon',
    zipCode: '97201',
    department: 'Marketing'
  },
  {
    id: 24,
    firstName: 'Lisa',
    lastName: 'Hall',
    dateOfBirth: '1988-10-21',
    startDate: '2018-05-30',
    street: '246 Cedar Street',
    city: 'Las Vegas',
    state: 'Nevada',
    zipCode: '89101',
    department: 'Human Resources'
  },
  {
    id: 25,
    firstName: 'Christopher',
    lastName: 'Allen',
    dateOfBirth: '1994-08-04',
    startDate: '2021-10-06',
    street: '579 Birch Place',
    city: 'Memphis',
    state: 'Tennessee',
    zipCode: '37501',
    department: 'Legal'
  },
  {
    id: 26,
    firstName: 'Betty',
    lastName: 'Young',
    dateOfBirth: '1987-03-18',
    startDate: '2017-04-12',
    street: '681 Oak Avenue',
    city: 'Baltimore',
    state: 'Maryland',
    zipCode: '21201',
    department: 'Sales'
  }
]

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(initialEmployees)

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now()
    }
    setEmployees(prev => [...prev, newEmployee])
  }

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployees() {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider')
  }
  return context
}
