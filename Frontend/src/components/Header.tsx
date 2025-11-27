export function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col w-full mb-15 lg:mb-15">
      <div className="flex">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          {title}
        </h1>
      </div>
      <p className="text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
