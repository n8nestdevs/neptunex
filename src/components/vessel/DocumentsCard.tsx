// src/components/vessel/DocumentsCard.tsx
import React, { useRef } from 'react';
import { Vessel } from '../../types';
import SectionCard from './SectionCard';
import { IconPaperclip, IconFile, IconUpload } from '../Icons';
import { useAppContext } from '../../context/AppContext';

const DocumentsCard: React.FC<{ vessel: Vessel }> = ({ vessel }) => {
  const { userRole, addDocument } = useAppContext();
  const isAdmin = userRole === 'Admin';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Mock: registramos el nombre; en backend real, subiríamos y guardaríamos una URL segura.
    addDocument(vessel.id, file.name);
    // Limpia el input para permitir re-subir el mismo archivo si se quiere
    e.currentTarget.value = '';
  };

  return (
    <SectionCard title="Documentation" icon={<IconPaperclip className="w-6 h-6" />}>
      <ul className="space-y-3">
        {vessel.documents.length > 0 ? (
          vessel.documents.map((doc) => (
            <li key={doc.id}>
              <a
                href={doc.url || '#'}
                target={doc.url ? '_blank' : undefined}
                rel={doc.url ? 'noopener noreferrer' : undefined}
                download={!doc.url ? doc.name : undefined}
                className="flex items-center space-x-3 p-3 bg-navy-700/50 rounded-md hover:bg-navy-700 transition-colors group"
              >
                <IconFile className="w-5 h-5 text-slate-400 group-hover:text-teal-400" />
                <span className="text-sm text-slate-300 group-hover:text-white flex-grow">{doc.name}</span>
              </a>
            </li>
          ))
        ) : (
          <p className="text-slate-400 text-sm">No hay documentos adjuntos.</p>
        )}
      </ul>

      {isAdmin && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={handlePickFile}
            className="w-full mt-4 flex items-center justify-center space-x-2 bg-teal-500 text-navy-900 font-bold py-2 px-4 rounded-md hover:bg-teal-400 transition-colors"
          >
            <IconUpload className="w-5 h-5" />
            <span>Attach PDF</span>
          </button>
        </>
      )}
    </SectionCard>
  );
};

export default DocumentsCard;