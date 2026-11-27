import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { CaptacaoOroWebhookPayload } from "@/lib/webhooks/captacao-oro";

export const useCaptacaoOroWebhook = (options?: { international?: boolean }) => {
  return useMutation({
    mutationFn: (body: CaptacaoOroWebhookPayload) =>
      axios.post<{ success: boolean }>(
        options?.international
          ? "/api/webhooks/captacao-oro?international=true"
          : "/api/webhooks/captacao-oro",
        body
      ),
    // Avoid automatic retries for an automation that may already have processed the lead.
    retry: false,
  });
};
