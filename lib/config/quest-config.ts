export const DEFAULT_QUEST_FORM_VERSION_ID =
  "c0909c2f-4bb6-49fe-8fac-7153076f6781";

const QUEST_WHATSAPP_URL_BY_TEMPERATURE = {
  f: "https://sendflow.click/i/oro-jul26-traf-2",
  org: "https://sendflow.click/i/oro-jul26-org",
  m: "https://sendflow.click/i/oro-jul26-traf-2",
  q: "https://sendflow.click/i/oro-jul26-traf-2",
  t: "https://sendflow.click/i/oro-jul26-traf-2",
} as const;

const QUEST_WHATSAPP_URL_BY_REGION = {
  latam: "https://sendflow.click/i/orolatamago26",
  eua: "https://sendflow.click/i/oroamago26",
  pt: "https://sendflow.click/i/oroeurago26",
} as const;

type QuestTesteTemperatureKey = keyof typeof QUEST_WHATSAPP_URL_BY_TEMPERATURE;
type QuestRegionKey = keyof typeof QUEST_WHATSAPP_URL_BY_REGION;

export function resolveQuestTesteWhatsappUrl(
  temperature: string,
  region?: string
): string {
  const normalizedRegion = (region || "").toLowerCase().trim();

  if (normalizedRegion in QUEST_WHATSAPP_URL_BY_REGION) {
    return QUEST_WHATSAPP_URL_BY_REGION[
      normalizedRegion as QuestRegionKey
    ];
  }

  const normalizedTemperature = temperature.toLowerCase().trim();
  const validKeys = Object.keys(
    QUEST_WHATSAPP_URL_BY_TEMPERATURE
  ) as QuestTesteTemperatureKey[];

  const resolvedKey = validKeys.includes(
    normalizedTemperature as QuestTesteTemperatureKey
  )
    ? (normalizedTemperature as QuestTesteTemperatureKey)
    : "f";

  return QUEST_WHATSAPP_URL_BY_TEMPERATURE[resolvedKey];
}