"use client";

import * as React from "react";
import {
  extractPhoneDigits,
  handlePhoneInputChange,
  isValidPhoneNumber,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

export function WhoWeAreCheckSection() {
  const [phoneValue, setPhoneValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);
  const abortRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handlePhoneChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = handlePhoneInputChange(event);
      setPhoneValue(formatted);
      if (error) {
        setError("");
      }
      if (result) {
        setResult(null);
      }
    },
    [error, result]
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!phoneValue.trim()) {
        setError("Por favor, digite um número de telefone");
        return;
      }

      if (!isValidPhoneNumber(phoneValue)) {
        setError("Por favor, digite um número de telefone válido");
        return;
      }

      setIsSubmitting(true);
      setError("");
      setResult(null);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const phoneDigits = extractPhoneDigits(phoneValue);
      const url = `https://api.oaeon.com.br/v1/check-phone?phone=${encodeURIComponent(
        phoneDigits
      )}`;

      const defaultErrorMessage = "Este número não é de um dos nossos Aliados.";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        let data: unknown = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        const coerceBooleanLike = (value: unknown): boolean | null => {
          if (typeof value === "boolean") return value;
          if (typeof value === "number") return value === 1 ? true : value === 0 ? false : null;
          if (typeof value === "string") {
            const v = value.trim().toLowerCase();
            if (["true", "1", "yes", "y", "ok", "verified", "valido", "válido"].includes(v)) return true;
            if (["false", "0", "no", "n", "invalid", "invalido", "inválido", "unverified"].includes(v)) return false;
          }
          return null;
        };

        const getVerified = (payload: unknown): boolean | null => {
          if (!payload || typeof payload !== "object") return null;
          const obj = payload as Record<string, unknown>;

          const direct =
            obj.verified ?? obj.isVerified ?? obj.valid ?? obj.exists ?? null;
          const directBool = coerceBooleanLike(direct);
          if (directBool !== null) return directBool;

          const nested = obj.data;
          if (nested && typeof nested === "object") {
            const n = nested as Record<string, unknown>;
            const v =
              n.verified ?? n.isVerified ?? n.valid ?? n.exists ?? null;
            const nestedBool = coerceBooleanLike(v);
            if (nestedBool !== null) return nestedBool;
          }

          return null;
        };

        const getAllyName = (payload: unknown): string | null => {
          if (!payload || typeof payload !== "object") return null;
          const obj = payload as Record<string, unknown>;

          const direct = obj.name ?? obj.allyName ?? obj.nome ?? null;
          if (typeof direct === "string" && direct.trim()) return direct.trim();

          const nested = obj.data;
          if (nested && typeof nested === "object") {
            const n = nested as Record<string, unknown>;
            const v = n.name ?? n.allyName ?? n.nome ?? null;
            if (typeof v === "string" && v.trim()) return v.trim();
          }

          return null;
        };

        const verified = getVerified(data);
        const allyName = getAllyName(data);

        // Se o backend responder 200, consideramos verificado
        // a menos que venha explicitamente como "false" no payload.
        if (verified !== false) {
          setResult({
            type: "success",
            message: allyName
              ? `Número verificado. Este contato é oficial da Aliança Divergente. Aliado: ${allyName}.`
              : "Número verificado. Este contato é oficial da Aliança Divergente.",
          });
          return;
        }

        // verified === false: tratamos como não verificado
        setResult({ type: "error", message: defaultErrorMessage });
      } catch (err) {
        // Abort não deve mostrar mensagem
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResult({ type: "error", message: defaultErrorMessage });
      } finally {
        setIsSubmitting(false);
      }
    },
    [phoneValue]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const form = event.currentTarget.closest("form");
        form?.requestSubmit();
      }
    },
    []
  );

  return (
    <div className="w-full container mx-auto mb-20">
      <div className="bg-[#F4ECE4] p-8 md:p-14 shadow-xl flex flex-col gap-2 items-center">
        <p className="font-bold font-mulish text-base text-[#0B3F45] text-center">
          Verificador de contatos oficiais – evite golpes.
        </p>
        <h3 className="text-xl md:text-2xl text-dourado font-semibold text-center font-spectral text-[26px] text-[#C49A49]">
          Alguém da Aliança Divergente entrou em contato com você?
        </h3>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8"
          noValidate
          aria-label="Formulário de verificação de número de telefone"
        >
          <label
            htmlFor="phone-verification"
            className={cn(
              "font-bold font-mulish text-base text-[#0B3F45] text-center",
              "sr-only md:not-sr-only md:block"
            )}
          >
            Verifique nossos números oficiais:
          </label>
          <div className="flex flex-col gap-2 flex-1 max-w-xs">
            <input
              id="phone-verification"
              type="tel"
              inputMode="tel"
              placeholder="(00) 00000-0000"
              value={phoneValue}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              maxLength={15}
              className={cn(
                "p-2 bg-transparent border-b border-[#C49A49] font-mulish",
                "placeholder:text-dourado-velho text-dourado-velho",
                "focus:outline-none focus:border-verde-folha",
                "transition-colors",
                error && "border-red-500"
              )}
              aria-label="Digite o número de telefone para verificação"
              aria-describedby={error ? "phone-error" : undefined}
              aria-invalid={!!error}
              aria-required="true"
              disabled={isSubmitting}
            />
            {error && (
              <span
                id="phone-error"
                className="text-sm text-red-600"
                role="alert"
                aria-live="polite"
              >
                {error}
              </span>
            )}
            {!error && result && (
              <span
                className={cn(
                  "text-sm",
                  result.type === "success" ? "text-green-700" : "text-red-600"
                )}
                role={result.type === "success" ? "status" : "alert"}
                aria-live="polite"
              >
                {result.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !phoneValue.trim()}
            className={cn(
              "border border-[#0B3F45] text-[#0B3F45] font-bold",
              "px-4 py-2 min-w-[120px]",
              "hover:bg-[#0B3F45] hover:text-white",
              "focus-visible:outline-2 focus-visible:outline-[#0B3F45] focus-visible:outline-offset-2",
              "transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "disabled:hover:bg-transparent disabled:hover:text-[#0B3F45]"
            )}
            aria-label="Verificar número de telefone"
          >
            {isSubmitting ? "Verificando..." : "Verificar"}
          </button>
        </form>
      </div>
    </div>
  );
}
