import { getExperiences } from "@/fetchers/getExperiences";
import Image from "next/image";
import "../../app/styles/components.css";

export const ExperienceSection = async () => {
    const experiences = await getExperiences();

    return (
        <section className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
            <h2 className="text-base sm:text-lg font-commit-mono-bold font-mono">Experience</h2>
            <div className="experience-timeline relative">
                {experiences?.experiences?.map((experience, index) => (
                    <div 
                        key={experience.companyLogo.url} 
                        className="experience-item relative pl-6 sm:pl-8 pb-6 sm:pb-8"
                    >
                        {index < (experiences.experiences?.length || 0) - 1 && (
                            <div className="absolute left-2 sm:left-3 top-8 bottom-0 w-px bg-border"></div>
                        )}
                        
                        <div className="absolute left-0 top-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></div>
                        </div>

                        <div className="mb-3">
                            <p className="text-xs font-commit-mono-regular font-mono text-muted-foreground">
                                {experience.workdateFrom} - {experience.workdateTo || "Present"}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            <Image
                                src={experience.companyLogo.url}
                                alt={experience.companyInfo?.html || ""}
                                width={100}
                                height={100}
                                className="w-10 h-10 rounded-full flex-shrink-0"
                            />
                            <div className="experience-description flex-1" dangerouslySetInnerHTML={{ __html: experience.companyInfo?.html || "" }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};