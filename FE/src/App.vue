<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router';
import BarItem from './components/BarItem.vue';
import MusicPlayer from './components/MusicPlayer.vue';

import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

import { useSongStore } from './stores/song';
import { storeToRefs } from 'pinia';
import { authService } from './services/authService';
const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);
const router = useRouter();

onMounted(() => {
  isPlaying.value = false
})

let openMenu = ref(false);
const handleLogout = async () => {
  try {
    await authService.clearAuthToken();
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Logout error:', error);
  }
};
const isOnLoginPage = computed(() => {
  return router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/register';
});
</script>

<template>
  <div>
    <div id="SideNav" class="h-[100%] p-4 w-[240px] fixed z-50 bg-black">
      <RouterLink to="/">
        <div class="text-white text-[20px] ml-1.5 font-normal flex items-center">
          <img width="40" src="./assets/logopng.png" class="mr-2">Rewindify
        </div>
      </RouterLink>
    </div>

    <div v-if="!isOnLoginPage">

      <div id="SideNav" class="h-[100%] p-4 w-[240px] fixed z-50 bg-black">
        <div class="my-8"></div>
        <ul>
          <RouterLink to="/home">
            <BarItem class="ml-[15px]" iconString="home" iconSize="23" pageUrl="/home" name="Home" />
          </RouterLink>
          <RouterLink to="/search">
            <BarItem class="ml-[15px]" iconString="search" iconSize="24" pageUrl="/search" name="Search" />
          </RouterLink>
          <RouterLink to="/library">
            <BarItem class="ml-[16px]" iconString="library" iconSize="23" pageUrl="/library" name="Library" />
          </RouterLink>
          <div class="py-3.5"></div>
          <RouterLink to="/playlist">
            <BarItem class="ml-[15px]" iconString="playlist" iconSize="24" pageUrl="/playlist" name="Create Playlist" />
          </RouterLink>
          <BarItem class="ml-[15px]" iconString="liked" iconSize="27" pageUrl="/liked" name="Liked Songs" />
        </ul>
        <div class="border-b border-b-gray-700"></div>
        <ul class="ml-[15px] py-4">
          <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #1</li>
          <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #2</li>
          <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #3</li>
        </ul>
      </div>
    </div>
    <div class="fixed right-0 top-0 w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black">
      <div class="mt-[70px]"></div>
      <RouterView />
      <div class="mb-[100px]"></div>
    </div>
    <div v-if="!isOnLoginPage">
      <MusicPlayer v-if="currentTrack" />
    </div>
  </div>
</template>
