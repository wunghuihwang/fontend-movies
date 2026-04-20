import { auth, googleProvider } from '@/shared/firebase/auth'
import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'

  // 구글 로그인
export const signInWithGoogle = async (): Promise<UserCredential> => {  
    return await signInWithPopup(auth, googleProvider)
}

  // 이메일 로그인
export const signInWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

// 회원가입
export const signUpWithEmail = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
}

// 로그아웃
export const logout = async () => {
    return await signOut(auth)
}