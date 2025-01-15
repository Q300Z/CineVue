<script setup>
import {ref} from 'vue';
import {useGlobalStore} from '../store/global'; // Supposons que vous utilisez Pinia ou une alternative pour le contexte global.

// État local
const searchTerm = ref(""); // Terme de recherche
const lastSelect = ref(""); // Dernière sélection
const store = useGlobalStore(); // Accès au token depuis le store global
const token = store.token;

// Liste des filtres
const listFilter = [
  {name: "Populaire", value: "https://api.themoviedb.org/3/movie/popular?language=fr-FR&region=FR"},
  {name: "Les mieux notés", value: "https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&region=FR"},
  {name: "À venir", value: "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&region=FR"},
  {name: "En cours de diffusion", value: "https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&region=FR"},
];

// Fonction pour gérer la sélection de filtre
const onSelectFilter = (event) => {
  const selectedValue = event.target.value + `&api_key=${token}`;
  emits("onUrlApi", selectedValue);
  lastSelect.value = selectedValue;
};

// Fonction pour gérer les changements dans le champ de recherche
const timer = ref(null);
const onSearchChange = (event) => {
  clearInterval(timer.value);
  timer.value = setTimeout(() => {
    const value = event.target.value;
    searchTerm.value = value;
    if (value !== "") {
      emits("onUrlApi", `https://api.themoviedb.org/3/search/movie?language=fr-FR&region=FR&api_key=${token}&query=${value}`);
    } else {
      emits("onUrlApi", lastSelect.value);
    }
  }, 250);

};

// Propriété pour recevoir la fonction onUrlApi
const emits = defineEmits({
  onUrlApi: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="search_bar">
    <!-- Champ de recherche -->
    <div class="input">
      <input
          v-model="searchTerm"
          placeholder="Rechercher un film..."
          type="text"
          @input="onSearchChange"
      />
    </div>
    <!-- Sélecteur de filtre -->
    <div class="select">
      <select @change="onSelectFilter">
        <option v-for="(filter, index) in listFilter" :key="index" :value="filter.value">
          {{ filter.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.search_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  margin: 20px;
  width: fit-content;
  border: #afafaf solid 1px;
  border-radius: 5px;
  box-shadow: #acabab 2px 2px 5px;
  transition: box-shadow 200ms ease;
}

.search_bar:hover {
  box-shadow: #acabab 5px 5px 5px;
}

.select {
  margin-left: 15px;
}

.select select {
  width: fit-content;
  padding: 5px;
  border: none;
  background-color: rgba(175, 175, 175, 0.2);
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 500ms ease;
}

.select select:focus {
  outline: none;
}

.select select:hover {
  background-color: #acabab;
}

.input {
}

.input input {
  width: fit-content;
  padding: 8px;
  border: none;
  background-color: rgba(175, 175, 175, 0.2);
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: background-color 500ms ease;
}

.input input:hover {
  background-color: #acabab;
}


</style>
