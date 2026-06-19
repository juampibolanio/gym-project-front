export default function MiembrosLoading() {
  return (
    <div className="bg-background flex flex-col gap-6 animate-pulse">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-64 bg-surface border border-border-primary rounded"></div>
          <div className="h-4 w-96 bg-surface border border-border-primary rounded mt-1"></div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-surface border border-border-primary rounded-lg p-1 h-10 w-56"></div>
        </div>
      </div>

      <div className="bg-surface border border-border-primary rounded-lg flex flex-col">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] items-center px-5 py-4 border-b border-border-primary">
          <div className="h-3 w-20 bg-border-primary rounded"></div>
          <div className="h-3 w-16 bg-border-primary rounded"></div>
          <div className="h-3 w-12 bg-border-primary rounded"></div>
          <div className="h-3 w-24 bg-border-primary rounded"></div>
          <div className="h-3 w-32 bg-border-primary rounded"></div>
          <div className="h-3 w-16 bg-border-primary rounded"></div>
        </div>

        <div className="flex flex-col min-h-[300px]">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] items-center px-5 py-5 border-b border-border-primary/50"
            >
              <div className="flex flex-col gap-2.5">
                <div className="h-4 w-32 bg-border-primary/50 rounded"></div>
                <div className="h-3 w-24 bg-border-primary/30 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-border-primary/50 rounded-full"></div>
              <div className="h-4 w-20 bg-border-primary/50 rounded"></div>
              <div className="h-4 w-24 bg-border-primary/50 rounded"></div>
              <div className="h-4 w-24 bg-border-primary/50 rounded"></div>
              <div className="flex gap-3">
                <div className="h-8 w-8 bg-border-primary/50 rounded"></div>
                <div className="h-8 w-8 bg-border-primary/50 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-border-primary">
          <div className="h-4 w-32 bg-border-primary/50 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-border-primary/50 rounded"></div>
            <div className="h-7 w-7 bg-border-primary/50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
