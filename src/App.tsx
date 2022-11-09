import { FunctionComponent } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/Home'
import Products from './pages/Products'
import Navbar from './components/Navbar'

const queryClient = new QueryClient()

const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="products" element={<Products />} />
          </Routes>
        </Container>
      </Router>
    </QueryClientProvider>
  )
}

export default App
