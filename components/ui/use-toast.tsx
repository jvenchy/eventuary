// src/components/ui/use-toast.tsx
import { createContext, useContext } from 'react';

interface ToastMessage {
  title: string;
  description: string;
}

const ToastContext = createContext({
  toast: (message: ToastMessage) => console.log(message), // Replace with actual toast logic
});

export const useToast = () => {
  return useContext(ToastContext);
};