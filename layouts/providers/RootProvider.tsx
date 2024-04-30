import React from 'react';
import SProvider from './SessionProvider';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return <SProvider>{children}</SProvider>;
}
