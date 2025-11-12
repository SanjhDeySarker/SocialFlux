export default function Loader({ size = "md" }) {
  const spinnerSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-10 w-10" : "h-6 w-6";
  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`border-4 border-blue-500 border-t-transparent rounded-full animate-spin ${spinnerSize}`}
      ></div>
    </div>
  );
}
