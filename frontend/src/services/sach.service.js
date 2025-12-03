import createApiClient from "./api.service";

class SachService {
  constructor(baseUrl = "/api/sach") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async timKiem(params) {
    return (await this.api.get("/timkiem", { params })).data;
  }

  async get(maSach) {
    return (await this.api.get(`/${maSach}`)).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async update(maSach, data) {
    return (await this.api.put(`/${maSach}`, data)).data;
  }

  async delete(maSach) {
    return (await this.api.delete(`/${maSach}`)).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async updateNumber(maSach, data) {
    return (await this.api.put(`/capnhatsoluong/${maSach}`, data)).data;
  }
}

export default new SachService();
