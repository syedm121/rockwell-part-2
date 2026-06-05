import { useRazorStore } from '@/stores/razor-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import type { Material, RazorType } from '@/data/razors';

const MATERIALS: Material[] = ['Chrome', 'Gunmetal', 'White Chrome', 'Rose Gold'];
const TYPES: RazorType[] = ['Adjustable', 'Fixed'];

export default function FilterPanel() {
  const searchQuery      = useRazorStore((s) => s.searchQuery);
  const selectedMaterials = useRazorStore((s) => s.selectedMaterials);
  const selectedTypes    = useRazorStore((s) => s.selectedTypes);
  const inStockOnly      = useRazorStore((s) => s.inStockOnly);
  const setSearchQuery   = useRazorStore((s) => s.setSearchQuery);
  const toggleMaterial   = useRazorStore((s) => s.toggleMaterial);
  const toggleType       = useRazorStore((s) => s.toggleType);
  const setInStockOnly   = useRazorStore((s) => s.setInStockOnly);
  const clearFilters     = useRazorStore((s) => s.clearFilters);

  return (
    <aside className="bg-white border border-[#e5e5e5] rounded-xl p-4 w-[280px] h-[424px] shrink-0 flex flex-col gap-6">

      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-semibold text-[#1a1a1a] leading-tight">Filters</span>
        <button
          onClick={clearFilters}
          className="text-[13px] font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors leading-tight"
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search razors"
        className="bg-[#f9f9f8] border-[#e5e5e5] rounded-md h-[37px] text-[14px] text-[#1a1a1a] placeholder:text-[#6b7280] focus-visible:ring-0 focus-visible:border-[#1a1a1a] transition-colors"
      />

      {/* Material */}
      <div className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold text-[#6b7280] tracking-[0.72px] leading-tight">MATERIAL</span>
        <div className="flex flex-col gap-3">
          {MATERIALS?.map((material) => (
            <label key={material} className="flex items-center gap-2.5 cursor-pointer">
              <Checkbox
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleMaterial(material)}
                className="size-[18px] rounded-[4px] border-[1.5px] border-[#e5e5e5]
                  data-[state=checked]:bg-[#1a1a1a]
                  data-[state=checked]:border-[#1a1a1a]
                  data-[state=checked]:text-white
                  focus-visible:ring-0"
              />
              <span className="text-[14px] text-[#1a1a1a] leading-tight">{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold text-[#6b7280] tracking-[0.72px] leading-tight">TYPE</span>
        <div className="flex flex-col gap-3">
          {TYPES?.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer">
              <Checkbox
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
                className="size-[18px] rounded-[4px] border-[1.5px] border-[#e5e5e5]
                  data-[state=checked]:bg-[#1a1a1a]
                  data-[state=checked]:border-[#1a1a1a]
                  data-[state=checked]:text-white
                  focus-visible:ring-0"
              />
              <span className="text-[14px] text-[#1a1a1a] leading-tight">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In stock toggle */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] text-[#1a1a1a] leading-tight">In stock only</span>
        <Switch
          checked={inStockOnly}
          onCheckedChange={setInStockOnly}
          className="data-[state=checked]:bg-[#1a1a1a] data-[state=unchecked]:bg-[#e5e5e5] h-[22px] w-[38px]"
        />
      </div>

    </aside>
  );
}
