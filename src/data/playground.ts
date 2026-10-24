export interface PlaygroundItem {
	id: string;
	title: string;
	/** One or two sentences — what it is and what it explores. */
	description: string;
	tags: string[];
	/** Where the live version is hosted. */
	href: string;
}

/** Subtitle under the collapsed "Playground" heading. */
export const playgroundIntro =
	"Unfinished pet projects I built and am still working on.";

export const playground: PlaygroundItem[] = [
	{
		id: "monicet",
		title: "MONICET: Filling the gaps",
		description:
			"Interactive D3 maps of the MONICET whale-watching archive: 8,455 trips and 29,400 sightings of whales, dolphins, turtles and other animals around the Azores, 2009–2020. The same data is shown differently to explore how the goal behind a visualization decides how to use a map for information visualization. Another goal is to explore data reliability and how to handle patchy data.",
		tags: ["D3.js", "Vue.js", "information visualization", "missing data"],
		href: "https://phlppkln.github.io/monicet/",
	},
];
