<script setup>
import CategorySelect from './CategorySelect.vue';
</script>
<template>
    <div class="p-8">
        <button type="button" class="text-white text-2xl font-semibold hover:underline cursor-pointer">
            Podcasts to make you smarter
        </button>
        <div class="py-1.5"></div>
        <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            <CategorySelect image="https://picsum.photos/id/40/300/300" category="Podcasts" />
        </div>
    </div>
</template>
