import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../components/HomeView.vue";
import SearchView from "../components/SearchView.vue";
import LibraryView from "../components/LibraryView.vue";
import CreatePlaylistView from "../components/CreatePlaylistView.vue";
import Login from "../components/Login.vue";
import Register from "../components/RegisterView.vue";

import DashBoard from "../components/DashBoard.vue";

const routes = [
  {path: "/", redirect: "/login"},
  {path: "/login", name: "Login", component: Login},
  {path: "/register", name: "Register", component: Register},
  {path: "/home", name: "Home", component: DashBoard},
  {path: "/search", name: "SearchView", component: SearchView},
  {path: "/library", name: "LibraryView", component: LibraryView},
  {path: "/playlist", name: "CreatePlaylistView", component: CreatePlaylistView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
