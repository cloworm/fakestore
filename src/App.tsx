import { FunctionComponent, createContext, useState, useMemo } from 'react'
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
import Product from './pages/Product'
import Navbar from './components/Navbar'

const queryClient = new QueryClient()

export const CurrencyContext = createContext<{ currency: string; setCurrency: React.Dispatch<React.SetStateAction<string>>; }>({
  currency: '',
  setCurrency: () => { return '' },
})

const App: FunctionComponent = () => {
  const [currency, setCurrency] = useState('USD')
  const value = useMemo(
    () => ({ currency, setCurrency }), 
    [currency]
  )

  return (
    <CurrencyContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Container maxWidth="lg">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:productId" element={<Product />} />
              <Route
                path="*"
                element={
                  <p>There&apos;s nothing here!</p>
                }
              />
            </Routes>
          </Container>
        </Router>
      </QueryClientProvider>
    </CurrencyContext.Provider>
  )
}

export default App
