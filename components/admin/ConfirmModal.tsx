import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmLabel = 'Confirmer',
  danger = true,
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${danger ? 'bg-red-50' : 'bg-amber-50'}`}>
          <AlertTriangle className={`w-5 h-5 ${danger ? 'text-red-500' : 'text-amber-500'}`} />
        </div>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{message}</p>

      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            danger
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-soft-600 hover:bg-soft-700 text-white'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
