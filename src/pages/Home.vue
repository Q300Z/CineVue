<script setup>
import {onMounted, ref, watch} from "vue";
import {useGlobalStore} from "../store/global.js";
import SearchBar from "../components/SearchBar.vue";
import Pagination from "../components/Pagination.vue";
import MovieList from "../components/MovieList.vue";
import NavBar from "../components/NavBar.vue";

const store = useGlobalStore();

const urlApi = ref(""); // URL de l'API à appeler
const listMovie = ref([]); // Liste des films
const currentPage = ref(1); // Page actuelle
const totalPages = ref(1); // Nombre total de pages

// Fonction pour récupérer les films depuis l'API
const fetchMovies = async () => {
  try {
    const baseApi = urlApi.value || `https://api.themoviedb.org/3/movie/popular?api_key=${store.token}`;
    const paginatedApi = `${baseApi}&page=${currentPage.value}`; // Ajouter le paramètre de page
    const response = await fetch(paginatedApi);
    const data = await response.json();

    if (data.results) {
      listMovie.value = data.results;
      totalPages.value = data.total_pages;
    } else {
      console.error("Aucune donnée trouvée :", data);
    }
  } catch (error) {
    console.error("Erreur lors du fetch des Movies :", error);
  }
};

// Appeler l'API lorsque les paramètres changent
watch([urlApi, currentPage], () => {
  fetchMovies();
});

// Fonction pour gérer le changement d'URL d'API
const handleUrlApi = (data) => {
  urlApi.value = data;
  currentPage.value = 1;
};

// Fonction pour gérer le changement de page
const handleCurrentPage = (page) => {
  currentPage.value = page;
};

// Initialisation
onMounted(() => {
  fetchMovies();
});
</script>

<template>
  <SearchBar @onUrlApi="handleUrlApi"/>
  <Pagination :currentPage="currentPage" @onCurrentPage="handleCurrentPage" :totalPages="totalPages"/>
  <MovieList :listMovie="listMovie"/>
  <Pagination :currentPage="currentPage" @onCurrentPage="handleCurrentPage" :totalPages="totalPages"/>
</template>
