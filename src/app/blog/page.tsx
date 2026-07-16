import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/components/PageHero";
import { blogPosts } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Stories and reflections from ${site.name}.`,
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Share, inspire, innovate"
        image="/images/about-hero.jpg"
        overlay="dark"
      />

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 md:px-10 lg:px-[7.33%]">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading
            eyebrow="Read our Blog"
            title="Latest from The Scepter"
          />
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className={`flex min-h-[300px] flex-col bg-cream p-6 sm:min-h-[340px] sm:p-8 ${
                  post.featured ? "border-b-4 border-primary" : ""
                }`}
              >
                <p className="bg-gradient-to-r from-[#a54e2b] to-[#dc9853] bg-clip-text font-display text-xs font-bold uppercase tracking-[0.08em] text-transparent">
                  {post.category}
                </p>
                <h3 className="mt-4 font-display text-xl font-bold uppercase leading-snug tracking-tight text-navy sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 font-display text-base leading-6 text-navy/80">
                  {post.excerpt}
                </p>
                <div className="mt-6 border-t border-navy/10 pt-4 font-display text-sm text-navy/70">
                  <p>By {post.author}</p>
                  <p className="mt-1">{post.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
