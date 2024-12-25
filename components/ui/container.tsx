import { cn } from "@/lib/utils";
import React from "react";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center", className)}
    {...props}
  >
    <div className="w-[95%] sm:w-[95%] md:w-[80%] lg:w-[70%] xl:w-[70%] 2xl:w-[70%] h-full">
      {props.children}
    </div>
  </div>
));
Container.displayName = "Container";

export { Container };
