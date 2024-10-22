import axios from "axios";

const microUrl = 'http://localhost:3000/comment';
const token = localStorage.getItem('jwtToken');

export const commentService = {
    async addComment(noiDung, songId) {
        try {
            const response = await axios.post(`${microUrl}/add/comment`,
                { noiDung, songId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
          console.error("Error:", error.response.data);
          throw error;
        }
      }
}
