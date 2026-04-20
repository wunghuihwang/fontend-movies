import { create } from 'zustand'

type UIState = {
    isLoginModalOpen: boolean
    selectedMovieId: number | null
    openLogin: () => void
    closeLogin: () => void
    setMovieId: (id: number) => void
}

export const useUIStore = create<UIState>((set) => ({
    isLoginModalOpen: false,
    selectedMovieId: null,
    openLogin: () => set({ isLoginModalOpen: true }),
    closeLogin: () => set({ isLoginModalOpen: false }),
    setMovieId: (id) => set({ selectedMovieId: id }),
}))