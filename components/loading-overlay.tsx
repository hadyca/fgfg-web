import Spinner from "./ui/spinner";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <Spinner />
    </div>
  );
}
