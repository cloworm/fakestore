import { FunctionComponent, useContext } from 'react'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

import { CurrencyContext } from '../App'

const AppName = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.25em;
` as typeof Link

const NavItems = styled(Box)`
  padding-left: 25px;
  display: flex;
  gap: 10px;
` as typeof Box

const SpaceBetween = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
` as typeof Box

const NavButton = styled(Button)`
  color: #fff;
  text-decoration: none;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #fff;
  }
` as typeof Button

const Navbar: FunctionComponent = () => {
  const { currency, setCurrency } = useContext(CurrencyContext)
  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(currencyCode)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AppName
            component={RouterLink}
            to=""
          >
            fakestore
          </AppName>
          <SpaceBetween>
            <NavItems>
              <NavButton component={RouterLink} variant="text" to="">Home</NavButton>
              <NavButton component={RouterLink} variant="text" to="products">Products</NavButton>
            </NavItems>
            <Box>
              <NavButton variant="text" onClick={() => handleCurrencyChange('USD')}>$</NavButton>
              <NavButton variant="text" onClick={() => handleCurrencyChange('EUR')}>&euro;</NavButton>
            </Box>
          </SpaceBetween>
        </Toolbar>
      </Container>
    </AppBar>
  )
} 

export default Navbar
