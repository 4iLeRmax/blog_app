'use client'

import React from 'react';
import { createPortal } from 'react-dom';

const ModalsPortal = ({ children }: { children: React.ReactNode }) => {
  const container = document?.getElementById('modals');
  // console.log(document);
  

  return container ? createPortal(children, container) : null;
};

export default React.memo(ModalsPortal);
