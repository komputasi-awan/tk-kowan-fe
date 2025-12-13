export interface AiAnalysisResult {
  match_score: number;
  summary: string;
  missing_skills: string[];
  project_recommendation: string;
}

export interface AnalysisData {
  s3_key: string;
  s3_url: string; // Presigned URL for PDF download/view
  parsed_text_preview: string;
  ai_analysis: AiAnalysisResult;
}

export interface ApiResponse {
  status: string;
  data: AnalysisData;
  detail?: string;
}