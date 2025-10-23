export const TEMPERATURE_TAG_MAP: Record<string, number> = {
  'q': 120095,
  'm': 120096,
  'f': 120097,
  'o': 120098,
  'org': 120098
};

/**
 * Retorna o ID da tag baseado na temperatura fornecida
 * @param temperature - Valor da temperatura (q, m, f, o)
 * @returns ID numérico da tag ou null se não encontrado
 */
export const getTagIdByTemperature = (temperature: string): number | null => {
  return TEMPERATURE_TAG_MAP[temperature] || null;
};

/**
 * Verifica se uma temperatura é válida
 * @param temperature - Valor da temperatura para verificar
 * @returns true se a temperatura é válida, false caso contrário
 */
export const isValidTemperature = (temperature: string): boolean => {
  return temperature in TEMPERATURE_TAG_MAP;
};

/**
 * Retorna todas as temperaturas válidas
 * @returns Array com todas as temperaturas válidas
 */
export const getValidTemperatures = (): string[] => {
  return Object.keys(TEMPERATURE_TAG_MAP);
};
