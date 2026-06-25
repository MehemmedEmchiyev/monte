"use client";

import { useState, useMemo, useEffect, type Dispatch, type SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products, getProductPriceBounds } from "@/data/products";
import {
  AgeCategory,
  SkillCategory,
  Material,
  SortOption,
  Product,
} from "@/types";
import {
  HiMagnifyingGlass,
  HiSquares2X2,
  HiListBullet,
  HiFunnel,
  HiXMark,
} from "react-icons/hi2";

const ageCategories: AgeCategory[] = [
  "0-6-months",
  "6-12-months",
  "1-3-years",
  "3-6-years",
];

const skillCategories: SkillCategory[] = [
  "fine-motor",
  "gross-motor",
  "sensory",
  "language",
  "math",
  "logic",
];

const materials: Material[] = ["wood", "cotton", "wool", "eco-friendly"];

const sortOptions: SortOption[] = [
  "price-low",
  "price-high",
  "rating",
  "newest",
];

const priceBounds = getProductPriceBounds();

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h4 className="font-bold text-sm mb-3">{title}</h4>
      {children}
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2.5 py-1.5 px-2 -mx-2 rounded-lg cursor-pointer transition-colors",
        checked ? "bg-primary/10" : "hover:bg-muted/60"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded border-2 border-border accent-primary cursor-pointer"
      />
      <span
        className={cn(
          "text-sm transition-colors",
          checked ? "text-primary font-medium" : "text-foreground"
        )}
      >
        {label}
      </span>
    </label>
  );
}

interface FiltersPanelProps {
  clearLabel: string;
  filtersLabel: string;
  ageLabel: string;
  skillLabel: string;
  materialLabel: string;
  priceLabel: string;
  hasActiveFilters: boolean;
  selectedAges: AgeCategory[];
  selectedSkills: SkillCategory[];
  selectedMaterials: Material[];
  priceRange: [number, number];
  onClear: () => void;
  onToggleAge: (age: AgeCategory) => void;
  onToggleSkill: (skill: SkillCategory) => void;
  onToggleMaterial: (material: Material) => void;
  onPriceChange: (index: 0 | 1, value: string) => void;
  tAge: (key: AgeCategory) => string;
  tSkill: (key: SkillCategory) => string;
  tMaterials: (key: Material) => string;
}

function FiltersPanel({
  clearLabel,
  filtersLabel,
  ageLabel,
  skillLabel,
  materialLabel,
  priceLabel,
  hasActiveFilters,
  selectedAges,
  selectedSkills,
  selectedMaterials,
  priceRange,
  onClear,
  onToggleAge,
  onToggleSkill,
  onToggleMaterial,
  onPriceChange,
  tAge,
  tSkill,
  tMaterials,
}: FiltersPanelProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{filtersLabel}</h3>
        <Button variant="ghost" size="sm" onClick={onClear} disabled={!hasActiveFilters}>
          {clearLabel}
        </Button>
      </div>

      <FilterSection title={ageLabel}>
        {ageCategories.map((age) => (
          <FilterCheckbox
            key={age}
            label={tAge(age)}
            checked={selectedAges.includes(age)}
            onChange={() => onToggleAge(age)}
          />
        ))}
      </FilterSection>

      <FilterSection title={skillLabel}>
        {skillCategories.map((skill) => (
          <FilterCheckbox
            key={skill}
            label={tSkill(skill)}
            checked={selectedSkills.includes(skill)}
            onChange={() => onToggleSkill(skill)}
          />
        ))}
      </FilterSection>

      <FilterSection title={materialLabel}>
        {materials.map((mat) => (
          <FilterCheckbox
            key={mat}
            label={tMaterials(mat)}
            checked={selectedMaterials.includes(mat)}
            onChange={() => onToggleMaterial(mat)}
          />
        ))}
      </FilterSection>

      <FilterSection title={priceLabel}>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) => onPriceChange(0, e.target.value)}
            className="w-full"
            min={priceBounds.min}
            max={priceBounds.max}
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) => onPriceChange(1, e.target.value)}
            className="w-full"
            min={priceBounds.min}
            max={priceBounds.max}
          />
        </div>
      </FilterSection>
    </div>
  );
}

interface ProductsPageProps {
  genderFilter?: "boys" | "girls";
  hideHeader?: boolean;
}

