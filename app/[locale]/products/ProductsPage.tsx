"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
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

  const [search, setSearch] = useState("");
  const [selectedAges, setSelectedAges] = useState<AgeCategory[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [sort, setSort] = useState<SortOption>("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const skillParam = searchParams.get("skill");
  const initialSkill = skillParam as SkillCategory | null;

  useEffect(() => {
    if (initialSkill && skillCategories.includes(initialSkill)) {
      setSelectedSkills([initialSkill]);
    }
  }, [initialSkill]);

  const toggleFilter = <T,>(item: T, list: T[], setter: (v: T[]) => void) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedAges([]);
    setSelectedSkills([]);
    setSelectedMaterials([]);
    setPriceRange([0, 250]);
    setSort("newest");
  };

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    if (genderFilter) {
      result = result.filter(
        (p) => p.gender === genderFilter || p.gender === "unisex"
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedAges.length) {
      result = result.filter((p) => selectedAges.includes(p.ageCategory));
    }

    if (selectedSkills.length) {
      result = result.filter((p) => selectedSkills.includes(p.skillCategory));
    }

    if (selectedMaterials.length) {
      result = result.filter((p) => selectedMaterials.includes(p.material));
    }

    result = result.filter((p) => {
      const price = p.discountPrice ?? p.price;
      return price >= priceRange[0] && price <= priceRange[1];
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
    search,
    selectedAges,
    selectedSkills,
    selectedMaterials,
    priceRange,
    sort,
  ]);

  const FilterSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-6">
      <h4 className="font-bold text-sm mb-3">{title}</h4>
      {children}
    </div>
  );

  const FilterCheckbox = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="flex items-center gap-2 py-1.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
      />
      <span className="text-sm group-hover:text-primary transition-colors">
        {label}
      </span>
    </label>
  );

  const filtersPanel = (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{t("filters")}</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          {t("clearFilters")}
        </Button>
      </div>

      <FilterSection title={t("ageCategory")}>
        {ageCategories.map((age) => (
          <FilterCheckbox
            key={age}
            label={tAge(age)}
            checked={selectedAges.includes(age)}
            onChange={() =>
              toggleFilter(age, selectedAges, setSelectedAges)
            }
          />
        ))}
      </FilterSection>

      <FilterSection title={t("skillCategory")}>
        {skillCategories.map((skill) => (
          <FilterCheckbox
            key={skill}
            label={tSkill(skill)}
            checked={selectedSkills.includes(skill)}
            onChange={() =>
              toggleFilter(skill, selectedSkills, setSelectedSkills)
            }
          />
        ))}
      </FilterSection>

      <FilterSection title={t("material")}>
        {materials.map((mat) => (
          <FilterCheckbox
            key={mat}
            label={tMaterials(mat)}
            checked={selectedMaterials.includes(mat)}
            onChange={() =>
              toggleFilter(mat, selectedMaterials, setSelectedMaterials)
            }
          />
        ))}
      </FilterSection>

      <FilterSection title={t("priceRange")}>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full"
            min={0}
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
            min={0}
          />
        </div>
      </FilterSection>
    </div>
  );

  const content = (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
      {!hideHeader && (
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      )}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              {filtersPanel}
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
                  className="h-11 rounded-xl border border-border bg-card px-4 text-sm font-medium cursor-pointer"
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
                {filtersPanel}
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
              <ProductGrid products={filteredProducts} view={view} />
            )}
          </div>
        </div>
    </div>
  );

  if (hideHeader) return content;

  return <PageTransition>{content}</PageTransition>;
}
