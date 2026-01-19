import { getAuthor } from "@/fetchers/getAuthor";
import { getExperiences } from "@/fetchers/getExperiences";
import { getProjects } from "@/fetchers/getProjects";
import { getTechnologies } from "@/fetchers/getTechnologies";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const step = searchParams.get("step");

    switch (step) {
      case "hero":
        const author = await getAuthor();
        return NextResponse.json({ author });
      case "experience":
        const experiences = await getExperiences();
        return NextResponse.json({ experiences });
      case "projects":
        const projects = await getProjects();
        return NextResponse.json({ projects });
      case "technologies":
        const technologies = await getTechnologies();
        return NextResponse.json({ technologies });
      default:
        const [authorData, experiencesData, projectsData, technologiesData] =
          await Promise.all([
            getAuthor(),
            getExperiences(),
            getProjects(),
            getTechnologies(),
          ]);
        return NextResponse.json({
          author: authorData,
          experiences: experiencesData,
          projects: projectsData,
          technologies: technologiesData,
        });
    }
  } catch (error) {
    console.error("Preload error:", error);
    return NextResponse.json(
      { error: "Failed to preload data" },
      { status: 500 }
    );
  }
}
