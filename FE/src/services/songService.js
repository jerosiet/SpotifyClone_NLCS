import axios from "axios";

const songUrl = "http://localhost:3000/song";
const token = localStorage.getItem("jwtToken");

const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const songService = {
  async createSong(tenBaiHat, cover, track) {
    let cover_url = "";
    let track_url = "";

    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
      const formData = new FormData();
      formData.append("tags", "browser_upload");
      formData.append("upload_preset", "libraryManagement");
      formData.append("folder", "libraryManagement");
      formData.append("file", cover);

      const response = await axiosInstance.post(url, formData, {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.secure_url) {
        cover_url = response.data.secure_url;
      } else {
        throw new Error("Upload cover failed");
      }
    } catch {
      console.error("Error uploading cover file:", error.response.data);
      throw error;
    }

    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
      const formData = new FormData();
      formData.append("tags", "browser_upload");
      formData.append("upload_preset", "libraryManagement");
      formData.append("folder", "libraryManagement");
      formData.append("file", track);

      const response = await axios.post(url, formData, {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.secure_url) {
        track_url = response.data.secure_url;
      } else {
        throw new Error("Upload track failed");
      }
    } catch {
      console.error("Error uploading track file:", error.response.data);
      throw error;
    }

    try {
      const response = await axios.post(
        `${songUrl}/create`,
        {tenBaiHat, cover, track},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating song:", error.response.data);
      throw error;
    }
  },
  async getALlSongs() {
    try {
      const response = await axios.get(`${songUrl}/get/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching all songs:", error.response.data);
      throw error;
    }
  },

  async getMySongs() {
    try {
      const response = await axios.get(`${songUrl}/get/mysongs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my songs:", error.response.data);
      throw error;
    }
  },

  async getSongsByArtist(artistId) {
    try {
      const response = await axios.get(`${songUrl}/get/artist/${artistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching artist songs:", error.response.data);
      throw error;
    }
  },

  async getSongByName(tenBaiHat) {
    try {
      const response = await axios.get(`${songUrl}/get/songname/${tenBaiHat}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching song by name:", error.response.data);
      throw error;
    }
  },
};
