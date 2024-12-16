import Link from "next/link";

interface CountryLinkProps {
  name: string;
  countryCode: string;
  nameColor?: string;
}

const CountryLink: React.FC<CountryLinkProps> = ({
  name,
  countryCode,
  nameColor,
}) => {
  return (
    <li>
      <Link href={`/countries/${countryCode}`}>
        <div className="p-4 border rounded-lg shadow hover:shadow-lg hover:shadow-cyan-300  transition flex flex-col items-center">
          <h3
            className={`${nameColor ?? ""} text-xl font-semibold mb-2 text-center`}
          >
            {name}
          </h3>
          <p className="text-gray-600 text-center">Code: {countryCode}</p>
        </div>
      </Link>
    </li>
  );
};

export default CountryLink;
