import { Skeleton, Card } from "@heroui/react";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative rounded-3xl overflow-hidden bg-default-100/50 p-8 md:p-12 border border-default-200/60 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Skeleton className="h-4 w-32 rounded-lg bg-default-200" />
            <Skeleton className="h-10 w-4/5 rounded-xl bg-default-300" />
            <Skeleton className="h-6 w-3/4 rounded-lg bg-default-200" />
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Skeleton className="h-12 w-full sm:w-40 rounded-xl bg-primary/30" />
              <Skeleton className="h-12 w-full sm:w-40 rounded-xl bg-default-200" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Skeleton className="w-full h-64 sm:h-80 md:h-96 rounded-2xl bg-default-200" />
          </div>
        </div>
      </section>

      {/* Categories Grid Skeleton */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-48 rounded-lg bg-default-300" />
          <Skeleton className="h-5 w-20 rounded-md bg-default-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-4 space-y-3 rounded-2xl border border-default-100" radius="lg">
              <Skeleton className="w-12 h-12 rounded-xl mx-auto bg-default-200" />
              <Skeleton className="h-4 w-20 rounded-md mx-auto bg-default-200" />
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Skeleton */}
      <section className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56 rounded-lg bg-default-300" />
          <Skeleton className="h-4 w-80 rounded-md bg-default-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="p-4 space-y-4 rounded-2xl border border-default-200/60" radius="lg">
              {/* Product Image Skeleton */}
              <Skeleton className="w-full h-48 rounded-xl bg-default-200" />
              
              {/* Product Info */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-1/3 rounded-md bg-default-200" />
                <Skeleton className="h-5 w-5/6 rounded-lg bg-default-300" />
                <Skeleton className="h-4 w-1/2 rounded-md bg-default-200" />
              </div>

              {/* Price & Action Button Skeleton */}
              <div className="pt-2 flex justify-between items-center">
                <Skeleton className="h-6 w-20 rounded-lg bg-default-300" />
                <Skeleton className="h-9 w-24 rounded-xl bg-primary/20" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}