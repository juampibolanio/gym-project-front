export function FormSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-64 bg-surface border border-border-primary rounded"></div>
          <div className="h-4 w-80 bg-surface border border-border-primary rounded mt-1"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-24 border border-border-primary rounded bg-transparent"></div>
          <div className="h-9 w-32 bg-border-primary/50 rounded"></div>
        </div>
      </div>

      <div className="border border-border-primary rounded-lg bg-surface flex flex-col p-6 gap-8">
        <div className="flex flex-col gap-6">
          <div className="h-5 w-48 bg-border-primary/80 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-border-primary/40 rounded"></div>
              <div className="h-10 w-full bg-background border border-border-primary/50 rounded"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-border-primary/40 rounded"></div>
              <div className="h-10 w-full bg-background border border-border-primary/50 rounded"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-border-primary/40 rounded"></div>
              <div className="h-10 w-full bg-background border border-border-primary/50 rounded"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-border-primary/40 rounded"></div>
              <div className="h-10 w-full bg-background border border-border-primary/50 rounded"></div>
            </div>
          </div>
        </div>

        <hr className="border-border-primary" />

        <div className="flex flex-col gap-6">
          <div className="h-5 w-48 bg-border-primary/80 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-border-primary/40 rounded"></div>
              <div className="h-10 w-full bg-background border border-border-primary/50 rounded"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-border-primary/40 rounded"></div>
              <div className="h-10 w-full bg-background border border-border-primary/50 rounded"></div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-border-primary/40 rounded"></div>
              <div className="h-3 w-16 bg-border-primary/30 rounded"></div>
            </div>
            <div className="h-24 w-full bg-background border border-border-primary/50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
