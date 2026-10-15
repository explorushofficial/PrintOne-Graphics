'use client';

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
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
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'printone-enquiry-cart-v1';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): string {
  return window.localStorage.getItem(STORAGE_KEY) || '[]';
}

function getServerSnapshot(): string {
  return '[]';
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [internalLines, setInternalLines] = useState<CartLine[] | null>(null);

  const rawStorage = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const lines = useMemo<CartLine[]>(() => {
    if (internalLines !== null) return internalLines;
    try {
      return JSON.parse(rawStorage) as CartLine[];
    } catch {
      return [];
    }
  }, [internalLines, rawStorage]);

  const updateLines = useCallback(
    (newLines: CartLine[] | ((prev: CartLine[]) => CartLine[])) => {
      setInternalLines((prev) => {
        const current = prev !== null ? prev : lines;
        const next = typeof newLines === 'function' ? newLines(current) : newLines;
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [lines]
  );

  const value = useMemo<CartContextValue>(() => ({
    lines,
    count: lines.reduce((total, line) => total + line.quantity, 0),
    isCartOpen,
    setIsCartOpen,
    add: (service) => {
      updateLines((current) => {
        const existing = current.find((line) => line.service.id === service.id);
        if (existing) {
          return current.map((line) =>
            line.service.id === service.id ? { ...line, quantity: line.quantity + 1 } : line
          );
        }
        return [...current, { service, quantity: 1 }];
      });
      setIsCartOpen(true);
    },
    setQuantity: (id, quantity) =>
      updateLines((current) =>
        current.map((line) => (line.service.id === id ? { ...line, quantity: Math.max(1, quantity) } : line))
      ),
    remove: (id) => updateLines((current) => current.filter((line) => line.service.id !== id)),
    clear: () => updateLines([]),
  }), [lines, isCartOpen, updateLines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

export function getWhatsAppNumber(): string {
  const envNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_PHONE_NUMBER ||
    '919594005894';
  // Strip all non-digit characters (+, spaces, dashes, parentheses)
  return envNumber.replace(/[^\d]/g, '');
}

export function createWhatsAppUrl(message: string) {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
