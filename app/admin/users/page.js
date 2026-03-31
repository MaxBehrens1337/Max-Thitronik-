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
    // Only Root Admin can see this page
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
        // Pseudo-Create for new users (if implemented later)
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
        
        <form onSubmit={handleSave} className="card" style={{ maxWidth: '600px', marginTop: 'var(--sp-6)' }}>
          <div className="card-body" style={{ display: 'grid', gap: 'var(--sp-4)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="label">Vorname</label>
                <input required type="text" className="input" value={editingUser.firstName} onChange={e => setEditingUser({...editingUser, firstName: e.target.value})} />
              </div>
              <div>
                <label className="label">Nachname</label>
                <input required type="text" className="input" value={editingUser.lastName} onChange={e => setEditingUser({...editingUser, lastName: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="label">E-Mail Adresse (Login)</label>
              <input required type="email" className="input" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="label">Rolle</label>
                <select className="input" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})}>
                  <option value="learner">Lernender</option>
                  <option value="trainer">Trainer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div>
                <label className="label">Passwort</label>
                <input required type="text" className="input" value={editingUser.password} onChange={e => setEditingUser({...editingUser, password: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--sp-4)', marginTop: 'var(--sp-6)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--border-color)' }}>
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
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--gray-soft)', borderBottom: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '16px' }}>Nutzer</th>
              <th style={{ padding: '16px' }}>Kontakt (E-Mail)</th>
              <th style={{ padding: '16px' }}>Rolle</th>
              <th style={{ padding: '16px', textAlign: 'right' }}>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', ':hover': { background: 'var(--gray-soft)' } }}>
                <td style={{ padding: '16px', fontWeight: '500' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--th-blue-primary), var(--th-blue-secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                      {u.firstName[0]}{u.lastName[0]}
                    </div>
                    {u.firstName} {u.lastName}
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '15px' }}>
                  {u.email}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '6px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                    background: u.role === 'admin' ? 'var(--color-error-bg)' : u.role === 'trainer' ? 'var(--color-warning-bg)' : 'var(--color-info-bg)',
                    color: u.role === 'admin' ? 'var(--color-error)' : u.role === 'trainer' ? 'var(--color-warning)' : 'var(--color-info)',
                    display: 'inline-flex', alignItems: 'center', gap: '6px'
                  }}>
                    {u.role === 'admin' ? <Shield size={14}/> : <UserIcon size={14} />}
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(u)} className="btn" style={{ padding: '6px', color: 'var(--th-blue-secondary)' }} title="Bearbeiten"><Edit2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
