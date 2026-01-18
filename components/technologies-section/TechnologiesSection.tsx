import { getTechnologies } from "@/fetchers/getTechnologies";

export const TechnologiesSection = async () => {
    const technologies = await getTechnologies();
    
    return (
        <section className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
            <h2 className="text-base sm:text-lg font-commit-mono-bold font-mono">Techstack</h2>
            <div className="technologies-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
                {technologies?.techstacks?.map((technology) => (
                    <div key={technology.technologyTitle} className="border border-border p-3 sm:p-4 group hover:bg-white transition-all duration-300 w-full">
                        <h3 className="text-sm sm:text-lg font-commit-mono-regular font-mono group-hover:text-black transition-colors duration-300">{technology.technologyTitle}</h3>
                        <div className="technologies-description text-xs text-muted-foreground line-clamp-3 mt-2 group-hover:text-black transition-colors duration-300" dangerouslySetInnerHTML={{ __html: technology.technologyDescription || "" }} />
                    </div>
                ))}
            </div>
        </section>
    );
};