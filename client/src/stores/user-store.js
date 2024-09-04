import { create } from 'zustand';

export const useUserStore = create((set) => ({
    user: {},
    addToUser: ((userField) => set((state) => ({user: {...state.user, userField}}))),
    removeUser: () => set({user: {}})
}))