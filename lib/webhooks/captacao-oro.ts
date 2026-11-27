import { z } from "zod";
import type { NormalizedTemperature } from "@/lib/temperature-utils";

export const CAPTACAO_ORO_WEBHOOK_URL =
  "https://n8n.prod.awsales.io/webhook/captacao-oro-dez-26";
export const CAPTACAO_ORO_INTERNATIONAL_WEBHOOK_URL =
  "https://n8n.prod.awsales.io/webhook/captacao-oro-europa-dez-26";

export const captacaoOroPayloadSchema = z.object({
  event: z.literal("custom_action"),
  timestamp: z.string(),
  source: z.object({ id: z.string(), name: z.string() }),
  lead: z.object({ phone: z.string().min(1), email: z.string().email(), name: z.string() }),
  utm: z.object({
    source: z.string(),
    campaign: z.string(),
    medium: z.string(),
    content: z.string(),
    term: z.string(),
  }),
  metadata: z.object({
    action_details: z.string(),
    engagement_level: z.string(),
    intent_level: z.string(),
    emotional_tone: z.string(),
    context_notes: z.string(),
  }),
});

export type CaptacaoOroWebhookPayload = z.infer<typeof captacaoOroPayloadSchema>;

export function formatCaptacaoOroDateTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date).replace(",", "");
}

/** Same body contract used by the pagina-wordpress-alianca integration in lead-odml. */
export function buildCaptacaoOroPayload(input: {
  launch: string;
  season: string;
  temperatura: NormalizedTemperature | undefined;
  lead: { phone: string; email: string; name?: string };
  getUtmValue: (key: string) => string;
}): CaptacaoOroWebhookPayload {
  return {
    event: "custom_action",
    timestamp: formatCaptacaoOroDateTime(),
    source: {
      id: [input.launch, input.season, input.temperatura].filter(Boolean).join("-"),
      name: `[${input.launch}] ${input.season} - captura`,
    },
    lead: {
      phone: input.lead.phone,
      email: input.lead.email,
      name: input.lead.name ?? "",
    },
    utm: {
      source: input.getUtmValue("utm_source"),
      campaign: input.getUtmValue("utm_campaign"),
      medium: input.getUtmValue("utm_medium"),
      content: input.getUtmValue("utm_content"),
      term: input.getUtmValue("utm_term"),
    },
    metadata: {
      action_details: "",
      engagement_level: "",
      intent_level: "",
      emotional_tone: "",
      context_notes: "",
    },
  };
}
