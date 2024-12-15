import { appConfig } from "@/config/api-config";
import AxiosServiceBuilder from "@/utils/axios-instance-builder";
import { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = AxiosServiceBuilder.Create()
  .WithBaseUrl(appConfig.apiUrl)
  .WithTimeout(appConfig.apiTimeout)
  .Build();

export default axiosInstance;
