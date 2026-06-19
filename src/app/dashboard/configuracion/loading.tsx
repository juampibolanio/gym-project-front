export default function ConfiguracionLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-surface border border-border-primary rounded"></div>
          <div className="h-4 w-64 bg-surface border border-border-primary rounded mt-1"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          <div className="h-11 w-full bg-surface border border-border-primary/50 rounded-lg"></div>
          <div className="h-11 w-full bg-surface/50 border border-border-primary/30 rounded-lg"></div>
        </div>

        <div className="flex-1 bg-surface border border-border-primary rounded-xl p-6 md:p-8 flex flex-col gap-8">
          <div>
            <div className="h-6 w-56 bg-border-primary/80 rounded mb-2"></div>
            <div className="h-4 w-80 bg-border-primary/40 rounded mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-border-primary/40 rounded"></div>
                <div className="h-10 w-full bg-background border border-border-primary/50 rounded-md"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-border-primary/40 rounded"></div>
                <div className="h-10 w-full bg-background border border-border-primary/50 rounded-md"></div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <div className="h-4 w-24 bg-border-primary/40 rounded"></div>
                <div className="h-10 w-full bg-background border border-border-primary/50 rounded-md"></div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <div className="h-10 w-40 bg-border-primary/60 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
