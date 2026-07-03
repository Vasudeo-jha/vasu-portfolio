export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 rounded-full border-4 border-white/10" />
        
        {/* Spinning Ring */}
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin" />
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
