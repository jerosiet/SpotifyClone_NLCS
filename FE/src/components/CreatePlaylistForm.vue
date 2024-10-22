<script setup>
import { ref } from 'vue';

const tenDanhSachPhat = ref('');
const thumbnail = ref('');
const songs = ref([]);

const emit = defineEmits(['create-playlist']);

const createPlaylist = () => {
  if (tenDanhSachPhat.value.trim() && thumbnail.value.trim()) {
    emit('create-playlist', {
      tenDanhSachPhat: tenDanhSachPhat.value,
      thumbnail: thumbnail.value,
      songs: songs.value
    });
    tenDanhSachPhat.value = '';
    thumbnail.value = '';
    songs.value = [];
  }
};
</script>

<template>
  <div class="p-4 bg-[#282828] rounded-lg max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-white mb-4">Create New Playlist</h2>
    <form @submit.prevent="createPlaylist">
      <div class="mb-4">
        <label for="playlist-name" class="block text-sm font-medium text-gray-300 mb-1">
          Playlist Name
        </label>
        <input
          id="playlist-name"
          v-model="tenDanhSachPhat"
          type="text"
          required
          class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter playlist name"
        >
      </div>
      <div class="mb-4">
        <label for="playlist-thumbnail" class="block text-sm font-medium text-gray-300 mb-1">
          Thumbnail URL
        </label>
        <input
          id="playlist-thumbnail"
          v-model="thumbnail"
          type="text"
          required
          class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter thumbnail URL"
        >
      </div>
      <div class="mb-4">
        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create Playlist
        </button>
      </div>
    </form>
  </div>
</template>