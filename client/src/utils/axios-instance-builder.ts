import axios, { AxiosInstance } from "axios";
import { IAxiosServiceBuilder } from "./interfaces/axios-instance-builder-interface";

class AxiosServiceBuilder implements IAxiosServiceBuilder {
  private ApiBaseUrl = "";
  private ApiCallTimeout = 0;

  public static Create() {
    return new AxiosServiceBuilder();
  }

  public WithBaseUrl(baseUrl: string) {
    this.ApiBaseUrl = baseUrl;
    return this;
  }

  public WithTimeout(timeout: number) {
    this.ApiCallTimeout = timeout;
    return this;
  }

  public Build(): AxiosInstance {
    const axiosInstance = axios.create({
      timeout: this.ApiCallTimeout,
      baseURL: this.ApiBaseUrl,
    });

    console.log("url", this.ApiBaseUrl);

    axiosInstance.defaults.headers["Content-Type"] = "application/json";

    return axiosInstance;
  }
}

export default AxiosServiceBuilder;
