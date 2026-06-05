import { useState, useMemo } from 'react';
import { useRazorStore } from '@/stores/razor-store';
import { type Razor } from '@/data/razors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SORT_LABELS = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
} as const;

function RazorCard({ razor }: { razor: Razor }) {
  const [hovered, setHovered] = useState(false);
  const toggleSelected = useRazorStore((s) => s.toggleSelected);

  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl flex flex-col flex-1 min-w-0 cursor-pointer transition-transform duration-200 ease-out"
      style={{
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image placeholder */}
      <div className="bg-[#ececeb] h-[150px] w-full shrink-0 rounded-t-xl overflow-hidden" />

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-[14px]">
        <p className="text-[15px] font-semibold text-[#1a1a1a]">{razor.name}</p>
        <p className="text-[13px] text-[#6b7280]">{razor.material}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-[16px] font-semibold text-[#1a1a1a]">${razor.price}</p>

          <button
            onClick={() => toggleSelected(razor.id)}
            className={
              razor.selected
                ? 'bg-[#1a1a1a] text-white text-[13px] font-medium px-3 py-2 rounded-lg'
                : 'bg-white border border-[#e5e5e5] text-[#1a1a1a] text-[13px] font-medium px-3 py-2 rounded-lg'
            }
          >
            {razor.selected ? '✓ Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  const sortBy = useRazorStore((s) => s.sortBy);
  const setSortBy = useRazorStore((s) => s.setSortBy);
  const filteredRazors = useRazorStore((s) => s.filteredRazors);

  const displayed = filteredRazors();

  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < displayed.length; i += 2) {
      result.push(displayed.slice(i, i + 2));
    }
    return result;
  }, [displayed]);

  return (
    <main className="flex-1 min-w-0 min-h-0 flex flex-col gap-4 overflow-hidden">

      {/* Toolbar — pinned */}
      <div className="flex items-center justify-between shrink-0">
        <p className="text-[15px] font-semibold text-[#1a1a1a]">
          {displayed.length} razors
        </p>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-auto gap-2 bg-white border-[#e5e5e5] text-[13px] font-medium text-[#1a1a1a] rounded-lg px-3 py-2 h-auto shadow-none focus:ring-0">
            <span className="text-[#6b7280] text-[13px] font-normal">Sort:</span>
            <SelectValue>{SORT_LABELS[sortBy]}</SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#e5e5e5] rounded-lg shadow-md">
            <SelectItem value="featured" className="text-[13px] text-[#1a1a1a] focus:bg-[#f5f5f4] focus:text-[#1a1a1a]">Featured</SelectItem>
            <SelectItem value="price-asc" className="text-[13px] text-[#1a1a1a] focus:bg-[#f5f5f4] focus:text-[#1a1a1a]">Price: Low to High</SelectItem>
            <SelectItem value="price-desc" className="text-[13px] text-[#1a1a1a] focus:bg-[#f5f5f4] focus:text-[#1a1a1a]">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Scrollable grid */}
      <div className="overflow-y-auto scrollbar-hide flex-1">
        <div className="flex flex-col gap-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col sm:flex-row gap-4">
              {row.map((razor) => (
                <RazorCard key={razor.id} razor={razor} />
              ))}
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
