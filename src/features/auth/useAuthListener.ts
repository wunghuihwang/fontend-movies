'use client'

import { auth } from '@/shared/firebase/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { createUserIfNotExists } from './user.api'

export const useAuthListener = () => {
    const setUser = useAuthStore((s) => s.setUser)
    const setLoading = useAuthStore((s) => s.setLoading)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user)

            if (user) {
                await createUserIfNotExists(user)
            }

            setLoading(false) 
        })

        return () => unsubscribe()
    }, [setUser, setLoading])
}