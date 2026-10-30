import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import EndpointPage from "./pages/EndpointPage";
import EndpointDetailsPage from "./pages/EndpointDetailsPage";
import EndpointFormPage from "./pages/EndpointFormPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
      <BrowserRouter><Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/endpoints" element={<EndpointPage />} />
          <Route path="/endpoints/new" element={<EndpointFormPage />} />
          <Route path="/endpoints/:id/edit" element={<EndpointFormPage edit />} />
          <Route path="/endpoints/:id/details" element={<EndpointDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes></BrowserRouter>
  );
}

export default App;
