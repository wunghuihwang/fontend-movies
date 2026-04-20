'use client'

import {
    signInWithEmail,
    signInWithGoogle
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
        if (user) router.push('/')
    }, [user, router])

    const handleGoogle = async () => {
        try {
            await signInWithGoogle()
            router.push('/') 
        } catch (e) { console.error(e) }
    }

    const handleLogin = async () => {
        try {
            await signInWithEmail(email, password)
            router.push('/')
        } catch (e) { console.error(e) }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
            {/* 배경 이미지 (영화 포스터 느낌의 오버레이) */}
            <div 
                className="absolute inset-0 z-0 opacity-40"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2050&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black" />
            </div>

            {/* 로그인 카드 */}
            <div className="relative z-10 w-full max-w-md p-10 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-red-600 tracking-tighter mb-2">MOVIE FLIX</h1>
                    <p className="text-gray-400 text-sm">무제한 영화의 세계로 로그인하세요</p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* 입력 필드 */}
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 ml-1">이메일</label>
                        <input
                            className="w-full bg-[#333] text-white border-none rounded-md p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 ml-1">비밀번호</label>
                        <input
                            className="w-full bg-[#333] text-white border-none rounded-md p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <button 
                        onClick={handleLogin} 
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md mt-4 transition-colors"
                    >
                        로그인
                    </button>

                    <div className="flex items-center gap-4 my-2 text-gray-500 text-xs">
                        <div className="flex-1 h-[1] bg-gray-800" />
                        또는
                        <div className="flex-1 h-[1] bg-gray-800" />
                    </div>

                    {/* 구글 로그인 */}
                    <button 
                        onClick={handleGoogle} 
                        className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google로 계속하기
                    </button>

                    {/* 회원가입 링크 */}
                    <div className="text-center mt-6">
                        <span className="text-gray-500 text-sm">계정이 없으신가요? </span>
                        <button 
                            onClick={() => router.push('/signup')} 
                            className="text-white text-sm font-bold hover:underline"
                        >
                            지금 가입하세요
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}