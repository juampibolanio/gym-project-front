export function TableSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-surface border border-border-primary rounded"></div>
          <div className="h-4 w-64 bg-surface border border-border-primary rounded mt-1"></div>
        </div>
        <div className="h-10 w-32 bg-brand-surface border border-brand-main/20 rounded"></div>
      </div>

      {/* Search / Filters Area */}
      <div className="flex gap-4 items-center">
        <div className="h-10 flex-1 max-w-md bg-surface border border-border-primary rounded"></div>
        <div className="h-10 w-24 bg-surface border border-border-primary rounded"></div>
      </div>

      {/* Table Area */}
      <div className="bg-surface border border-border-primary rounded-lg overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="flex items-center px-6 py-4 border-b border-border-primary bg-background/50">
          <div className="h-4 w-1/4 bg-border-primary/40 rounded"></div>
          <div className="h-4 w-1/4 bg-border-primary/40 rounded"></div>
          <div className="h-4 w-1/4 bg-border-primary/40 rounded"></div>
          <div className="h-4 w-1/4 bg-border-primary/40 rounded"></div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5, 6].map((row) => (
          <div key={row} className="flex items-center px-6 py-4 border-b border-border-primary/50">
            <div className="w-1/4 flex items-center gap-3">
              <div className="h-10 w-10 bg-border-primary/30 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-border-primary/60 rounded"></div>
                <div className="h-3 w-32 bg-border-primary/30 rounded"></div>
              </div>
            </div>
            <div className="w-1/4">
               <div className="h-4 w-20 bg-border-primary/50 rounded"></div>
            </div>
            <div className="w-1/4">
               <div className="h-6 w-16 bg-border-primary/40 rounded-full"></div>
            </div>
            <div className="w-1/4 flex justify-end gap-2">
               <div className="h-8 w-8 bg-border-primary/30 rounded"></div>
               <div className="h-8 w-8 bg-border-primary/30 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
