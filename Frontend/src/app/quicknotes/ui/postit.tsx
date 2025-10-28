interface PostItProps {
  header: string;
  content: string;
  color: string;
}

export function PostIt({ header, content, color }: PostItProps) {
  return (
    <div className="w-full h-64 flex flex-col gap-4 p-4 rounded-lg shadow-md" style={{ backgroundColor: color }}>
      <p className="text-lg font-semibold text-slate-800 line-clamp-2">{header}</p>      
      <textarea 
        className="w-full flex-1 resize-none overflow-y-auto focus:outline-none bg-transparent text-sm" 
        disabled 
        value={content}
      />     
    </div>
  );
}
