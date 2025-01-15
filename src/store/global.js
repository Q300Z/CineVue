// store/global.js
import {defineStore} from 'pinia';
import {ref, watch} from 'vue';
import {useStorage} from "@vueuse/core";

// Clé de stockage pour la wishlist
const WISHLIST_STORAGE_KEY = 'movieWishlist';

export const useGlobalStore = defineStore('global', () => {
        // Token API
        const token = ref(import.meta.env.VITE_API_KEY);

        // Wishlist initialisée depuis localStorage
        const wishlist =useStorage(WISHLIST_STORAGE_KEY, []);


// Mettez à jour localStorage à chaque changement de la wishlist
        watch(wishlist, (newWishlist) => {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
        }, {deep: true});

// Ajouter un film à la wishlist
        const onAddWishlist = (movie) => {
            if (!wishlist.value.some((m) => m.id === movie.id)) {
                wishlist.value.push(movie);
            }
        };

// Supprimer un film de la wishlist
        const onRemoveWishlist = (movie) => {
            wishlist.value = wishlist.value.filter((m) => m.id !== movie.id);
        };

// Vérifier si un film est dans la wishlist
    const isInWishlist = (movie) => wishlist.value.some((m) => m.id === movie.id);


        return {
            token,
            wishlist,
            onAddWishlist,
            onRemoveWishlist,
            isInWishlist,
        };
    })
;
