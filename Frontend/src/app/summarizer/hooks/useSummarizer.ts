import { summarizerService } from "@/app/summarizer/services/SummarizerService";
import { useFileContext } from "@/context/fileContext";

export function useSummarizer() {
  const { setSummaryFile } = useFileContext();

  const summarize = async (file: File) => {
    try {
      const summaryPdf = await summarizerService().summarize(file);
      setSummaryFile(summaryPdf);
      return summaryPdf;
    } catch (error) {
      console.error("Error al resumir:", error);
      throw error;
    }
  }

  return {
    summarize,
  };
}
