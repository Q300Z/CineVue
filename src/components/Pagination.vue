<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits({
  onCurrentPage: {
    type: Number,
    required: true,
  },
});

// Gestion des événements pour les boutons
const handleNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emits("onCurrentPage", props.currentPage + 1);
  }
};

const handlePreviousPage = () => {
  if (props.currentPage > 1) {
    emits("onCurrentPage", props.currentPage - 1);
  }
};
</script>

<template>
  <div class="pagination">
    <!-- Bouton Précédent -->
    <button
        :disabled="currentPage === 1"
        class="button"
        @click="handlePreviousPage"
    >
      Précédent
    </button>

    <!-- Informations sur la page -->
    <span class="page_info">
      Page {{ currentPage }} sur {{ totalPages }}
    </span>

    <!-- Bouton Suivant -->
    <button
        :disabled="currentPage === totalPages"
        class="button"
        @click="handleNextPage"
    >
      Suivant
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  font-family: 'Arial', sans-serif;
}

.button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #9ac7fb;
  border: #ccc solid 1px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 15px;
  color: black;
}

.button:hover {
  background-color: #539ef6;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page_info {
  margin: 0 20px;
  font-size: 16px;
}

</style>
