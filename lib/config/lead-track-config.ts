import { getTagIdByTemperature } from "@/lib/temperature-utils";

export const LEAD_TRACK_CONFIG = {
  launch: "oro",
  season: "ago26",
  tag_id: (temperature: string | null | undefined): string => {
    if (!temperature) {
      return "";
    }

    const tagId = getTagIdByTemperature(temperature);
    return tagId ? String(tagId) : "";
  },
  tag_id_International: (region: string | null | undefined): string => {
    if (!region) {
      return "";
    }

    const tagIdsByRegion: Record<string, number> = {
      eua: 121220,
      pt: 121221,
      latam: 121222,
    };

    const tagId = tagIdsByRegion[region];
    return tagId ? String(tagId) : "";
  },
} as const;
