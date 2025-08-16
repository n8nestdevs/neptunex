// src/pages/DetailPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import VesselDetail from '../components/VesselDetail';
import { IconArrowLeft } from '../components/Icons';

const DetailPage: React.FC = () => {
  const { vesselId } = useParams<{ vesselId: string }>();
  const navigate = useNavigate();
  const { vessels } = useAppContext();

  const vessel = vessels.find(v => v.id === vesselId);

  const handleBack = () => {
    // If there is navigation history, go back; otherwise go to /tracking
    const canGoBack = window.history.length > 1;
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/tracking');
    }
  };

  return (
    <div className="container mx-auto">
      <button
        onClick={handleBack}
        className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 mb-6 group"
        aria-label="Return to Tracking"
        type="button"
      >
        <IconArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span>Return to Tracking</span>
      </button>

      {vessel ? (
        <VesselDetail vessel={vessel} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-200">Vessel not found</h2>
          <p className="text-slate-400 mt-2">
            Could not find vessel with IMO: {vesselId}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailPage;