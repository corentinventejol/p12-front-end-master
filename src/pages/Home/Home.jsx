import { useEffect } from 'react'
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import './Home.css'

function Home() {
  // Métadonnées SEO spécifiques à la page Home
  useEffect(() => {
    // Changer le titre de la page
    document.title = 'Créer un Employé - HRnet'
    
    // Ajouter ou mettre à jour la meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Ajoutez de nouveaux employés à votre système HRnet. Formulaire simple et intuitif pour saisir toutes les informations nécessaires des nouveaux collaborateurs.')
    
    // Nettoyage lors du démontage du composant
    return () => {
      document.title = 'HRnet'
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        meta.setAttribute('content', 'HRnet - Système de gestion des employés')
      }
    }
  }, [])

  return (
    <div className="home-page dark:bg-slate-900">
      <EmployeeForm />
    </div>
  )
}

export default Home
