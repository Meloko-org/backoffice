export function ProgressBar() {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded bg-gray-200">
      <div className="absolute left-0 top-0 h-full w-1/3 animate-progress bg-primary-600" />
    </div>
  );
}
