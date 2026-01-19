export const TEMPERATURE_TAG_MAP: Record<string, number> = {
  'q': 120095,
  'm': 120096,
  'f': 120566,
  'o': 120098,
  'org': 120098
};

export const TEMPERATURE_TAG_MAP_ORO: Record<string, string> = {
  'q': '[ORO][NOV25] Quente',
  'm': '[ORO][NOV25] Morno',
  'f': '[ORO][MAR26][FRIO]',
  'o': '[ORO][NOV25] Organico',
  'org': '[ORO][NOV25] Organico'
};

/**
 * Retorna o ID da tag baseado na temperatura fornecida
 * @param temperature - Valor da temperatura (q, m, f, o)
 * @returns ID numérico da tag ou null se não encontrado
 */
export const getTagIdByTemperature = (temperature: string): number | null => {
  return TEMPERATURE_TAG_MAP[temperature] || null;
};

export const getTagByTemperatureOro = (temperature: string): string | null => {
  return TEMPERATURE_TAG_MAP_ORO[temperature] || null;
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
