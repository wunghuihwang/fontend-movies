import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { getMovieDetail, getPopularMovies, searchMovies } from './api'
import {
    addReview,
    deleteReview,
    getFavorite,
    getMyAllFavorites,
    getMyAllRatings,
    getMyAllReviews,
    getMyRating,
    getReviews,
    setRating,
    toggleFavorite,
} from './firebase.api'

  // 인기 영화
export const usePopularMovies = (page: number) => {
    return useQuery({
        queryKey: ['movies', 'popular', page],
        queryFn: () => getPopularMovies(page),
        staleTime: 1000 * 60 * 5,
    })
}

// 검색
export const useSearchMovies = (query: string) => {
    return useInfiniteQuery({
        queryKey: ['movies', 'search', query],
        queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.total_pages
            ? lastPage.page + 1
            : undefined,
        enabled: !!query,
    })
}

  // 상세
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

        onMutate: async (newReview) => {
            await qc.cancelQueries({ queryKey: ['reviews', movieId] })

            const prev = qc.getQueryData(['reviews', movieId])

            qc.setQueryData(['reviews', movieId], (old: any[] = []) => [
                {
                    id: Date.now(),
                    content: newReview.content,
                    userId: newReview.userId,
                },
                ...old,
            ])

            return { prev }
        },

        onError: (_, __, ctx) => {
            qc.setQueryData(['reviews', movieId], ctx?.prev)
        },
        onSettled: () => {
            qc.invalidateQueries({ queryKey: ['reviews', movieId] })
            qc.invalidateQueries({ queryKey: ['myReviews', movieId] })
        },
    })
}

// 리뷰 삭제
export const useDeleteReview = (movieId: number) => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteReview(id),

        onMutate: async (id) => {
            await qc.cancelQueries({ queryKey: ['reviews', movieId] })

            const prev = qc.getQueryData(['reviews', movieId])

            qc.setQueryData(['reviews', movieId], (old: any[] = []) =>
                old.filter((r) => r.id !== id)
            )

            return { prev }
        },
        onError: (_, __, ctx) => {
            qc.setQueryData(['reviews', movieId], ctx?.prev)
        },

        onSettled: () => {
            qc.invalidateQueries({ queryKey: ['reviews', movieId] })
            qc.invalidateQueries({ queryKey: ['myReviews', movieId] })
        },
    })
}

// 평점
export const useSetRating = () => {
    const qc = useQueryClient()

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

        onSuccess: (_, vars) => {
            qc.invalidateQueries({ queryKey: ['myRating', vars.movieId] })
            qc.invalidateQueries({ queryKey: ['myRatings', vars.userId] })
        },
    })
}

// 내 평점
export const useMyRating = (userId: string | undefined, movieId: number) => {
    return useQuery({
        queryKey: ['myRating', movieId],
        queryFn: () => getMyRating(userId!, movieId),
        enabled: !!userId,
    })
}

// 좋아요
export const useToggleFavorite = () => {
    const qc = useQueryClient()
    
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
    
        onMutate: async ({ movieId }) => {
            await qc.cancelQueries({ queryKey: ['favorite', movieId] })
    
            const prev = qc.getQueryData(['favorite', movieId])
    
            qc.setQueryData(['favorite', movieId], (old: boolean | undefined) => {
                
                return !old
            })
    
            return { prev }
        },
    
        onError: (_, vars, ctx) => {
            qc.setQueryData(['favorite', vars.movieId], ctx?.prev)
        },
    
        onSettled: (_, __, vars) => {
            qc.invalidateQueries({ queryKey: ['favorite', vars.movieId] })
            qc.invalidateQueries({ queryKey: ['myFavorites', vars.userId] })
        },
    })
}

// 좋아요 상태
export const useFavorite = (userId: string | undefined, movieId: number) => {
    return useQuery({
        queryKey: ['favorite', movieId],
        queryFn: () => getFavorite(userId!, movieId),
        enabled: !!userId,
    })
}

export const useMyAllFavorites = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['myFavorites', userId],
        queryFn: () => getMyAllFavorites(userId!),
        enabled: !!userId,
    })
}

export const useMyAllReviews = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['myReviews', userId],
        queryFn: () => getMyAllReviews(userId!),
        enabled: !!userId,
    })
}

export const useMyAllRatings = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['myRating', userId],
        queryFn: () => getMyAllRatings(userId!),
        enabled: !!userId,
    })
}