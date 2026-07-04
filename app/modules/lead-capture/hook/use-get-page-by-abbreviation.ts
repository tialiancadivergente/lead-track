import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { PageConfigResponse } from "../page-config.model";

export const useGetPageByAbbreviation = () => {
  return useMutation({
    mutationFn: (abbreviation: string) => {
      return axios.get<PageConfigResponse>(
        `/api/page/by-abbreviation/${encodeURIComponent(abbreviation)}`
      );
    },
  });
};
