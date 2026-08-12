export const EVENT_CONFIG = {
	latam: {
		region: "Argentina, Paraguai e Uruguai",
		date: "24, 25 E 26 DE AGOSTO",
		time: "19H55",
	},
	eua: {
		region: "Flórida",
		date: "24, 25 E 26 DE AGOSTO",
		time: "19H55",
	},
	pt: {
		region: "Portugal",
		date: "24, 25 E 26 DE AGOSTO",
		time: "19H55",
	},
} as const;

type EventRegion = keyof typeof EVENT_CONFIG;

const DEFAULT_EVENT_CONFIG = {
	region: "Brasil",
	date: "20, 21 E 22 DE JULHO",
	time: "19H55",
} as const;

export function getEventConfigFromSlug(slug?: string | string[]) {
	const rawSlug = Array.isArray(slug) ? slug[0] : slug;

	if (!rawSlug) return DEFAULT_EVENT_CONFIG;

	const parts = rawSlug.split("-").filter(Boolean);

	const region = parts.find(
		(part): part is EventRegion =>
			part === "latam" || part === "eua" || part === "pt"
	);

	return region ? EVENT_CONFIG[region] : DEFAULT_EVENT_CONFIG;
}