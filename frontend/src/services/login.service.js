import createApiClient from "./api.service";

class LoginService {
  constructor(baseUrl = "/api/login") {
    this.api = createApiClient(baseUrl);
  }

  async login(username, password) {
    return (await this.api.post("/", { username, password })).data;
  }
}

export default new LoginService();
