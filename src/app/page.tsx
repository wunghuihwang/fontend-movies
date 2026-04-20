'use client'

import { useSearchMovies } from '@/entities/movie/queries'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
    const router = useRouter();

    const [query, setQuery] = useState('')

    const debouncedQuery = useDebounce(query)

    const { data, fetchNextPage, hasNextPage } =
        useSearchMovies(debouncedQuery)

    return (
        <div className="p-5">
        <input
            className="border p-2 w-full"
            placeholder="영화 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4 mt-5">
            {data?.pages.map((page) =>
                page.results.map((movie) => (
                    <div key={movie.id} className="border p-2" onClick={() => router.push(`/movie/${movie.id}`)}>
                        <p>{movie.title}</p>
                    </div>
                ))
            )}
        </div>

        {hasNextPage && (
            <button
                onClick={() => fetchNextPage()}
                className="mt-5 p-2 bg-black text-white"
            >
                더보기
            </button>
        )}
        </div>
    )
}