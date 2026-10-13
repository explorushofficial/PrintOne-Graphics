import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Service } from '@/data/services';

export type CartLine = {
  service: Service;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (service: Service) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'printone-enquiry-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setLines(JSON.parse(saved) as CartLine[]);
    } catch {
      setLines([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    count: lines.reduce((total, line) => total + line.quantity, 0),
    add: (service) => setLines((current) => {
      const existing = current.find((line) => line.service.id === service.id);
      if (existing) {
        return current.map((line) => line.service.id === service.id ? { ...line, quantity: line.quantity + 1 } : line);
      }
      return [...current, { service, quantity: 1 }];
    }),
    setQuantity: (id, quantity) => setLines((current) => current.map((line) => line.service.id === id ? { ...line, quantity: Math.max(1, quantity) } : line)),
    remove: (id) => setLines((current) => current.filter((line) => line.service.id !== id)),
    clear: () => setLines([]),
  }), [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/919594005894?text=${encodeURIComponent(message)}`;
}
