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

// 평점 저장
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

// 내 평점
export const getMyRating = async (userId: string, movieId: number) => {
    const ref = doc(db, 'ratings', `${userId}_${movieId}`)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
}

// 리뷰 작성
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

// 리뷰 삭제
export const deleteReview = async (id: string) => {
    console.log(id)
    await deleteDoc(doc(db, 'reviews', id))
}

// 좋아요 토글
export const toggleFavorite = async (
    userId: string,
    movieId: number,
    isLiked: boolean
) => {

    console.log(`${userId}_${movieId}`)
    const ref = doc(db, 'favorites', `${userId}_${movieId}`)

    if (isLiked) {
        console.log('1')
        await deleteDoc(ref)
    } else {
        console.log('2')
        await setDoc(ref, {
            userId,
            movieId,
            createdAt: serverTimestamp(),
        })
    }
}

// 좋아요 상태
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

// 내가 좋아요 한 영화 ID 목록 가져오기
export const getMyAllFavorites = async (userId: string) => {
    const q = query(collection(db, 'favorites'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data().movieId);
}

// 내가 쓴 모든 리뷰 가져오기
export const getMyAllReviews = async (userId: string) => {
    const q = query(collection(db, 'reviews'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 내가 준 모든 평점 가져오기
export const getMyAllRatings = async (userId: string) => {
    const q = query(collection(db, 'ratings'), where('userId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data());
}