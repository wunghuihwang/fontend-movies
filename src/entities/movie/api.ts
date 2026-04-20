import { tmdb } from '@/shared/api/tmdb'

export const getMovies = async (query: string) => {
    const res = await tmdb.get('/search/movie', {
        params: { query },
    })
    
    return res.data.results
}