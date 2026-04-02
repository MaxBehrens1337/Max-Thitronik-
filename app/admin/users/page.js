"use client";

import { useAuth } from '@/lib/auth';
import { API } from '@/lib/store';
import { Users, Edit2, Shield, User as UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const { Auth, currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setMounted(true);
    if (!currentUser || !Auth.isAdmin()) {
      window.location.href = '/admin';
      return;
    }
    loadUsers();
  }, [currentUser, Auth]);

  const loadUsers = () => {
    setUsers(API.getUsers());
  };

  const handleEdit = (u) => {
    setEditingUser({ ...u });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const allUsers = [...users];
    const idx = allUsers.findIndex(u => u.id === editingUser.id);
    if (idx >= 0) {
        allUsers[idx] = editingUser;
    } else {
        allUsers.push(editingUser);
    }
    API.saveUsers(allUsers);
    setEditingUser(null);
    loadUsers();
  };

  if (!mounted || !currentUser) return null;

  if (editingUser) {
    return (
      <div className="admin-page">
        <h1 className="page-title">Benutzer bearbeiten</h1>
        
        <form onSubmit={handleSave} className="card admin-form" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            
            <div className="admin-form-grid-2">
              <div className="form-group">
                <label>Vorname</label>
                <input required type="text" value={editingUser.firstName} onChange={e => setEditingUser({...editingUser, firstName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Nachname</label>
                <input required type="text" value={editingUser.lastName} onChange={e => setEditingUser({...editingUser, lastName: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label>E-Mail Adresse (Login)</label>
              <input required type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} />
            </div>

            <div className="admin-form-grid-2">
              <div className="form-group">
                <label>Rolle</label>
                <select value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})}>
                  <option value="learner">Lernender</option>
                  <option value="trainer">Trainer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="form-group">
                <label>Passwort</label>
                <input required type="text" value={editingUser.password} onChange={e => setEditingUser({...editingUser, password: e.target.value})} />
              </div>
            </div>

            <div className="admin-form-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Abbrechen</button>
              <button type="submit" className="btn btn-primary">Nutzer Speichern</button>
            </div>
            
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">Benutzerverwaltung</h1>
        <p className="page-subtitle">Zentrale Steuerung aller Accounts und Rollenrechte.</p>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nutzer</th>
              <th>Kontakt (E-Mail)</th>
              <th>Rolle</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="td-name">
                  <div className="cell-inline" style={{ gap: 'var(--sp-3)' }}>
                    <div className="user-avatar">
                      {u.firstName[0]}{u.lastName[0]}
                    </div>
                    {u.firstName} {u.lastName}
                  </div>
                </td>
                <td className="td-secondary" style={{ fontSize: '15px' }}>
                  {u.email}
                </td>
                <td>
                  <span className={`role-badge role-badge--${u.role}`}>
                    {u.role === 'admin' ? <Shield size={14}/> : <UserIcon size={14} />}
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleEdit(u)} className="icon-btn icon-btn--edit" title="Bearbeiten"><Edit2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
