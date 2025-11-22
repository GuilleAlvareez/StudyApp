import { forwardRef } from "react";

interface PostItProps {
  header: string;
  content: string;
  color: string;
  inclination: string;
}

export const PostIt = forwardRef<HTMLDivElement, PostItProps>(
  ({ header, content, color, inclination }, ref) => {
    const textColor = "#1e293b";

    return (
      <div
        ref={ref}
        className={`w-full min-w-80 h-56 min-h-52 flex flex-col gap-4 p-4 rounded-lg shadow-md overflow-hidden ${inclination}`}
        style={{ backgroundColor: color }}
      >
        <p className="text-lg xl:text-xl font-semibold break-words" style={{ color: textColor }}>{header}</p>
        <div
          className="w-full flex-1 overflow-y-auto focus:outline-none bg-transparent border-none text-sm xl:text-base"
        >
          {content}
        </div>
      </div>
    );
  }
);

PostIt.displayName = "PostIt";
