import HomeLink from "./HomeLink";
import Image from "next/image";

interface ICountryHeaderProps {
  name: string;
  flagUrl: string;
}

const CountryHeader = ({ name, flagUrl }: ICountryHeaderProps) => {
  return (
    <div className="flex flex-col items-center mb-12">
      <div className="flex flex-col md:flex-row items-center bg-gray-300 p-4 rounded-lg shadow-md">
        <h2 className="text-5xl font-bold text-gray-800 mb-4 md:mb-0 md:mr-6">
          {name}
        </h2>
        <Image
          className="w-48 h-auto border rounded-md"
          src={flagUrl}
          alt={`Flag of ${name}`}
          width={192}
          height={192}
        />
      </div>
      <HomeLink />
    </div>
  );
};

export default CountryHeader;
