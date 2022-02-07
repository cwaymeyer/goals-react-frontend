import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API class
 *
 * All API calls are made through this class
 */

class GoalsAPI {
  static token;

  static async request(endpoint, method = "get", data = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GoalsAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ method, url, headers, params, data })).data;
    } catch (err) {
      console.error("API error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //   Individual API calls

  /** Login to site, returns token */

  static async login(data) {
    let res = await this.request("auth/token", "post", data);
    return res.token;
  }

  /** Signup for site, returns token */

  static async signup(data) {
    let res = await this.request("auth/register", "post", data);
    return res.token;
  }

  /** Get individual user */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get individual goal */

  static async getGoal(goal_id) {
    let res = await this.request(`goals/${goal_id}`);
    return res.goal;
  }
}

export default GoalsAPI;
