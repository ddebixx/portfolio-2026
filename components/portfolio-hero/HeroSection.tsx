import { getAuthor } from "@/fetchers/author/getAuthor";

export const HeroSection = async () => {
  const author = await getAuthor();

  return (
    <section className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
      <h1 className="text-base sm:text-lg font-commit-mono-bold font-mono">
        <span className="terminal-prompt">$</span> 
        {author?.authors[0].name}
        <span className="terminal-cursor">_</span>
      </h1>
      <p className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">{author?.authors[0].authorDescription}</p>
      <div className="social-links mt-2 text-sm" dangerouslySetInnerHTML={{ __html: author?.authors[0].socials?.html || "" }}></div>  
    </section>
  );
};