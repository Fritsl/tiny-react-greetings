import { useState } from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((current) => [...current, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
}