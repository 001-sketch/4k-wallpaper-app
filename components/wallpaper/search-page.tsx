"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Search, X, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Wallpaper, Category } from "@/lib/db";
import { MasonryGrid } from "./masonry-grid";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SearchPageProps {
  onWallpaperClick: (wallpaper: Wallpaper) => void;
}

type Resolution = "all" | "hd" | "4k" | "5k";
type Orientation = "all" | "landscape" | "portrait";

const resolutionOptions: { value: Resolution; label: string }[] = [
  { value: "all", label: "All" },
  { value: "hd", label: "HD (1080p)" },
  { value: "4k", label: "4K" },
  { value: "5k", label: "5K+" },
];

const orientationOptions: { value: Orientation; label: string }[] = [
  { value: "all", label: "All" },
  { value: "landscape", label: "Landscape" },
  { value: "portrait", label: "Portrait" },
];

const popularSearches = [
  "Nature",
  "Dark",
  "Abstract",
  "Minimal",
  "Space",
  "Sunset",
  "Mountains",
  "Ocean",
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function SearchPage({ onWallpaperClick }: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [resolution, setResolution] = useState<Resolution>("all");
  const [orientation, setOrientation] = useState<Orientation>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Build search URL
  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("search", debouncedQuery);
    if (resolution !== "all") params.set("resolution", resolution);
    if (orientation !== "all") params.set("orientation", orientation);
    if (selectedCategories.length > 0) params.set("category", selectedCategories[0]);
    params.set("limit", "30");
    return `/api/wallpapers?${params.toString()}`;
  };

  // Fetch categories
  const { data: categoriesData } = useSWR(`/api/categories`, fetcher);
  const categories: Category[] = categoriesData?.categories || [];

  // Fetch search results
  const shouldSearch = debouncedQuery || resolution !== "all" || orientation !== "all" || selectedCategories.length > 0;
  const { data: searchData, isLoading } = useSWR(
    shouldSearch ? buildSearchUrl() : null,
    fetcher
  );

  // Fetch default wallpapers when no search
  const { data: defaultData, isLoading: isLoadingDefault } = useSWR(
    !shouldSearch ? `/api/wallpapers?sort=popular&limit=10` : null,
    fetcher
  );

  const searchResults: Wallpaper[] = searchData?.wallpapers || [];
  const defaultWallpapers: Wallpaper[] = defaultData?.wallpapers || [];

  const activeFiltersCount =
    (resolution !== "all" ? 1 : 0) +
    (orientation !== "all" ? 1 : 0) +
    selectedCategories.length;

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setResolution("all");
    setOrientation("all");
    setSelectedCategories([]);
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <header className="px-4 pt-4 pb-4 safe-top sticky top-0 z-40 bg-background/80 backdrop-blur-lg">
        <h1 className="text-xl font-bold text-foreground mb-4">Search</h1>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search wallpapers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Search wallpapers"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Filters button */}
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-11 w-11 rounded-xl border-border relative",
                  activeFiltersCount > 0 && "border-primary"
                )}
                aria-label={`Filters${activeFiltersCount > 0 ? ` (${activeFiltersCount} active)` : ""}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-bg text-[10px] font-bold flex items-center justify-center text-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle>Filters</SheetTitle>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-primary"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              </SheetHeader>

              <div className="space-y-6 pb-6">
                {/* Resolution */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Resolution
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resolutionOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setResolution(option.value)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm transition-all",
                          resolution === option.value
                            ? "gradient-bg text-foreground"
                            : "bg-secondary text-muted-foreground"
                        )}
                        aria-pressed={resolution === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orientation */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Orientation
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {orientationOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setOrientation(option.value)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm transition-all",
                          orientation === option.value
                            ? "gradient-bg text-foreground"
                            : "bg-secondary text-muted-foreground"
                        )}
                        aria-pressed={orientation === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const isSelected = selectedCategories.includes(
                        category.slug
                      );
                      return (
                        <button
                          key={category.id}
                          onClick={() => toggleCategory(category.slug)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all",
                            isSelected
                              ? "gradient-bg text-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}
                          aria-pressed={isSelected}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Button
                className="w-full gradient-bg rounded-xl h-12"
                onClick={() => setIsFiltersOpen(false)}
              >
                Show {searchResults.length} results
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Content */}
      {!shouldSearch ? (
        /* Popular searches when empty */
        <div className="px-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Popular Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          <h2 className="text-sm font-medium text-muted-foreground mt-8 mb-3">
            Browse All
          </h2>
          <MasonryGrid
            wallpapers={defaultWallpapers}
            onWallpaperClick={onWallpaperClick}
            isLoading={isLoadingDefault}
          />
        </div>
      ) : (
        /* Search results */
        <div>
          <div className="px-4 mb-4">
            <p className="text-sm text-muted-foreground">
              {searchResults.length} results
              {debouncedQuery && ` for "${debouncedQuery}"`}
            </p>
          </div>

          {searchResults.length > 0 || isLoading ? (
            <MasonryGrid
              wallpapers={searchResults}
              onWallpaperClick={onWallpaperClick}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No results found
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
