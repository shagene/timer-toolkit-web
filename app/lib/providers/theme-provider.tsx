'use client';

import { useTheme } from '@/app/lib/hooks/useTheme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // This hook will apply theme settings to the document
  useTheme();
  
  return <>{children}</>;
}
