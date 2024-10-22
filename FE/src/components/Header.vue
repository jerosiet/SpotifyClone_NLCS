<template>
    <div class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between">
        <div class="flex items-center ml-6">
            <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
                <ChevronLeft fillColor="#FFFFFF" :size="'30'" />
            </button>
            <button type="button" class="rounded-full bg-black p-[1px] ml-4 cursor-pointer">
                <ChevronRight fillColor="#FFFFFF" :size="'30'" />
            </button>
        </div>
        <button @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'" class="bg-black hover:bg-[#282828] rounded-full p-1 mr-8 mt-0.3 cursor-pointer">
            <div class="flex items-center">
                <img class="rounded-full" width="27" src="https://yt3.ggpht.com/yti/ANjgQV9I9w_Peh9jMFh8TGpIUI4dTZBnJ7IY2bzFogsRx7WNEw7z=s88-c-k-c0x00ffffff-no-rj">
                <div class="text-white text-[13px] ml-1.5 font-semibold">Thy Le</div>
                <ChevronDown v-if="!openMenu" @click="openMenu = true" fillColor="#FFFFFF" :size="25" />
                <ChevronUp v-else @click="openMenu = false" fillColor="#FFFFFF" :size="25" />
            </div>
        </button>
        <span v-if="openMenu" class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
            <ul class="text-gray-200 font-semibold text-[14px]">
                <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">Profile</li>
                <li class="px-3 py-2.5 hover:bg-[#3E3D3D]" @click="logout">Log out</li>
            </ul>
        </span>
    </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '../stores/authStore'

import { useRouter } from 'vue-router'

const router = useRouter()


const authStore = useAuthStore()

const user = { user: authStore.user }

const { tenNguoiDung, username } = user


const logout = async () => {
    await authStore.logout()
    router.push({ name: 'Login' })
}


</script>