export function CardSkeleton() {
  return (
    <div className="animate-pulse block relative bg-white overflow-hidden h-full rounded-lg">
      <div className="h-32 bg-slate-400 rounded"></div>
      <div className="p-5 space-y-5">
        <div className="h-3 bg-slate-200 rounded w-20"></div>
        <div className="h-4 bg-slate-200 rounded w-32"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
        <div className="h-6 bg-slate-200 rounded w-28"></div>
        <div className="flex flex-wrap gap-1">
          <span className="h-3 bg-slate-200 rounded w-9"></span>
          <span className="h-3 bg-slate-200 rounded w-9"></span>
          <span className="h-3 bg-slate-200 rounded w-9"></span>
          <span className="h-3 bg-slate-200 rounded w-9"></span>
          <span className="h-3 bg-slate-200 rounded w-9"></span>
          <span className="h-3 bg-slate-200 rounded w-9"></span>
        </div>
      </div>
    </div>
  );
}
