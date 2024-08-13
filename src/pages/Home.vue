<script setup>
import { ref, onMounted } from 'vue';
import ImageCard from '../components/ImageCard.vue';

const images = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://esd.atontour.org/v1/prompt');
    const data = await response.json();
    images.value = data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});
</script>

<template>
  <div>
    <ImageCard/>
  </div>
</template>
