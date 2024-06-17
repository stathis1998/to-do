import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export type LoadingStateProps = {
  rows?: number;
  rowClassName?: string;
};

export function LoadingState(props: LoadingStateProps) {
  const { rows = 3, rowClassName } = props;

  return (
    <div className="space-y-2">
      {[...Array(rows)].map((_, index) => (
        <Skeleton key={index} className={cn("w-full h-6", rowClassName)} />
      ))}
    </div>
  );
}
