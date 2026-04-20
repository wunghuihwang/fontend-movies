'use client'

import { logout } from '@/features/auth/api'
import { useAuthStore } from '@/store/useAuthStore'

export default function Header() {
    const user = useAuthStore((state) => state.user)

    return (
        <div className="flex justify-between p-4 border-b">
            <div>Movies</div>

            {user ? (
                <button onClick={logout}>로그아웃</button>
            ) : (
                <a href="/login">로그인</a>
            )}
        </div>
    )
}