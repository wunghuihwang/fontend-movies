'use client'

import { usePopularMovies, useSearchMovies } from '@/entities/movie/queries'; // usePopularMovies 추가
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const router = useRouter();
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query)

    const { data: popularData, isLoading: isPopularLoading } = usePopularMovies(1)

    const { 
        data: searchData, 
        fetchNextPage, 
        hasNextPage, 
        isLoading: isSearchLoading 
    } = useSearchMovies(debouncedQuery)

    const isSearching = debouncedQuery.length > 0
    const moviesToShow = isSearching 
        ? searchData?.pages.flatMap(page => page.results) 
        : popularData?.results

    const isLoading = isSearching ? isSearchLoading : isPopularLoading

    return (
        <div className="min-h-screen bg-[#141414] text-white p-6 md:p-10">

            <header className="max-w-7xl mx-auto mb-10">
                <h1 
                    className="text-4xl font-bold text-red-600 mb-6 tracking-tighter cursor-pointer"
                    onClick={() => setQuery('')}
                >
                    MOVIE FLIX
                </h1>
                <div className="relative group">
                    <input
                        className="w-full bg-[#2f2f2f] text-white border-none rounded-md py-4 px-12 focus:ring-2 focus:ring-red-500 transition-all outline-none"
                        placeholder="영화 제목을 입력하세요..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <svg 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500" 
                        width="20" height="20" fill="currentColor" viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">
                    {isSearching ? `"${debouncedQuery}" 검색 결과` : '지금 인기 있는 영화'}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {moviesToShow?.map((movie) => (
                        <div 
                            key={movie.id} 
                            className="group cursor-pointer bg-[#1f1f1f] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                            onClick={() => router.push(`/movie/${movie.id}`)}
                        >
                            <div className="aspect-2/3 bg-gray-800 relative">
                                {movie.poster_path ? (
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">No Poster</div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <p className="text-xs text-yellow-400 font-bold">★ {movie.vote_average?.toFixed(1)}</p>
                                </div>
                            </div>
                            
                            <div className="p-3">
                                <p className="font-medium text-sm truncate group-hover:text-red-500 transition-colors">
                                    {movie.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {movie.release_date?.split('-')[0]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {!isLoading && moviesToShow?.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">찾으시는 영화가 없습니다.</p>
                    </div>
                )}

                {isLoading && <p className="text-center mt-10 text-gray-400">데이터를 불러오는 중...</p>}

                {isSearching && hasNextPage && (
                    <div className="flex justify-center mt-12 mb-20">
                        <button
                            onClick={() => fetchNextPage()}
                            className="px-8 py-3 rounded-full border border-gray-600 hover:bg-white hover:text-black transition-all font-semibold"
                        >
                            검색 결과 더보기
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}