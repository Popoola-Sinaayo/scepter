import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  image: string;
  overlay?: "dark" | "light" | "none";
  titleClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  image,
  overlay = "dark",
  titleClassName = "text-white",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[280px] items-center overflow-hidden sm:min-h-[340px] md:min-h-[420px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {overlay !== "none" ? (
        <div
          className={`absolute inset-0 ${
            overlay === "dark" ? "bg-black/45" : "bg-white/35"
          }`}
        />
      ) : null}
      <div className="relative mx-auto w-full max-w-[1500px] px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <p className="font-display text-sm uppercase text-primary sm:text-base">
          {eyebrow}
        </p>
        <h1
          className={`mt-2 max-w-[640px] font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl md:leading-[64px] ${titleClassName}`}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
