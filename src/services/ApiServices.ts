import axios from "axios";

export default class ApiService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getCountries(endPoint: string) {
        try {
            const response = await axios.get(`${this.baseUrl}${endPoint}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching countries:", error);
            throw error;
        }
    }
}