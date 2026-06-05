import FilterPanel from '@/components/FilterPanel/FilterPanel';
import Results from '@/components/Results/Results';

export default function App() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] flex items-center justify-center p-6">
      <div className="w-full max-w-[1120px] h-[1046px] max-h-[calc(100vh-48px)] bg-[#f5f5f4] rounded-2xl p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <h1 className="text-[22px] font-semibold text-[#1a1a1a] leading-7">
            Shop Razors
          </h1>
          <p className="text-[14px] text-[#6b7280] leading-5">
            Precision-engineered safety razors. Filter to find your setting.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
          <FilterPanel />
          <Results />
        </div>

      </div>
    </div>
  );
}
