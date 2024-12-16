import Link from "next/link";

const HomeLink = () => {
  return (
    <Link className="underline mt-2" href="/countries">
      {" "}
      Return to country list
    </Link>
  );
};

export default HomeLink;
