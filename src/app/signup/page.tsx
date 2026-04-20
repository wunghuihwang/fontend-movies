'use client'

import { signUpWithEmail } from '@/features/auth/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const user = useAuthStore((s) => s.user)

    useEffect(() => {
        if (user) router.push('/')
    }, [user, router])

    const handleSignup = async () => {
        if (!email || !password) return setError('모든 필드를 입력해주세요.')
        if (password !== confirmPassword) return setError('비밀번호가 일치하지 않습니다.')
        if (password.length < 6) return setError('비밀번호는 6자리 이상이어야 합니다.')

        try {
            setLoading(true)
            setError('')
            await signUpWithEmail(email, password)
            router.push('/')
        } catch (e: any) {
            setError('이미 존재하는 이메일이거나 가입 형식이 올바르지 않습니다.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
            <div 
                className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 w-full max-w-md p-10 bg-[#141414]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 font-serif tracking-tight">Create Account</h1>
                    <p className="text-gray-400 text-sm">MOVIE FLIX의 회원이 되어 취향을 기록해보세요.</p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* 에러 피드백 */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-md animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 ml-1">이메일</label>
                        <input
                            className="w-full bg-[#2b2b2b] text-white border-none rounded-md p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-600"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 ml-1">비밀번호</label>
                        <input
                            className="w-full bg-[#2b2b2b] text-white border-none rounded-md p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-600"
                            type="password"
                            placeholder="6자리 이상"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 ml-1">비밀번호 확인</label>
                        <input
                            className="w-full bg-[#2b2b2b] text-white border-none rounded-md p-3 focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-600"
                            type="password"
                            placeholder="한 번 더 입력"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        onClick={handleSignup} 
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold py-3 rounded-md mt-4 transition-all"
                    >
                        {loading ? '처리 중...' : '회원가입'}
                    </button>

                    <div className="text-center mt-6 border-t border-gray-800 pt-6">
                        <p className="text-gray-500 text-sm">
                            이미 회원이신가요? 
                            <button 
                                onClick={() => router.push('/login')} 
                                className="text-white font-bold ml-2 hover:underline"
                            >
                                로그인하기
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}