export type Movie = {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string | null
}

export type MovieResponse = {
    page: number
    results: Movie[]
    total_pages: number
}