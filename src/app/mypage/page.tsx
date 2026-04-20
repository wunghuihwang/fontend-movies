'use client'

import { useMovieDetail, useMyAllFavorites, useMyAllRatings, useMyAllReviews } from '@/entities/movie/queries'
import ProtectedRoute from '@/shared/ui/ProtectedRoute'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const mypage = () => {
    const router = useRouter()
    const user = useAuthStore((s) => s.user);
    const [activeTab, setActiveTab] = useState<'likes' | 'reviews' | 'ratings'>('likes')

    const { data: favoriteIds } = useMyAllFavorites(user?.uid)
    const { data: myReviews } = useMyAllReviews(user?.uid)
    const { data: myRatings } = useMyAllRatings(user?.uid)

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#141414] text-white p-6 md:p-12">

                <section className="max-w-5xl mx-auto">
                    <div className="flex gap-10 mb-8 border-b border-gray-900">
                        {['likes', 'reviews', 'ratings'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-4 text-lg transition-all capitalize ${
                                    activeTab === tab ? 'text-white border-b-2 border-red-600 font-bold' : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                {tab === 'likes' ? '좋아요' : tab === 'reviews' ? '내 리뷰' : '평점'}
                            </button>
                        ))}
                    </div>

                    <div className="animate-in fade-in duration-500">
                        {activeTab === 'likes' && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                                {favoriteIds?.map((id) => (
                                    <MovieCard key={id} movieId={id} showHeart />
                                ))}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-4">
                                {myReviews?.map((review: any) => (
                                    <div key={review.id} className="bg-[#1f1f1f] p-6 rounded-xl border border-gray-800">
                                        <h3 className="text-red-500 font-bold mb-2 cursor-pointer" onClick={() => router.push(`/movie/${review.movieId}`)}>
                                            영화 보러가기 →
                                        </h3>
                                        <p className="text-gray-200">"{review.content}"</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'ratings' && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                                {myRatings?.map((ratingData: any) => (
                                    <MovieCard 
                                        key={ratingData.movieId} 
                                        movieId={ratingData.movieId} 
                                        userRating={ratingData.rating} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </ProtectedRoute>
    )
}

export default mypage;

function MovieCard({ movieId, userRating, showHeart }: { movieId: number, userRating?: number, showHeart?: boolean }) {
    const router = useRouter()
    const { data: movie } = useMovieDetail(movieId.toString())

    if (!movie) return <div className="aspect-2/3 bg-[#1f1f1f] rounded-lg animate-pulse" />

    return (
        <div 
            onClick={() => router.push(`/movie/${movie.id}`)}
            className="group cursor-pointer"
        >
            <div className="aspect-2/3 rounded-lg overflow-hidden border border-gray-800 relative mb-2">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {showHeart && <div className="absolute top-2 right-2 text-red-500 drop-shadow-md">❤️</div>}
                
                {userRating && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-yellow-400 text-2xl font-black">★ {userRating}</span>
                    </div>
                )}
            </div>
            <p className="text-sm font-medium truncate text-gray-300 group-hover:text-white transition-colors">{movie.title}</p>
            
            {userRating && (
                <div className="flex items-center mt-1">
                    <span className="text-yellow-500 text-xs mr-1">★</span>
                    <span className="text-xs font-bold text-gray-400">{userRating}.0</span>
                </div>
            )}
        </div>
    )
}