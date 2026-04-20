import { tmdb } from '@/shared/api/tmdb'
import { MovieResponse } from './types'

// 검색
export const searchMovies = async (query: string, page = 1) => {
    const res = await tmdb.get<MovieResponse>('/search/movie', {
        params: { query, page },
    })
    return res.data
}

// 인기 영화
export const getPopularMovies = async (page = 1) => {
    const res = await tmdb.get<MovieResponse>('/movie/popular', {
        params: { page },
    })
    return res.data
}

// 영화 상세
export const getMovieDetail = async (id: string) => {
    const res = await tmdb.get(`/movie/${id}`)
    return res.data
}