import Link from "next/link";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('/countries-bg.webp')",
      }}
    >
      <div className="hero-overlay bg-opacity/60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md shadow-2xl shadow-cyan-500/50 p-2 rounded-lg bg-cyan-300/50">
          <h1 className="mb-5 text-5xl text-black font-bold">
            Welcome to Country Info App
          </h1>
          <p className="mb-5 text-black">
            Get information about countries around the world.
          </p>
          <Link href="/countries" className="btn btn-accent text-white">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
