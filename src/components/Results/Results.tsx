import { useState } from 'react';
import { useRazorStore } from '@/stores/razor-store';
import { type Razor, type Material, type RazorType } from '@/data/razors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SORT_LABELS = {
  featured:     'Featured',
  'price-asc':  'Price: Low to High',
  'price-desc': 'Price: High to Low',
} as const;

function RazorCard({ razor }: { razor: Razor }) {
  const [hovered, setHovered] = useState(false);
  const toggleSelected = useRazorStore((s) => s.toggleSelected);

  return (
    <div
      className="bg-white border border-[#e5e5e5] rounded-xl flex flex-col overflow-hidden cursor-pointer transition-transform duration-200 ease-out"
      style={{
        transform:  hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow:  hovered ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-[#ececeb] h-[150px] w-full shrink-0 rounded-t-xl" />

      <div className="flex flex-col gap-1.5 p-[14px]">
        <p className="text-[15px] font-semibold text-[#1a1a1a] leading-tight">{razor.name}</p>
        <p className="text-[13px] text-[#6b7280] leading-tight">{razor.material}</p>

        <div className="flex items-center justify-between pt-1">
          <p className="text-[16px] font-semibold text-[#1a1a1a] leading-tight">${razor.price}</p>
          <button
            onClick={(e) => { e.stopPropagation(); toggleSelected(razor.id); }}
            className={
              razor.selected
                ? 'bg-[#1a1a1a] text-white text-[13px] font-medium px-3 py-2 rounded-lg leading-tight'
                : 'bg-white border border-[#e5e5e5] text-[#1a1a1a] text-[13px] font-medium px-3 py-2 rounded-lg leading-tight'
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
  const razors            = useRazorStore((s) => s.razors);
  const searchQuery       = useRazorStore((s) => s.searchQuery);
  const selectedMaterials = useRazorStore((s) => s.selectedMaterials);
  const selectedTypes     = useRazorStore((s) => s.selectedTypes);
  const inStockOnly       = useRazorStore((s) => s.inStockOnly);
  const sortBy            = useRazorStore((s) => s.sortBy);
  const setSortBy         = useRazorStore((s) => s.setSortBy);
  const toggleMaterial    = useRazorStore((s) => s.toggleMaterial);
  const toggleType        = useRazorStore((s) => s.toggleType);
  const setInStockOnly    = useRazorStore((s) => s.setInStockOnly);

  let displayed = razors.filter((r) => {
    const matchesSearch   = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(r.material);
    const matchesType     = selectedTypes.length === 0 || selectedTypes.includes(r.type);
    const matchesStock    = !inStockOnly || r.inStock;
    return matchesSearch && matchesMaterial && matchesType && matchesStock;
  });
  if (sortBy === 'price-asc')  displayed = [...displayed].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') displayed = [...displayed].sort((a, b) => b.price - a.price);

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...selectedMaterials.map((m) => ({ label: m,          onRemove: () => toggleMaterial(m as Material) })),
    ...selectedTypes.map((t)     => ({ label: t,          onRemove: () => toggleType(t as RazorType) })),
    ...(inStockOnly              ? [{ label: 'In stock',  onRemove: () => setInStockOnly(false) }] : []),
  ];

  return (
    <main className="flex-1 min-w-0 min-h-0 flex flex-col gap-4 overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center justify-between shrink-0">
        <p className="text-[15px] font-semibold text-[#1a1a1a]">
          {displayed.length} razors
        </p>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-auto bg-white border border-[#e5e5e5] rounded-[8px] px-[12px] py-[8px] h-auto shadow-none focus:ring-0 flex items-center gap-[8px] [&>svg]:hidden">
            <span className="text-[13px] font-medium text-[#1a1a1a] leading-tight">
              Sort: {SORT_LABELS[sortBy]}
            </span>
            <span className="text-[12px] text-[#6b7280] leading-tight">▾</span>
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#e5e5e5] rounded-lg shadow-md">
            <SelectItem value="featured"   className="text-[13px] text-[#1a1a1a] focus:bg-[#f5f5f4] focus:text-[#1a1a1a]">Featured</SelectItem>
            <SelectItem value="price-asc"  className="text-[13px] text-[#1a1a1a] focus:bg-[#f5f5f4] focus:text-[#1a1a1a]">Price: Low to High</SelectItem>
            <SelectItem value="price-desc" className="text-[13px] text-[#1a1a1a] focus:bg-[#f5f5f4] focus:text-[#1a1a1a]">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 shrink-0">
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              onClick={chip.onRemove}
              className="flex items-center gap-1.5 bg-[#efefee] px-[10px] py-[6px] rounded-full hover:bg-[#e5e5e5] transition-colors"
            >
              <span className="text-[13px] font-medium text-[#1a1a1a] leading-tight">{chip.label}</span>
              <span className="text-[11px] text-[#6b7280] leading-tight">✕</span>
            </button>
          ))}
        </div>
      )}

      {/* Grid — 2 columns, handles odd count naturally */}
      <div className="overflow-y-auto scrollbar-hide flex-1">
        {displayed.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-[14px] text-[#6b7280]">No razors match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {displayed.map((razor) => (
              <RazorCard key={razor.id} razor={razor} />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
