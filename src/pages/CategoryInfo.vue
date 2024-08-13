<!--Sixte Morio-->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categoryId = ref(route.params.id);
const category = ref(null);
const categoryImages = ref([]);

onMounted(async () => {
  try {
    // Fetch category details
    const categoryResponse = await fetch(`https://esd.atontour.org/v1/category/${categoryId.value}`);
    category.value = await categoryResponse.json();

    // Fetch prompts with the same category
    const promptsResponse = await fetch('https://esd.atontour.org/v1/prompt');
    const promptsData = await promptsResponse.json();
    categoryImages.value = promptsData.filter(prompt => prompt.id_category === categoryId.value).map(prompt => prompt.img);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div>
    <div v-if="category">
      <h1>{{ category.label }}</h1>
      <img :src="category.logo" class="img-fluid" :alt="category.label">
    </div>

    <div class="container mt-3">
      <div class="row">
        <h2 class="h4">Images de la même catégorie :</h2>
      </div>
      <div class="row">
        <div v-for="(image, index) in categoryImages" :key="index" class="col-lg-3 col-md-4 col-sm-6 col-12">
          <img :src="image" class="img-fluid" :alt="`Image ${index + 1}`">
        </div>
      </div>
    </div>
  </div>
</template>
