export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200vh] bg-black text-white">
      <section className="flex flex-col items-center gap-6 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          ElitePlay
        </h1>
        <p className="text-zinc-400 text-lg max-w-md">
          A plataforma definitiva para atletas e arenas de elite.
        </p>
      </section>
    </div>
  );
}
