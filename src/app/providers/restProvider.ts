import axios, { AxiosInstance } from 'axios';

export class CmsClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    console.log('baseURL', baseURL)
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get(endpoint: string, params?: any) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error(`GET request failed: ${error}`);
    }
  }

  public async post(endpoint: string, data: any) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`POST request faled: ${error}`);
    }
  }

  // Add other methods as needed (put, delete, etc.)
}

// const cmsClientProvider = new CmsClient('https://your-cms-api-url.com');

export default CmsClient;