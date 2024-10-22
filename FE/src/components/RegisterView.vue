<template>
    <div class="p-4 bg-[#282828] rounded-lg max-w-md mx-auto">
        <h2 class="text-2xl font-bold text-white mb-4">Register</h2>
        <form @submit.prevent="handleRegister">
            <div class="mb-4">
                <label for="avatar" class="block text-sm font-medium text-gray-300 mb-1">Avatar:</label>
                <div @dragover.prevent="dragOver" @dragleave="dragLeave" @drop.prevent="drop" @click="triggerFileInput" :class="[
                    'w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer',
                    isDragging ? 'border-green-500 bg-green-500 bg-opacity-10' : 'border-gray-600 hover:border-green-500'
                ]">
                    <input type="file" id="avatar" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden" />
                    <div v-if="avatarPreview" class="relative w-24 h-24">
                        <img :src="avatarPreview" alt="Avatar preview" class="w-full h-full object-cover rounded-full" />
                        <button @click.prevent="removeAvatar"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                            <XIcon class="w-4 h-4" />
                        </button>
                    </div>
                    <div v-else class="text-center">
                        <UploadCloudIcon class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p class="text-sm text-gray-300">Drag and drop your avatar here or click to select</p>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email:</label>
                <input type="email" v-model="userData.emailNguoiDung" required class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Email" />
            </div>
            <div class="mb-4">
                <label for="username" class="block text-sm font-medium text-gray-300 mb-1">Username:</label>
                <input type="text" v-model="userData.username" required class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Username" />
            </div>
            <div class="mb-4">
                <label for="fullName" class="block text-sm font-medium text-gray-300 mb-1">Full Name:</label>
                <input type="text" v-model="userData.tenNguoiDung" required class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Full Name" />
            </div>
            <div class="mb-4">
                <label for="phone" class="block text-sm font-medium text-gray-300 mb-1">Phone Number:</label>
                <input type="text" v-model="userData.sdtNguoiDung" required class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Phone Number" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Password:</label>
                <input type="password" v-model="userData.password" required class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Password" />
            </div>
            <div class="mb-4">
                <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                    Register
                </button>
            </div>
            <div class="mt-4">
                <router-link to="/login">
                    <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Back to Login
                    </button>
                </router-link>
            </div>
            <p v-if="errorMessage" class="error mt-4">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';
import { UploadCloudIcon, XIcon } from 'lucide-vue-next';
import { useAuthStore } from '../stores/authStore'

const userData = ref({
    emailNguoiDung: '',
    password: '',
    tenNguoiDung: '',
    username: '',
    sdtNguoiDung: '',
    avatarNguoiDung: null
});
const errorMessage = ref('');
const router = useRouter();
const fileInput = ref(null);
const avatarPreview = ref(null);
const isDragging = ref(false);

const authStore = useAuthStore();




const handleRegister = async () => {


    const avatar_url = await authService.uploadAvatar(avatarPreview.value);

    userData.value.avatarNguoiDung = avatar_url;

    try {
        // const response = await authService.register(userData.value); //Đợi dòng này chạy rồi mấy dòng khác mới được chạy
        await authStore.register(userData.value);

        router.push({ name: 'Home' });

    } catch (error) {

        errorMessage.value = error.response?.data?.error || 'Registration failed!';
    }
}

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        userData.value.avatar = file;
        previewAvatar(file);
    }
};

const previewAvatar = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        avatarPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
};

const removeAvatar = () => {
    userData.value.avatar = null;
    avatarPreview.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const dragOver = (event) => {
    event.preventDefault();
    isDragging.value = true;
};

const dragLeave = () => {
    isDragging.value = false;
};

const drop = (event) => {
    isDragging.value = false;
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        userData.value.avatar = file;
        previewAvatar(file);
    }
};

const triggerFileInput = () => {
    fileInput.value.click();
};
</script>

<style scoped>
.error {
    color: red;
    font-size: 0.9em;
}
</style>