export default function Loading() {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center"
        aria-label="読み込み中"
      >
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    </>
  );
}
