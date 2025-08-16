// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';

export type Role = 'SuperAdmin' | 'Admin' | 'ReadOnly';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type StoredUser = AuthUser & { password: string };

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  users: StoredUser[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // SuperAdmin actions
  createUser: (u: Omit<StoredUser, 'id'>) => void;
  updateUser: (id: string, patch: Partial<StoredUser>) => void;
  deleteUser: (id: string) => void;
  resetPassword: (id: string, newPass: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'neptuno_users';
const SESSION_KEY = 'neptuno_session';

function seedIfEmpty(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (raw) return JSON.parse(raw);

  const seed: StoredUser[] = [
    {
      id: nanoid(),
      name: 'Root',
      email: 'super@neptuno.local',
      role: 'SuperAdmin',
      password: 'admin12345',
    },
    {
      id: nanoid(),
      name: 'Ops Admin',
      email: 'admin@neptuno.local',
      role: 'Admin',
      password: 'admin123',
    },
    {
      id: nanoid(),
      name: 'Guest',
      email: 'guest@neptuno.local',
      role: 'ReadOnly',
      password: 'guest',
    },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seed));
  return seed;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<StoredUser[]>(() => seedIfEmpty());
  const [user, setUser] = useState<AuthUser | null>(null);

  // Hydrate session
  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const u = JSON.parse(raw) as AuthUser;
      setUser(u);
    }
  }, []);

  // Persist users
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const login = async (email: string, password: string) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      throw new Error('Credenciales inválidas');
    }
    const safe: AuthUser = { id: found.id, name: found.name, email: found.email, role: found.role };
    setUser(safe);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  // SuperAdmin ops
  const createUser = (u: Omit<StoredUser, 'id'>) => {
    setUsers(prev => [...prev, { ...u, id: nanoid() }]);
  };
  const updateUser = (id: string, patch: Partial<StoredUser>) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...patch } : u)));
  };
  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };
  const resetPassword = (id: string, newPass: string) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, password: newPass } : u)));
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      users,
      login,
      logout,
      createUser,
      updateUser,
      deleteUser,
      resetPassword,
    }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};