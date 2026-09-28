import { createBrowserRouter } from 'react-router-dom'
import { PortfolioLayout } from '../layouts/PortfolioLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PortfolioPage } from '../pages/PortfolioPage'

export const router = createBrowserRouter([
  {
    element: <PortfolioLayout />,
    children: [
      { index: true, element: <PortfolioPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
