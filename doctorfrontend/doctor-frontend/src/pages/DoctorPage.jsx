import { useEffect, useState } from 'react';
import api from '../api/axios';


export default function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
  });

  const fetchDoctors = async () => {
    const res = await api.get('/doctors');
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/doctors', form);
    setForm({ name: '', email: '', phone: '', specialization: '' });
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    await api.delete(`/doctors/${id}`);
    fetchDoctors();
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Doctor Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Add Doctor
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-300 rounded-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 border">ID</th>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Phone</th>
              <th className="px-3 py-2 border">Specialization</th>
              <th className="px-3 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-3 py-2 border">{doc.id}</td>
                <td className="px-3 py-2 border">{doc.name}</td>
                <td className="px-3 py-2 border">{doc.email}</td>
                <td className="px-3 py-2 border">{doc.phone}</td>
                <td className="px-3 py-2 border">{doc.specialization}</td>
                <td className="px-3 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No doctors available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
