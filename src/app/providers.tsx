'use client'

import { queryClient } from '@/shared/api/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}