import { Building2, Home, Hotel, Warehouse, Castle, Building } from 'lucide-react'

const categories = [
  { name: 'Apartments', count: '4,280 listings', icon: Building2 },
  { name: 'Houses', count: '3,150 listings', icon: Home },
  { name: 'Villas', count: '1,020 listings', icon: Castle },
  { name: 'Studios', count: '2,460 listings', icon: Hotel },
  { name: 'Lofts', count: '890 listings', icon: Warehouse },
  { name: 'Condos', count: '1,540 listings', icon: Building },
]

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Browse by type
          </span>
          <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Popular categories
          </h2>
        </div>
        <a
          href="#featured"
          className="text-sm font-semibold text-foreground hover:text-primary"
        >
          View all categories →
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#featured"
            className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <cat.icon className="size-6" />
            </span>
            <div>
              <p className="font-bold text-foreground">{cat.name}</p>
              <p className="text-sm text-muted-foreground">{cat.count}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
