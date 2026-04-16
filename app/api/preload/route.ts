import { NextResponse } from "next/server";
import { getAuthor } from "@/fetchers/getAuthor";
import { getExperiences } from "@/fetchers/getExperiences";
import { getProjects } from "@/fetchers/getProjects";
import { getTechnologies } from "@/fetchers/getTechnologies";

async function getAllPreloadData() {
	const [author, experiences, projects, technologies] = await Promise.all([
		getAuthor(),
		getExperiences(),
		getProjects(),
		getTechnologies(),
	]);

	return { author, experiences, projects, technologies };
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const step = searchParams.get("step");

		const stepFetchers: Record<string, { responseKey: string; fetch: () => Promise<unknown> }> = {
			hero: { responseKey: "author", fetch: getAuthor },
			experience: { responseKey: "experiences", fetch: getExperiences },
			projects: { responseKey: "projects", fetch: getProjects },
			technologies: { responseKey: "technologies", fetch: getTechnologies },
		};

		if (step && stepFetchers[step]) {
			const { responseKey, fetch } = stepFetchers[step];
			const data = await fetch();
			return NextResponse.json({ [responseKey]: data });
		}

		return NextResponse.json(await getAllPreloadData());
	} catch (error) {
		console.error("Preload error:", error);
		return NextResponse.json({ error: "Failed to preload data" }, { status: 500 });
	}
}
