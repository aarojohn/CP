import axios from "axios";

const backendUrl =
  "https://moviereviewbackend-alv7024fw-johns-projects-eee3f51c.vercel.app";

class MovieDataServices {
  constructor() {
    this.baseUrl = `${backendUrl}/api/v1/movies`;
  }

  getAll(page = 0) {
    return axios.get(`${this.baseUrl}?page=${page}`);
  }

  get(id) {
    return axios.get(`${this.baseUrl}/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return axios.get(`${this.baseUrl}?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return axios.post(`${this.baseUrl}/review`, data);
  }

  updateReview(data) {
    return axios.put(`${this.baseUrl}/review`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`${this.baseUrl}/review`, {
      data: { review_id: id, user_id: userId },
    });
  }

  getRatings() {
    return axios.get(`${this.baseUrl}/ratings`);
  }
}

const MovieDataService = new MovieDataServices();

export default MovieDataService;
