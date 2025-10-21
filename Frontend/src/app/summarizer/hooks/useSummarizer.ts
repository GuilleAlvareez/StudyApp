import { summarizerService } from "@/app/summarizer/services/SummarizerService";
import { useFileContext } from "@/context/fileContext";
import { useState } from "react";

export function useSummarizer() {
  const { setSummaryFile } = useFileContext();
  const [loading, setLoading] = useState(false);

  const summarize = async (file: File) => {
    try {
      setLoading(true);
      const summaryPdf = await summarizerService().summarize(file);
      setSummaryFile(summaryPdf);
      setLoading(false);
      return summaryPdf;
    } catch (error) {
      console.error("Error al resumir:", error);
      throw error;
    }
  }

  return {
    summarize, loading,
  };
}
