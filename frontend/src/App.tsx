import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { router } from './routes/router'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
