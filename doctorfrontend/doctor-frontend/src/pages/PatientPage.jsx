// src/components/PatientPage.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const fetchPatients = async () => {
    const res = await api.get('/patients');
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/patients', form);
    setForm({ name: '', email: '', phone: '' });
    fetchPatients();
  };

  const handleDelete = async (id) => {
    await api.delete(`/patients/${id}`);
    fetchPatients();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient Management</h2>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border" required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border" required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="p-2 border" required />
        <button type="submit" className="col-span-2 bg-green-500 text-white py-2">Add Patient</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="border p-2">{patient.id}</td>
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.email}</td>
              <td className="border p-2">{patient.phone}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(patient.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
