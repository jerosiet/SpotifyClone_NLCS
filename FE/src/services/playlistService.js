import axios from "axios";

const playlistUrl = "http://localhost:3000/playlist";
const token = localStorage.getItem("jwtToken");

export const playListService = {
  async createPlaylist(tenDanhSachPhat, thumbnail, songs) {
    try {
      const response = await axios.post(
        `${playlistUrl}/create`,
        { tenDanhSachPhat, thumbnail, songs },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating playlist:", error.response.data);
      throw error;
    }
  },

  async getPlaylistById(playlistId) {
    try {
      const response = await axios.get(`${playlistUrl}/get/playlist/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.playlist;
    } catch (error) {
      console.error("Error fetching playlist:", error.response.data);
      throw error;
    }
  },

  async getPlaylistsByArtist(artistId) {
    try {
      const response = await axios.get(`${playlistUrl}/get/artist/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching artist playlists:", error.response.data);
      throw error;
    }
  },

  async addSongToPlaylist(playlistId, songId) {
    try {
      const response = await axios.post(
        `${playlistUrl}/add/song`,
        { playlistId, songId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding song to playlist:", error.response.data);
      throw error;
    }
  },

  async addSongToFavorites(songId) {
    try {
      const response = await axios.post(
        `${playlistUrl}/favorite`,
        { songId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding song to favorites:", error.response.data);
      throw error;
    }
  },

  async getFavoritePlaylist() {
    try {
      const response = await axios.get(`${playlistUrl}/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.playlist;
    } catch (error) {
      console.error("Error fetching favorite playlist:", error.response.data);
      throw error;
    }
  }
};
