import { db } from '@/shared/firebase/firestore'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from 'firebase/firestore'

// 평점
export const setRating = async (
    userId: string,
    movieId: number,
    rating: number
) => {
    const ref = doc(db, 'ratings', `${userId}_${movieId}`)

    await setDoc(ref, {
        userId,
        movieId,
        rating,
        createdAt: serverTimestamp(),
    })
}

// 내평점
export const getMyRating = async (userId: string, movieId: number) => {
    const ref = doc(db, 'ratings', `${userId}_${movieId}`)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
}

// 리뷰
export const addReview = async (
    userId: string,
    movieId: number,
    content: string
) => {
    return await addDoc(collection(db, 'reviews'), {
        userId,
        movieId,
        content,
        createdAt: serverTimestamp(),
    })
}

// 내 리뷰 삭제
export const deleteReview = async (id: string) => {
    await deleteDoc(doc(db, 'reviews', id))
}

// 좋아요
export const toggleFavorite = async (
    userId: string,
    movieId: number,
    isLiked: boolean
) => {
    const ref = doc(db, 'favorites', `${userId}_${movieId}`)

    if (isLiked) {
        await deleteDoc(ref)
    } else {
        await setDoc(ref, {
        userId,
        movieId,
        createdAt: serverTimestamp(),
        })
    }
}

// 내 좋아요 상태
export const getFavorite = async (userId: string, movieId: number) => {
    const ref = doc(db, 'favorites', `${userId}_${movieId}`)
    const snap = await getDoc(ref)
    return snap.exists()
}

  // 리뷰 목록
export const getReviews = async (movieId: number) => {
    const q = query(
        collection(db, 'reviews'),
        where('movieId', '==', movieId)
    )

    const snap = await getDocs(q)
    
    return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
}