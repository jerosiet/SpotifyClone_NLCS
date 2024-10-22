<script setup>
import { ref } from 'vue';
import CreatePlaylistForm from './CreatePlaylistForm.vue'
import axios from 'axios';
import { playListService } from '../services/playlistService.js'

const error = ref('');
const success = ref('');

const handleCreatePlaylist = async (playlist) => {
  try {
        const createdPlaylist = await playListService.createPlaylist(playlist);
        console.log('Playlist created:', createdPlaylist);
      } catch (error) {
        console.error('Failed to create playlist:', error);
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-white mb-6">Create New Playlist</h1>
    <CreatePlaylistForm @create-playlist="handleCreatePlaylist" />
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
  </div>
</template>