import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export function NotFoundPage() {
  return (
    <main className="section-wrap min-h-[80vh] flex flex-col items-center justify-center text-center py-24">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-line bg-surface mb-6 text-accent">
        <Compass size={28} />
      </div>
      <span className="eyebrow">ERROR 404 / UNKNOWN ROUTE</span>
      <h1 className="text-4xl sm:text-6xl font-serif text-ink mt-3 mb-4 tracking-tight">
        Coordinate not found<span>.</span>
      </h1>
      <p className="text-muted max-w-md mb-8 leading-relaxed text-sm sm:text-base">
        The requested pathway does not exist in the digital matrix. Let&apos;s navigate back to the primary engineering interface.
      </p>
      <Link
        className="button button--primary inline-flex items-center gap-2"
        to="/"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </main>
  )
}
