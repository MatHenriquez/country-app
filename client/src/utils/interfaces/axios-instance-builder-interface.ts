import { AxiosInstance } from "axios";
import AxiosServiceBuilder from "../axios-instance-builder";

export interface IAxiosServiceBuilder {
  WithBaseUrl(baseUrl: string): AxiosServiceBuilder;
  WithTimeout(timeout: number): AxiosServiceBuilder;
  Build(): AxiosInstance;
}
