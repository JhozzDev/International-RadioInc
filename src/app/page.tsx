import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      title: "Global Coverage",
      description:
        "Tune into thousands of radio stations from every corner of the world. From Latin America to Europe, Asia and beyond — all in one place.",
    },
    {
      title: "Instant Streaming",
      description:
        "No downloads, no sign-ups. Just pick a country, choose a station, and start listening instantly. Crystal-clear live streaming at your fingertips.",
    },
    {
      title: "Free Forever",
      description:
        "International Radio is completely free. No ads interrupting your music, no subscriptions, no hidden fees. Just pure radio, the way it should be.",
    },
  ];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
      style={{
        background:
          "linear-gradient(268deg, rgba(0,0,0,1) 0%, rgb(70,19,89) 0%, rgba(0,0,0,1) 57%, rgba(0,0,0,1) 93%)",
      }}
    >
      
      <section className="flex flex-col items-center gap-10 w-full max-w-5xl ">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            🌍 International Radio
          </h1>
          <p className="text-purple-300 text-lg">
            The world's music, live & free.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center text-white flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-4 hover:border-purple-500/40 hover:bg-white/8"
            >
              <h2 className="text-xl font-semibold text-purple-300">{f.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

<div className="md:flex gap-10 justify-center w-full md:flex-row">
        <Link href="/radio">
          <button className="mt-2 w-72 py-4 rounded-xl bg-purple-700 text-white text-xl font-semibold cursor-pointer transition-all duration-750 active:scale-95  shadow-[0_0_25px_#7c3aed] hover:bg-gray-900 hover:shadow-none">
            Let's go Listen! 
          </button>
        </Link>
        <Link href="/world">
          <button className="mt-2 w-72 py-4 rounded-xl bg-purple-700 text-white text-xl font-semibold cursor-pointer transition-all duration-750 active:scale-95 shadow-[0_0_25px_#7c3aed] hover:bg-gray-900 hover:shadow-none">
            Free world! 
          </button>
        </Link></div>
      </section>
    </main>
  );
}
