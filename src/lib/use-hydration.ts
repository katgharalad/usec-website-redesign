"use client"

import { useEffect, useState } from 'react'

/**
 * Hook to safely handle hydration mismatches between server and client
 * Returns true only after the component has mounted on the client
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
} 