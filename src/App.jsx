import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import GuidesPage from './pages/GuidesPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PetCarePage from './pages/PetCarePage.jsx'
import PetAdvicePage from './pages/PetAdvicePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ServiceGuidePage from './pages/ServiceGuidePage.jsx'
import TeamPage from './pages/TeamPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<HomePage />} index />
        <Route element={<AboutPage />} path="about" />
        <Route element={<GuidesPage />} path="guides" />
        <Route element={<ServiceGuidePage />} path="pet-care/:slug" />
        <Route element={<ServiceGuidePage />} path=":section/:slug" />
        <Route element={<ServicesPage />} path="services" />
        <Route element={<PetCarePage />} path="pet-care" />
        <Route element={<PetAdvicePage />} path="pet-advice" />
        <Route element={<Navigate replace to="/pet-advice" />} path="cat-care" />
        <Route element={<Navigate replace to="/pet-advice" />} path="dog-care" />
        <Route element={<TeamPage />} path="team" />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}
