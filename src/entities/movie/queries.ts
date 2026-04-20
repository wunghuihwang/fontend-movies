import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMovieDetail, getPopularMovies, searchMovies } from './api'
import { addReview, deleteReview, getFavorite, getMyRating, getReviews, setRating, toggleFavorite } from './firebase.api'

// 인기 영화
export const usePopularMovies = (page: number) => {
    return useQuery({
        queryKey: ['movies', 'popular', page],
        queryFn: () => getPopularMovies(page),
        staleTime: 1000 * 60 * 5, 
  })
}

// 검색 (무한 스크롤)
export const useSearchMovies = (query: string) => {
    return useInfiniteQuery({
        queryKey: ['movies', 'search', query],
        queryFn: ({ pageParam = 1 }) =>
            searchMovies(query, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1
            }
            return undefined
        },
        enabled: !!query, 
    })
}

export const useMovieDetail = (id: string) => {
    return useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieDetail(id),
        enabled: !!id,
    })
}

// 리뷰 조회
export const useReviews = (movieId: number) => {
    return useQuery({
        queryKey: ['reviews', movieId],
        queryFn: () => getReviews(movieId),
    })
}

// 리뷰 작성
export const useAddReview = (movieId: number) => {
const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: { userId: string; content: string }) =>
        addReview(data.userId, movieId, data.content),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['reviews', movieId] })
        },
    })
}

// 리뷰 삭제
export const useDeleteReview = (movieId: number) => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteReview(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['reviews', movieId] })
        },
    })
}

// 평점
export const useSetRating = () => {
    return useMutation({
        mutationFn: ({
            userId,
            movieId,
            rating,
        }: {
            userId: string
            movieId: number
            rating: number
        }) => setRating(userId, movieId, rating),
    })
}

// 내 평점
export const useMyRating = (userId: string, movieId: number) => {
    return useQuery({
        queryKey: ['myRating', movieId],
        queryFn: () => getMyRating(userId, movieId),
        enabled: !!userId,
    })
}

  // 좋아요
export const useToggleFavorite = () => {
    return useMutation({
        mutationFn: ({
            userId,
            movieId,
            isLiked,
        }: {
            userId: string
            movieId: number
            isLiked: boolean
        }) => toggleFavorite(userId, movieId, isLiked),
    })
}

export const useFavorite = (userId: string, movieId: number) => {
    return useQuery({
        queryKey: ['favorite', movieId],
        queryFn: () => getFavorite(userId, movieId),
        enabled: !!userId,
    })
}