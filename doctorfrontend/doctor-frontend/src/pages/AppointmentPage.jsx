// src/components/AppointmentPage.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    doctorId: '',
    patientId: '',
    appointmentDateTime: '',
  });

  const fetchData = async () => {
    const [doctorRes, patientRes, appointmentRes] = await Promise.all([
      api.get('/doctors'),
      api.get('/patients'),
      api.get('/appointments'),
    ]);
    setDoctors(doctorRes.data);
    setPatients(patientRes.data);
    setAppointments(appointmentRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post('/appointments', {
      doctorId: form.doctorId,
      patientId: form.patientId,
      dateTime: form.appointmentDateTime, // ✅ make sure backend expects `dateTime`
    });

    setForm({ doctorId: '', patientId: '', appointmentDateTime: '' }); // reset form
    fetchData(); // reload table
  } catch (err) {
    console.error('Error booking appointment:', err);
  }
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Appointment Management</h2>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-3 gap-4">
        <select name="doctorId" value={form.doctorId} onChange={handleChange} className="p-2 border" required>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <select name="patientId" value={form.patientId} onChange={handleChange} className="p-2 border" required>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="appointmentDateTime"
          value={form.appointmentDateTime}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <button type="submit" className="col-span-3 bg-purple-600 text-white py-2">Book Appointment</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Patient</th>
            <th className="border p-2">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td className="border p-2">{a.id}</td>
              <td className="border p-2">{a.doctor.name}</td>
              <td className="border p-2">{a.patient.name}</td>
              <td className="border p-2">{a.appointmentDateTime.replace('T', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
