'use client'

import Skeleton from '@/app/components/Skeleton'
import {
    useAddReview,
    useDeleteReview,
    useFavorite,
    useMovieDetail,
    useMyRating,
    useReviews,
    useSetRating,
    useToggleFavorite,
} from '@/entities/movie/queries'
import { useAuthStore } from '@/store/useAuthStore'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function MovieDetailPage() {
    const { id } = useParams()
    const movieId = Number(id)

    const user = useAuthStore((s) => s.user)

    //데이터
    const { data, isLoading } = useMovieDetail(id as string)
    const { data: reviews } = useReviews(movieId)
    const { data: myRating } = useMyRating(user?.uid, movieId)
    const { data: isLiked } = useFavorite(user?.uid, movieId)

    // 상태
    const [text, setText] = useState('')

    // mutation
    const { mutate: addReview } = useAddReview(movieId)
    const { mutate: deleteReview } = useDeleteReview(movieId)
    const { mutate: setRating } = useSetRating()
    const { mutate: toggleFavorite } = useToggleFavorite()

    // 로그인 체크
    const requireAuth = () => {
        if (!user) {
            toast.error('로그인 필요')
            return false
        }
        return true
    }

    if (isLoading) return <Skeleton />
    if (!data) return null

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* 포스터 */}
                <div className="group">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={data.title}
                        className="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* 정보 */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{data.title}</h1>

                        <p className="mt-4 text-gray-600 leading-relaxed">
                            {data.overview}
                        </p>

                        <p className="mt-4 text-yellow-500 font-semibold">
                        ⭐ {data.vote_average}
                        </p>

                        {/* ⭐ 내 평점 */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-500">
                                내 평점: {myRating?.rating ?? '없음'}
                            </p>

                            <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    onClick={() => {
                                        if (!requireAuth()) return
                                        setRating(
                                            { userId: user!.uid, movieId, rating: n },
                                            {
                                            onSuccess: () => toast.success('평점 등록'),
                                            onError: () => toast.error('실패'),
                                            }
                                        )
                                    }}
                                    className={`px-3 py-1 border rounded-lg transition
                                    ${myRating?.rating === n ? 'bg-black text-white' : ''}
                                    hover:scale-105 active:scale-95`}
                                >
                                    {n}
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>

                {/* 좋아요 */}
                    <button
                        onClick={() => {
                            if (!requireAuth()) return
                            if (isLiked === undefined) return

                            toggleFavorite(
                                {
                                    userId: user!.uid,
                                    movieId,
                                    isLiked,
                                },
                                {
                                    onError: () => toast.error('실패'),
                                }
                            )
                        }}
                        className={`mt-6 px-4 py-2 rounded-lg transition active:scale-95
                        ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                    >
                        {isLiked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
                    </button>
                </div>
            </div>

            {/* 리뷰 작성 */}
            <div className="mt-10 flex gap-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="리뷰를 입력하세요..."
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <button
                    onClick={() => {
                        if (!requireAuth()) return
                        if (!text.trim()) return

                        addReview(
                            { userId: user!.uid, content: text },
                            {
                                onSuccess: () => {
                                    toast.success('리뷰 등록 완료')
                                    setText('')
                                },
                                onError: () => toast.error('실패'),
                            }
                        )
                    }}
                    className="mt-2 w-[120] px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 active:scale-95 transition"
                >
                    등록
                </button>
            </div>

            {/* 리뷰 리스트 */}
            <div className="mt-10 space-y-3">
                {reviews?.map((r: any) => (
                    <div
                        key={r.id}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex justify-between"
                    >
                        <span>{r.content}</span>

                        {user?.uid === r.userId && (
                            <button
                                onClick={() =>
                                    deleteReview(r.id, {
                                        onSuccess: () => toast.success('삭제 완료'),
                                        onError: () => toast.error('실패'),
                                    })
                                }
                                className="text-red-500 text-sm"
                            >
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}