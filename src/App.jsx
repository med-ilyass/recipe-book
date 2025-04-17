import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Home from './pages/Home'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import RecipeDetails from './pages/RecipeDetails'
import { AuthProvider } from './context/AuthContext'
import Favorites from './pages/Favorites'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App