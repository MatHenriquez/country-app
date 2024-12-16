"use client";

import { useEffect, useState } from "react";
import { ICountriesResponse } from "./interfaces/countries-response";
import axiosInstance from "@/services/api-service";
import LoadingToast from "./components/LoadingToast";
import CountryLink from "./components/CountryLink";
import Pagination from "./components/Pagination";

const CountriesPage = () => {
  const [countries, setCountries] = useState<ICountriesResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const countriesPerPage = "24";

  useEffect(() => {
    axiosInstance
      .get<ICountriesResponse>(
        `/country?pageSize=${countriesPerPage}&pageNumber=${currentPage.toString()}`,
      )
      .then((response) => {
        setCountries(response.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error: unknown) => {
        console.error("Error fetching countries:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h2 className="text-cyan-400 text-7xl py-8">Countries</h2>
      {isLoading && <LoadingToast />}
      {countries && (
        <ul className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto pb-4">
          {countries.countries.map((country) => (
            <CountryLink
              key={country.countryCode}
              name={country.name}
              countryCode={country.countryCode}
            />
          ))}
        </ul>
      )}

      {!isLoading && (
        <Pagination
          page={currentPage}
          setPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default CountriesPage;
