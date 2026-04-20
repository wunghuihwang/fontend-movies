'use client'

import {
    useAddReview, useDeleteReview, useFavorite, useMovieDetail, useMyRating, useReviews,
    useSetRating,
    useToggleFavorite
} from '@/entities/movie/queries'
import { useAuthStore } from '@/store/useAuthStore'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function MovieDetailPage() {
  const { id } = useParams()
  const movieId = Number(id)

  const { data } = useMovieDetail(id as string)
  const user = useAuthStore((s) => s.user)

  const [text, setText] = useState('')

  // 데이터
  const { data: reviews } = useReviews(movieId)
  const { data: myRating } = useMyRating(user?.uid ?? '', movieId)
  const { data: isLiked } = useFavorite(user?.uid ?? '', movieId)

  // mutations
  const { mutate: addReview } = useAddReview(movieId)
  const { mutate: setRating } = useSetRating()
  const { mutate: toggleFavorite } = useToggleFavorite()
  const { mutate: deleteReview } = useDeleteReview(movieId)

  if (!data) return null

  const requireAuth = () => {
    if (!user) {
      alert('로그인 필요')
      return false
    }
    return true
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">{data.title}</h1>

        <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            className="mt-4"
        />

        <p className="mt-4">{data.overview}</p>

        <div className="mt-6">
            <p>내 평점: {myRating?.rating ?? '없음'}</p>
            <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                key={n}
                onClick={() =>
                    requireAuth() &&
                    setRating({ userId: user!.uid, movieId, rating: n })
                }
                className={`px-2 py-1 border ${
                    myRating?.rating === n ? 'bg-black text-white' : ''
                }`}
                >
                {n}
                </button>
            ))}
            </div>
        </div>

        <button
            onClick={() =>
            requireAuth() &&
            toggleFavorite({
                userId: user!.uid,
                movieId,
                isLiked: isLiked ?? false,
            })
            }
            className={`mt-6 px-4 py-2 rounded ${
                isLiked ? 'bg-red-500' : 'bg-gray-300'
            }`}
        >
            {isLiked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
        </button>

        {/* 📝 리뷰 */}
        <div className="mt-6">
            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border p-2"
            />
            <button
            onClick={() => {
                if (!requireAuth() || !text.trim()) return
                addReview({ userId: user!.uid, content: text })
                setText('')
            }}
            className="mt-2 px-4 py-2 bg-black text-white"
            >
            등록
            </button>
        </div>

        {/* 📄 리스트 */}
        <div className="mt-6 space-y-2">
            {reviews?.map((r: any) => (
            <div key={r.id} className="border p-2 flex justify-between">
                <span>{r.content}</span>
                {user?.uid === r.userId && (
                <button onClick={() => deleteReview(r.id)}>삭제</button>
                )}
            </div>
            ))}
        </div>
        </div>
    )
}