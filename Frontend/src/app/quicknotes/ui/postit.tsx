export function PostIt({ header, content }: { header: string; content: string }) {
  return (
    <div className="bg-[#fef08a] w-80 h-50 flex flex-col gap-4 p-3 rounded-lg shadow-md">
      <p className="text-xl font-semibold text-slate-800">{header}</p>      
      <textarea className="w-full h-full resize-none overflow-y-auto focus:outline-none" disabled value={content}/>     
      {/* <p className="text-end text-textGray">{site}</p>       */}
    </div>
  );
}
