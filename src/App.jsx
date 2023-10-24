import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import './global.css'
import { Router } from './router'
import { Footer } from './components/Footer'

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <Router/>   
      <Footer/>   
    </BrowserRouter>
  )
}

export default App
