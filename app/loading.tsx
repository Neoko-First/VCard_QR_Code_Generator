import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Loader />
    </div>
  );
}
