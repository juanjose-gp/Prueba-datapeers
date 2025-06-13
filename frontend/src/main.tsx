import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes.tsx'
import { UserProvider } from './context/user_context';

createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
</StrictMode>
)
