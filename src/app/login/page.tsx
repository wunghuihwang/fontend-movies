'use client'

import {
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
} from '@/features/auth/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useAuthStore((s) => s.user)

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])

    const handleGoogle = async () => {
        try {
            await signInWithGoogle()
            router.push('/') 
        } catch (e) {
            console.error(e)
        }
    }

    const handleLogin = async () => {
        try {
            await signInWithEmail(email, password)
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    const handleSignup = async () => {
        try {
            await signUpWithEmail(email, password)
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-col gap-3 p-10 max-w-sm mx-auto">
            <input
                className="border p-2"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border p-2"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin} className="bg-black text-white p-2">
                로그인
            </button>

            <button onClick={handleSignup} className="bg-gray-700 text-white p-2">
                회원가입
            </button>

            <button onClick={handleGoogle} className="bg-red-500 text-white p-2">
                구글 로그인
            </button>
        </div>
    )
}