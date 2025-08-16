
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { UserRole, Vessel } from '../types';
import { initialVessels } from '../data/mockData';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  vessels: Vessel[];
  updateVessel: (updatedVessel: Vessel) => void;
  updateChecklistItem: (vesselId: string, checklistItemId: string, completed: boolean) => void;
  addDocument: (vesselId: string, documentName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.ReadOnly);
  const [vessels, setVessels] = useState<Vessel[]>(initialVessels);

  const updateVessel = useCallback((updatedVessel: Vessel) => {
    setVessels(prevVessels =>
      prevVessels.map(v => (v.id === updatedVessel.id ? updatedVessel : v))
    );
  }, []);

  const updateChecklistItem = useCallback((vesselId: string, checklistItemId: string, completed: boolean) => {
    setVessels(prevVessels =>
      prevVessels.map(vessel => {
        if (vessel.id === vesselId) {
          const updatedChecklist = vessel.complianceChecklist.map(item =>
            item.id === checklistItemId ? { ...item, completed } : item
          );
          return { ...vessel, complianceChecklist: updatedChecklist };
        }
        return vessel;
      })
    );
  }, []);
  
  const addDocument = useCallback((vesselId: string, documentName: string) => {
    setVessels(prevVessels => 
      prevVessels.map(vessel => {
        if (vessel.id === vesselId) {
            const newDocument = {
                id: `doc-${Date.now()}`,
                name: documentName,
                url: '#', // Placeholder URL
                uploadedAt: new Date().toISOString(),
            };
            return { ...vessel, documents: [...vessel.documents, newDocument] };
        }
        return vessel;
      })
    );
  }, []);


  const value = { userRole, setUserRole, vessels, updateVessel, updateChecklistItem, addDocument };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
