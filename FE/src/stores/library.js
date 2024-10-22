import {defineStore} from "pinia";
import { songService } from "../services/songService";

export const useLibraryStore = defineStore("library", {
    state: () => ({
        songs: [],
        
    }),
    actions: {

        getAllSongs = songService.
    }



});
