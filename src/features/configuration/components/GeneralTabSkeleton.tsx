export function GeneralTabSkeleton({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 animate-pulse">
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
      
      {isAdmin && (
        <div className="mt-8 flex justify-end">
          <div className="h-10 w-40 bg-border-primary/60 rounded-sm"></div>
        </div>
      )}
    </div>
  );
}
