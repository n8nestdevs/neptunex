import React, { createContext, useState, useContext, ReactNode, useCallback, useMemo } from 'react';
import { UserRole, Vessel } from '../types';
import { initialVessels } from '../data/mockData';

type AppContextType = {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  vessels: Vessel[];
  updateVessel: (updatedVessel: Vessel) => void;
  updateChecklistItem: (vesselId: string, checklistItemId: string, completed: boolean) => void;
  addChecklistItem: (vesselId: string, task: string) => void;
  getChecklistTemplate: () => string[];
  addDocument: (vesselId: string, documentName: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ReadOnly);
  const [vessels, setVessels] = useState<Vessel[]>(initialVessels);

  // Plantilla global: tareas únicas encontradas en TODOS los buques mock
  const checklistTemplate = useMemo<string[]>(() => {
    const set = new Set<string>();
    initialVessels.forEach(v =>
      v.complianceChecklist.forEach(item => {
        const task = (item.task || '').trim();
        if (task) set.add(task);
      })
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const getChecklistTemplate = useCallback(() => checklistTemplate, [checklistTemplate]);

  const updateVessel = useCallback((updatedVessel: Vessel) => {
    setVessels(prev =>
      prev.map(v => (v.id === updatedVessel.id ? updatedVessel : v))
    );
  }, []);

  const updateChecklistItem = useCallback((vesselId: string, checklistItemId: string, completed: boolean) => {
    setVessels(prev =>
      prev.map(vessel => {
        if (vessel.id !== vesselId) return vessel;
        const updatedChecklist = vessel.complianceChecklist.map(item =>
          item.id === checklistItemId ? { ...item, completed } : item
        );
        return { ...vessel, complianceChecklist: updatedChecklist };
      })
    );
  }, []);

  const addChecklistItem = useCallback((vesselId: string, task: string) => {
    const trimmed = task.trim();
    if (!trimmed) return;

    setVessels(prev =>
      prev.map(vessel => {
        if (vessel.id !== vesselId) return vessel;

        // evitar duplicados por texto
        const already = vessel.complianceChecklist.some(i => i.task.toLowerCase() === trimmed.toLowerCase());
        if (already) return vessel;

        const newItem = {
          id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          task: trimmed,
          completed: false,
        };

        return { ...vessel, complianceChecklist: [...vessel.complianceChecklist, newItem] };
      })
    );
  }, []);

  const addDocument = useCallback((vesselId: string, documentName: string) => {
    setVessels(prev =>
      prev.map(vessel => {
        if (vessel.id !== vesselId) return vessel;
        const newDocument = {
          id: `doc-${Date.now()}`,
          name: documentName,
          url: '#',
          uploadedAt: new Date().toISOString(),
        };
        return { ...vessel, documents: [...vessel.documents, newDocument] };
      })
    );
  }, []);

  const value: AppContextType = {
    userRole,
    setUserRole,
    vessels,
    updateVessel,
    updateChecklistItem,
    addChecklistItem,
    getChecklistTemplate,
    addDocument,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within an AppProvider');
  return ctx;
};