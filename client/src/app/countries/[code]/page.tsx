"use client";

import { useEffect, useState, useMemo } from "react";
import axiosInstance from "@/services/api-service";
import LoadingToast from "../components/LoadingToast";
import { ICountryInfo } from "./interfaces/country-info";
import CountryLink from "../components/CountryLink";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import CountryHeader from "./components/CountryHeader";
import HistoricalPopulationChart from "./components/HistoricalPopulationChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface PageProps {
  params: {
    code: string;
  };
}

const Page = ({ params }: Readonly<PageProps>) => {
  const { code } = params;

  const [country, setCountry] = useState<ICountryInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axiosInstance.get<ICountryInfo>(
          `/country/${code}`,
        );
        setCountry(response.data);
      } catch (err: unknown) {
        console.error("Error fetching country:", err);
        setError("Could not retrieve country data.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCountry();
  }, [code]);

  const chartData = useMemo(() => {
    if (!country) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: country.populationOverTime.map((pop) => pop.year),
      datasets: [
        {
          label: "Population",
          data: country.populationOverTime.map((pop) => pop.population),
          fill: false,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          tension: 0.1,
        },
      ],
    };
  }, [country]);

  const options = useMemo<ChartOptions<"line">>(() => {
    if (!country) {
      return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
            text: "",
          },
        },
        scales: {
          x: {
            title: {
              display: false,
              text: "",
            },
          },
          y: {
            title: {
              display: false,
              text: "",
            },
            beginAtZero: true,
          },
        },
      };
    }

    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: `${country.name} Population Over Time`,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Year",
          },
        },
        y: {
          title: {
            display: true,
            text: "Population",
          },
          beginAtZero: true,
        },
      },
    };
  }, [country]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingToast />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">Country not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <CountryHeader name={country.name} flagUrl={country.flagUrl} />

      <div className="max-w-6xl mx-auto bg-gray-300 px-6 py-2 rounded-lg shadow-md">
        <h2 className="text-4xl font-semibold mb-4 text-black">Details</h2>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <HistoricalPopulationChart chartData={chartData} options={options} />

          <div className="mb-8 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4 text-black">
              Border Countries
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-4">
              {country.borderCountries.map((border) => (
                <CountryLink
                  key={border.name}
                  name={border.name}
                  countryCode={border.countryCode}
                  nameColor="text-black"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
