import type { GetAuthorQuery } from "@/types/graphql";

interface HeroSectionProps {
  author: GetAuthorQuery | null;
}

export const HeroSection = ({ author }: HeroSectionProps) => {
  return (
    <section id="hero" className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
      <h1 className="text-base sm:text-lg font-commit-mono-bold font-mono">
        {author?.authors[0].name}
      </h1>
      <p className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">{author?.authors[0].authorDescription}</p>
      <div className="social-links mt-2 text-sm" dangerouslySetInnerHTML={{ __html: author?.authors[0].socials?.html || "" }}></div>  
    </section>
  );
};