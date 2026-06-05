import { create } from 'zustand';
import { razors as defaultRazors, type Razor, type Material, type RazorType } from '@/data/razors';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

interface RazorStore {
  // --- data ---
  razors: Razor[];

  // --- filter state ---
  searchQuery: string;
  selectedMaterials: Material[];
  selectedTypes: RazorType[];
  inStockOnly: boolean;

  // --- sort state ---
  sortBy: SortOption;

  // --- derived ---
  filteredRazors: () => Razor[];

  // --- actions ---
  setSearchQuery: (query: string) => void;
  toggleMaterial: (material: Material) => void;
  toggleType: (type: RazorType) => void;
  setInStockOnly: (value: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  toggleSelected: (id: string) => void;
  clearFilters: () => void;
}

export const useRazorStore = create<RazorStore>((set, get) => ({
  // --- data ---
  razors: defaultRazors,

  // --- filter state (all clear by default = show everything) ---
  searchQuery: '',
  selectedMaterials: [],
  selectedTypes: [],
  inStockOnly: false,

  // --- sort ---
  sortBy: 'featured',

  // --- derived: applies search + material + type + inStock + sort ---
  filteredRazors: () => {
    const { razors, searchQuery, selectedMaterials, selectedTypes, inStockOnly, sortBy } = get();

    let result = razors.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(r.material);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(r.type);
      const matchesStock = !inStockOnly || r.inStock;
      return matchesSearch && matchesMaterial && matchesType && matchesStock;
    });

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);

    return result;
  },

  // --- actions ---
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleMaterial: (material) =>
    set((s) => ({
      selectedMaterials: s.selectedMaterials.includes(material)
        ? s.selectedMaterials.filter((m) => m !== material)
        : [...s.selectedMaterials, material],
    })),

  toggleType: (type) =>
    set((s) => ({
      selectedTypes: s.selectedTypes.includes(type)
        ? s.selectedTypes.filter((t) => t !== type)
        : [...s.selectedTypes, type],
    })),

  setInStockOnly: (value) => set({ inStockOnly: value }),

  setSortBy: (sort) => set({ sortBy: sort }),

  toggleSelected: (id) =>
    set((s) => ({
      razors: s.razors.map((r) =>
        r.id === id ? { ...r, selected: !r.selected } : r
      ),
    })),

  clearFilters: () =>
    set({
      searchQuery: '',
      selectedMaterials: [],
      selectedTypes: [],
      inStockOnly: false,
    }),
}));
