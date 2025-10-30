import { forwardRef } from "react";

interface PostItProps {
  header: string;
  content: string;
  color: string;
}

export const PostIt = forwardRef<HTMLDivElement, PostItProps>(
  ({ header, content, color }, ref) => {
    const textColor = "#1e293b";

    return (
      <div
        ref={ref} // Asignamos la ref al div principal
        className="w-80 h-60 min-h-52 flex flex-col gap-4 p-4 rounded-lg shadow-md overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <p className="text-xl font-semibold break-words" style={{ color: textColor }}>{header}</p>
        <div
          className="w-full flex-1 overflow-y-auto focus:outline-none bg-transparent border-none "
        >
          {content}
        </div>
      </div>
    );
  }
);

PostIt.displayName = "PostIt";
