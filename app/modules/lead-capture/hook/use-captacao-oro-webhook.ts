import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { CaptacaoOroWebhookPayload } from "@/lib/webhooks/captacao-oro";

export const useCaptacaoOroWebhook = () => {
  return useMutation({
    mutationFn: (body: CaptacaoOroWebhookPayload) =>
      axios.post<{ success: boolean }>("/api/webhooks/captacao-oro", body),
    // Avoid automatic retries for an automation that may already have processed the lead.
    retry: false,
  });
};
