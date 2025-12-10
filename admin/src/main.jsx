import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DoctorContextProvider from './context/Doctorcontext.jsx'
import AppContextProvider from './context/Appcontext.jsx'
import AdminContextProvider from './context/Admincontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DoctorContextProvider>
      <AppContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </AppContextProvider>
    </DoctorContextProvider>
  </BrowserRouter>


)
