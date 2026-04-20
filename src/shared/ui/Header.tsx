'use client'

import { logout } from '@/features/auth/api'
import { useAuthStore } from '@/store/useAuthStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)

    return (
        <div className="flex justify-between p-4 border-b">
            <div><Link href='/'>Movies</Link></div>

            {user ? (
                <div className="flex gap-4">
                    <button onClick={() => router.push('/mypage')}>My</button>
                    <button onClick={logout}>로그아웃</button>
                </div>
            ) : (
                <a href="/login">로그인</a>
            )}
        </div>
    )
}