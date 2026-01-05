// src/components/ToastProvider.tsx
import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  isDark: boolean;
}

export function ToastProvider({ isDark }: ToastProviderProps) {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? '#0a0e27' : '#ffffff',
          color: isDark ? '#f0f0f0' : '#111827',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          borderRadius: '0.5rem',
          padding: '12px 16px',
          },

        success: {
          style: {
            background: isDark ? '#16a34a' : '#22c55e',
            color: '#ffffff',
          },
        },
        error: {
          style: {
            background: isDark ? '#dc2626' : '#ef4444',
            color: '#ffffff',
          },
          },
        loading: {
          style: {
                background: isDark ? '#2563eb' : '#3b82f6', 
                color: '#ffffff',
            },
        },
      }}
    />
  );
}
