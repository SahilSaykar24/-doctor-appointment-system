import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DoctorPage from "./pages/DoctorPage";
import PatientPage from "./pages/PatientPage";
import AppointmentPage from "./pages/AppointmentPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-start sm:justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-3xl">
          <header className="bg-white shadow-md rounded-xl px-6 py-4 mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4">
              Doctor Appointment System
            </h1>
            <nav className="flex flex-wrap justify-center gap-4 text-base sm:text-lg font-medium">
              <Link to="/doctors" className="text-purple-600 hover:text-purple-800 transition">
                Doctors
              </Link>
              <Link to="/patients" className="text-purple-600 hover:text-purple-800 transition">
                Patients
              </Link>
              <Link to="/appointments" className="text-purple-600 hover:text-purple-800 transition">
                Appointments
              </Link>
            </nav>
          </header>

          <main className="bg-white shadow rounded-xl p-4 sm:p-6">
            <Routes>
              <Route path="/doctors" element={<DoctorPage />} />
              <Route path="/patients" element={<PatientPage />} />
              <Route path="/appointments" element={<AppointmentPage />} />
            </Routes>
          </main>

          <footer className="text-center text-sm text-gray-500 py-6 mt-6">
            &copy; {new Date().getFullYear()} Doctor Appointment System. All rights reserved.
          </footer>
        </div>
      </div>
    </Router>
  );
}
