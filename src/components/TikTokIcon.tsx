export default function TikTokIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.6h-3.05v13.3c0 1.53-1.24 2.78-2.78 2.78a2.78 2.78 0 0 1 0-5.56c.3 0 .59.05.86.13V9.7a5.9 5.9 0 0 0-.86-.06 5.83 5.83 0 1 0 5.83 5.83V8.4a8.9 8.9 0 0 0 5.2 1.67V7.02a5.6 5.6 0 0 1-3.8-1.2Z" />
    </svg>
  );
}
