import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PetAdvicePage from './pages/PetAdvicePage.jsx'
import PetCarePage from './pages/PetCarePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import TeamPage from './pages/TeamPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<HomePage />} index />
        <Route element={<AboutPage />} path="about" />
        <Route element={<ServicesPage />} path="services" />
        <Route element={<PetCarePage pet="cat" />} path="cat-care" />
        <Route element={<PetCarePage pet="dog" />} path="dog-care" />
        <Route element={<PetAdvicePage />} path="pet-advice" />
        <Route element={<TeamPage />} path="team" />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}
