import type { GetTechnologiesQuery } from "@/types/graphql";
import { Skeleton } from "@/components/ui/skeleton";

interface TechnologiesSectionProps {
  technologies: GetTechnologiesQuery | null;
}

export const TechnologiesSection = ({ technologies }: TechnologiesSectionProps) => {
    return (
        <section id="technologies" className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
            <h2 className="text-base sm:text-lg font-commit-mono-bold font-mono">Techstack</h2>
            <div className="technologies-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
                {!technologies?.techstacks ? (
                    <>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="border border-border p-3 sm:p-4 w-full technologies-item">
                                <Skeleton className="h-5 w-32 mb-2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </div>
                        ))}
                    </>
                ) : (
                    technologies.techstacks.map((technology) => (
                        <div key={technology.technologyTitle} className="cursor-pointer border border-border p-3 sm:p-4 group hover:bg-white transition-all duration-300 w-full technologies-item">
                            <h3 className="text-sm sm:text-lg font-commit-mono-regular font-mono group-hover:text-black transition-colors duration-300">{technology.technologyTitle}</h3>
                            <div className="technologies-description text-xs text-muted-foreground line-clamp-3 mt-2 group-hover:text-black transition-colors duration-300" dangerouslySetInnerHTML={{ __html: technology.technologyDescription || "" }} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};