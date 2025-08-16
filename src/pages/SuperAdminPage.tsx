// src/pages/SuperAdminPage.tsx
import React, { useState } from 'react';
import { Role, StoredUser, useAuth } from '../context/AuthContext';

const roleOptions: Role[] = ['SuperAdmin', 'Admin', 'ReadOnly'];

// Password generator
function generatePassword(length: number = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$';
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

const emptyForm = (): Omit<StoredUser, 'id'> => ({
  name: '',
  email: '',
  role: 'ReadOnly',
  password: '',
});

const SuperAdminPage: React.FC = () => {
  const { users, createUser, updateUser, deleteUser, resetPassword, user: me } = useAuth();

  const [form, setForm] = useState<Omit<StoredUser, 'id'>>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);

  const [resetForId, setResetForId] = useState<string | null>(null);
  const [newPass, setNewPass] = useState('');

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (editingId) {
      updateUser(editingId, form);
      setEditingId(null);
    } else {
      createUser(form);
    }
    setForm(emptyForm());
  };

  const onEdit = (id: string) => {
    const u = users.find(x => x.id === id);
    if (!u) return;
    setForm({ name: u.name, email: u.email, role: u.role, password: u.password });
    setEditingId(u.id);
  };

  const onDelete = (id: string) => {
    if (me?.id === id) {
      alert("You can't delete your own user.");
      return;
    }
    if (confirm('Delete user?')) deleteUser(id);
  };

  const onOpenReset = (id: string) => {
    setResetForId(id);
    setNewPass('');
  };

  const onDoReset = () => {
    if (!resetForId) return;
    if (!newPass.trim()) return alert('Type a new password');
    resetPassword(resetForId, newPass.trim());
    setResetForId(null);
    setNewPass('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">SuperAdmin · User management</h1>
      </div>

      {/* Create / Edit */}
      <div className="bg-navy-800 border border-navy-700 rounded-lg p-4">
        <h2 className="text-slate-200 font-semibold mb-3">
          {editingId ? 'Edit user' : 'Create user'}
        </h2>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <input
            className="rounded-md bg-navy-700 border border-navy-600 text-slate-100 px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="rounded-md bg-navy-700 border border-navy-600 text-slate-100 px-3 py-2"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="rounded-md bg-navy-700 border border-navy-600 text-slate-100 px-3 py-2"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value as Role })}
          >
            {roleOptions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <input
            className="rounded-md bg-navy-700 border border-navy-600 text-slate-100 px-3 py-2"
            placeholder="Password"
            type="text"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setForm({ ...form, password: generatePassword() })}
            className="bg-gray-500 hover:bg-gray-400 text-white rounded-md px-3"
          >
            Gen
          </button>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold rounded-md px-4"
          >
            {editingId ? 'Save' : 'Create'}
          </button>
        </form>
      </div>

      {/* Users table */}
      <div className="bg-navy-800 border border-navy-700 rounded-lg p-4">
        <h2 className="text-slate-200 font-semibold mb-3">Users</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {users.map(u => (
                <tr key={u.id} className="border-t border-navy-700">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => onEdit(u.id)}
                      className="px-2 py-1 rounded bg-navy-700 hover:bg-navy-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenReset(u.id)}
                      className="px-2 py-1 rounded bg-navy-700 hover:bg-navy-600"
                    >
                      Reset pass
                    </button>
                    <button
                      onClick={() => onDelete(u.id)}
                      className="px-2 py-1 rounded bg-red-600 hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td className="p-2 text-slate-400" colSpan={4}>
                    No users.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* simple modal for password reset */}
      {resetForId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-navy-800 border border-navy-700 rounded-lg p-4 w-full max-w-sm">
            <h3 className="text-slate-200 font-semibold mb-2">Reset password</h3>
            <div className="flex gap-2 mb-3">
              <input
                className="flex-1 rounded-md bg-navy-700 border border-navy-600 text-slate-100 px-3 py-2"
                placeholder="New password"
                type="text"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setNewPass(generatePassword())}
                className="bg-gray-500 hover:bg-gray-400 text-white rounded-md px-3"
              >
                Gen
              </button>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setResetForId(null)}
                className="px-3 py-2 rounded bg-navy-700 hover:bg-navy-600"
              >
                Cancel
              </button>
              <button
                onClick={onDoReset}
                className="px-3 py-2 rounded bg-teal-500 hover:bg-teal-400 text-navy-900 font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPage;