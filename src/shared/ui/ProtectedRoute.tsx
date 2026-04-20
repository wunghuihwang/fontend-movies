'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({children,}: {children: React.ReactNode}) {
    const { user, loading } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading) return <div>로딩중...</div>

    if (!user) return null

    return <>{children}</>
}