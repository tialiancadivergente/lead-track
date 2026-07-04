export type PageTemperatureConfig = {
  temperature_abbreviation: string;
  tag_id: string;
  active: boolean;
};

export type PageVersionConfig = {
  id: string;
  abbreviation: string;
  version_number: number;
  template_image_url: string | null;
  template_url: string | null;
  active: boolean;
};

export type PageHeadlineConfig = {
  id: string;
  abbreviation: string;
  content: string;
  position: number;
  active: boolean;
};

export type PageConfigResponse = {
  launch_name: string;
  season_name: string;
  form_version_id: string;
  headlines: PageHeadlineConfig[];
  temperatures: PageTemperatureConfig[];
  versions: PageVersionConfig[];
};
