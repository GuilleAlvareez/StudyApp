import { summarizerService } from "@/app/summarizer/services/SummarizerService";

export function useSummarizer() {
  const summarize = async (file: File) => {
    return await summarizerService().summarize(file);
  }

  return {
    summarize,
  };
}