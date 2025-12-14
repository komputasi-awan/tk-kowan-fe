import api from "@/lib/api";
import { AnalysisData, ApiResponse } from "@/types";

export const cvService = {
  analyze: async (file: File, userId: string, jobDesc: string): Promise<AnalysisData> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);
    formData.append("job_desc", jobDesc);

    const response = await api.post<ApiResponse>("/cv/analyze", formData);

    return response.data.data;
  },
};