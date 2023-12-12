'use client'

import { AnimatePresence } from 'framer-motion'
import React from 'react'

export default function AnimatePresenceWrapper({children}: {children: React.ReactNode}) {
  return (
    <AnimatePresence>{children}</AnimatePresence>
  )
}
