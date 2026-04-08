import React, { useState } from 'react';
import { Database, CheckCircle2, Loader2 } from 'lucide-react';
import { seedAppointments } from '../../lib/appointments';
import { SEED_PATIENTS } from '../../lib/seedData';

interface SeedButtonProps {
  onSuccess: () => void;
}

const SeedButton: React.FC<SeedButtonProps> = ({ onSuccess }) => {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSeed = async () => {
    if (!confirm('Insérer 18 patients de démonstration dans la base de données ?')) return;
    setState('loading');
    try {
      await seedAppointments(SEED_PATIENTS);
      setState('done');
      setTimeout(() => { setState('idle'); onSuccess(); }, 2000);
    } catch (err) {
      console.error(err);
      setState('idle');
      alert("Erreur lors de l'insertion des données.");
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={state !== 'idle'}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-soft-300 text-soft-600 hover:bg-soft-50 text-sm font-medium transition-all disabled:opacity-60"
    >
      {state === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
      {state === 'done'    && <CheckCircle2 className="w-4 h-4 text-green-500" />}
      {state === 'idle'    && <Database className="w-4 h-4" />}
      {state === 'loading' ? 'Insertion...' : state === 'done' ? 'Données insérées !' : 'Insérer données démo'}
    </button>
  );
};

export default SeedButton;