export default function ProductsPage({ genderFilter, hideHeader }: ProductsPageProps) {
  const t = useTranslations("products");
  const tAge = useTranslations("age");
  const tSkill = useTranslations("skill");
  const tMaterials = useTranslations("materials");
  const tSort = useTranslations("sort");
  const searchParams = useSearchParams();

  const skillParam = searchParams.get("skill");
  const materialParam = searchParams.get("material");
  const filterParam = searchParams.get("filter");

  const [search, setSearch] = useState("");
  const [selectedAges, setSelectedAges] = useState<AgeCategory[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceBounds.min,
    priceBounds.max,
  ]);
  const [sort, setSort] = useState<SortOption>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  useEffect(() => {
    if (skillParam && skillCategories.includes(skillParam as SkillCategory)) {
      setSelectedSkills([skillParam as SkillCategory]);
    }
    if (materialParam && materials.includes(materialParam as Material)) {
      setSelectedMaterials([materialParam as Material]);
    }
    if (filterParam === "new") {
      setOnlyNew(true);
    }
  }, [skillParam, materialParam, filterParam]);

  const toggleFilter = <T,>(
    item: T,
    setter: Dispatch<SetStateAction<T[]>>
  ) => {
    setter((current) =>
      current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedAges([]);
    setSelectedSkills([]);
    setSelectedMaterials([]);
    setPriceRange([priceBounds.min, priceBounds.max]);
    setSort("newest");
    setOnlyNew(false);
  };

  const updatePriceBound = (index: 0 | 1, rawValue: string) => {
    const parsed = rawValue === "" ? null : Number(rawValue);
    setPriceRange((current) => {
      const next: [number, number] = [...current] as [number, number];
      next[index] =
        parsed === null || Number.isNaN(parsed)
          ? index === 0
            ? priceBounds.min
            : priceBounds.max
          : parsed;
      return next;
    });
  };

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = [
      Math.min(priceRange[0], priceRange[1]),
      Math.max(priceRange[0], priceRange[1]),
    ];

    let result: Product[] = [...products];

    if (genderFilter) {
      result = result.filter(
        (p) => p.gender === genderFilter || p.gender === "unisex"
      );
    }

    if (onlyNew) {
      result = result.filter((p) => p.isNew);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedAges.length > 0) {
      result = result.filter((p) => selectedAges.includes(p.ageCategory));
    }

    if (selectedSkills.length > 0) {
      result = result.filter((p) => selectedSkills.includes(p.skillCategory));
    }

    if (selectedMaterials.length > 0) {
      result = result.filter((p) => selectedMaterials.includes(p.material));
    }

    result = result.filter((p) => {
      const price = p.discountPrice ?? p.price;
      return price >= minPrice && price <= maxPrice;
    });

    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) =>
            (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) =>
            (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [
    genderFilter,
    onlyNew,
    search,
    selectedAges,
    selectedSkills,
    selectedMaterials,
    priceRange,
    sort,
  ]);

  const hasActiveFilters =
    Boolean(search.trim()) ||
    selectedAges.length > 0 ||
    selectedSkills.length > 0 ||
    selectedMaterials.length > 0 ||
    onlyNew ||
    priceRange[0] !== priceBounds.min ||
    priceRange[1] !== priceBounds.max;

  const filterKey = [
    selectedAges.join(","),
    selectedSkills.join(","),
    selectedMaterials.join(","),
    search,
    onlyNew,
    priceRange.join(","),
    sort,
  ].join("|");

  const filtersPanelProps: FiltersPanelProps = {
    clearLabel: t("clearFilters"),
    filtersLabel: t("filters"),
    ageLabel: t("ageCategory"),
    skillLabel: t("skillCategory"),
    materialLabel: t("material"),
    priceLabel: t("priceRange"),
    hasActiveFilters,
    selectedAges,
    selectedSkills,
    selectedMaterials,
    priceRange,
    onClear: clearFilters,
    onToggleAge: (age) => toggleFilter(age, setSelectedAges),
    onToggleSkill: (skill) => toggleFilter(skill, setSelectedSkills),
    onToggleMaterial: (material) => toggleFilter(material, setSelectedMaterials),
    onPriceChange: updatePriceBound,
    tAge,
    tSkill,
    tMaterials,
  };

  const content = (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
      {!hideHeader && (
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      )}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              <FiltersPanel {...filtersPanelProps} />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t("search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="h-11 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {tSort(opt === "price-low" ? "priceLow" : opt === "price-high" ? "priceHigh" : opt)}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "bg-primary/10 border-primary" : ""}
                >
                  <HiSquares2X2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setView("list")}
                  className={view === "list" ? "bg-primary/10 border-primary" : ""}
                >
                  <HiListBullet className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  {showFilters ? (
                    <HiXMark className="h-5 w-5" />
                  ) : (
                    <HiFunnel className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="lg:hidden rounded-2xl border border-border bg-card p-6 mb-6"
              >
                <FiltersPanel {...filtersPanelProps} />
              </motion.div>
            )}

            <p className="text-sm text-muted-foreground mb-6">
              {t("results", { count: filteredProducts.length })}
            </p>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">{t("noResults")}</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  {t("clearFilters")}
                </Button>
              </div>
            ) : (
              <ProductGrid
                key={filterKey}
                products={filteredProducts}
                view={view}
              />
            )}
          </div>
        </div>
    </div>
  );

  if (hideHeader) return content;

  return <PageTransition>{content}</PageTransition>;
}
