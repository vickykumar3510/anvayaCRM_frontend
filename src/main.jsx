import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import SalesAgent from './pages/SalesAgentView.jsx';
import SalesAgentManagementScreen from './pages/SalesAgentManagementScreen.jsx';
import ReportScreen from './pages/ReportScreen.jsx';
import LeadStatusView from './pages/LeadStatusView.jsx';
import LeadListScreen from './pages/LeadListScreen.jsx'
import AddNewLeadScreen from './pages/AddNewLeadScreen.jsx';
import { LeadProvider } from './contexts/LeadContext.jsx';
import { SalesAgentProvider } from './contexts/SalesAgentContext.jsx';
import SalesAgentView from './pages/SalesAgentView.jsx'
import AddNewSalesAgent from './pages/AddNewSalesAgent.jsx';
import LeadManagementWrapper from './pages/LeadManagementWrapper.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./charts/ChartSetup.jsx";
import Settings from './pages/Settings.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const withAuth = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Navigate to="/" replace />
  },
  {
    path: "/signuppage",
    element: <SignUpPage />
  },
  {
    path: "/dashboard",
    element: withAuth(<App />)
  },
  {
    path: "/addnewleadscreen",
    element: withAuth(<AddNewLeadScreen />)
  },
  {
    path: "/leadlistscreen",
    element: withAuth(<LeadListScreen/>)
  },
  {
    path: "/leadstatusview/:status",
    element: withAuth(<LeadStatusView />)
  },
  {
    path: "/reportscreen",
    element: withAuth(<ReportScreen />)
  },
  {
    path: "/salesagentmanagementscreen",
    element: withAuth(<SalesAgentManagementScreen/>)
  },
  {
    path: "/salesagent",
    element: withAuth(<SalesAgent />)
  },
  {
    path: "/salesagentview/:agentId",
    element: withAuth(<SalesAgentView/>)
  },
  {
    path: "/addnewsalesagent",
    element: withAuth(<AddNewSalesAgent/>)
  },
  {
    path: "/leadmanagementscreen/:leadId",
    element: withAuth(<LeadManagementWrapper/>)
  },
  {
    path: "/settings",
    element: withAuth(<Settings/>)
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeadProvider>
    <SalesAgentProvider>
       <ToastContainer position="top-right" autoClose={3000} />
    <RouterProvider router={router}  />
    </SalesAgentProvider>
    </LeadProvider>
  </StrictMode>
)
