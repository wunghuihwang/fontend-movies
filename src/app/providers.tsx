'use client'

import { useAuthListener } from '@/features/auth/useAuthListener'
import { queryClient } from '@/shared/api/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
    useAuthListener()
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-center" />
        </QueryClientProvider>
    )
}