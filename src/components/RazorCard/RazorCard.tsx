import { useState } from 'react';
import { useRazorStore } from '@/stores/razor-store';
import { type Razor } from '@/data/razors';

export default function RazorCard({ razor }: { razor: Razor }) {
  const [hovered, setHovered] = useState(false);
  const toggleSelected = useRazorStore((s) => s.toggleSelected);

  return (
    <div
      className={`bg-white border border-[#e5e5e5] rounded-xl flex flex-col overflow-hidden transition-transform duration-200 ease-out ${
        razor.inStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 grayscale-[30%]'
      }`}
      style={{
        transform: razor.inStock && hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: razor.inStock && hovered ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
      }}
      onMouseEnter={() => { if (razor.inStock) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-[#ececeb] h-[150px] w-full shrink-0 rounded-t-xl" />

      <div className="flex flex-col gap-1.5 p-[14px]">
        <p className="text-[15px] font-semibold text-[#1a1a1a] leading-tight">{razor.name}</p>
        <p className="text-[13px] text-[#6b7280] leading-tight">{razor.material}</p>

        <div className="flex items-center justify-between pt-1">
          <p className="text-[16px] font-semibold text-[#1a1a1a] leading-tight">${razor.price}</p>

          {razor.inStock ? (
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
          ) : (
            <span className="text-[13px] font-medium text-[#6b7280] leading-tight">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
