'use client'
// import { useFile } from "@/app/summarizer/hooks/useFile";
import React, { createContext, useContext, useState, useRef } from "react";

interface FileContextType {
  file: File | null;
  summaryFile: File | null;
  isDragging: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  MAX_FILE_SIZE: number;
  error: string;
  pressInput: () => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  setSummaryFile: (file: File | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  // const fileContext = useFile();

  const [file, setFile] = useState<File | null>(null);
  const [summaryFile, setSummaryFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

  const [error, setError] = useState<string>('');

  const pressInput = () => {
    setError('')
    inputRef.current?.click();
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const dt = e.dataTransfer;
    if (dt.files && dt.files.length > 0) {
      const droppedFile = dt.files[0];

      if (droppedFile.type !== "application/pdf") {
        setError("Solo se permiten archivos PDF");
        dt.clearData();
        return;
      }

      if (droppedFile.size > MAX_FILE_SIZE) {
        setError("El archivo supera el límite de 10MB");
        dt.clearData();
        return;
      }
      
      setError('');
      setFile(droppedFile);
      dt.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("El archivo supera el límite de 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setSummaryFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const value = {
    file,
    summaryFile,
    isDragging,
    inputRef,
    MAX_FILE_SIZE,
    error,
    pressInput,
    onDragEnter,
    onDragOver,
    onDragLeave,
    handleDrop,
    handleFileChange,
    removeFile,
    setSummaryFile,
  };

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
