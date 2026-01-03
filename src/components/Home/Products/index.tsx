"use client";
import Product from "./Product";
import { useState, useEffect, useMemo, useRef } from "react";
import Checkout from "@/components/Checkout";
import { FaFilter, FaTimes, FaSortAmountDown, FaSortAmountUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Products({ products }: { products: any }) {
  const [filter, setFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [showSuccess, setShowSuccess] = useState(false);

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Debug logging - check what we received
  useEffect(() => {
    console.log("[Products Component] Received products:", {
      isArray: Array.isArray(products),
      length: products?.length || 0,
      safeProductsLength: safeProducts.length,
      firstProduct: safeProducts[0] || null,
    });
    if (safeProducts.length === 0) {
      console.warn("[Products Component] WARNING: No products to display!");
    }
  }, [products, safeProducts]);

  // Get unique tags from all products (normalized to lowercase)
  const uniqueTags = useMemo(
    () =>
      Array.from(
        new Set(
          safeProducts.flatMap((product: any) => 
            (product?.tags || []).map((tag: string) => tag.toLowerCase())
          )
        )
      ),
    [safeProducts]
  );

  const filteredProducts = useMemo(() => {
    let filteredProducts = [...safeProducts];
    if (filter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.category === filter
      );
    }
    if (tagFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product: any) => 
          product.tags && 
          product.tags.map((tag: string) => tag.toLowerCase()).includes(tagFilter.toLowerCase())
      );
    }
    if (priceFilter === "low-to-high") {
      filteredProducts = filteredProducts.sort(
        (a: any, b: any) => a.price - b.price
      );
    } else if (priceFilter === "high-to-low") {
      filteredProducts = filteredProducts.sort(
        (a: any, b: any) => b.price - a.price
      );
    }

    return filteredProducts;
  }, [safeProducts, filter, tagFilter, priceFilter]);

  // Show success message when filters change
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (filter !== "all" || tagFilter !== "all" || priceFilter !== "all") {
      setShowSuccess(true);
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3200); // Slightly longer than animation (3s) to ensure fade-out completes
    } else {
      // Hide immediately if all filters are cleared
      setShowSuccess(false);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [filter, tagFilter, priceFilter]);

  const [isCheckout, setIsCheckout] = useState(false);
  const activeFiltersCount = [filter, tagFilter, priceFilter].filter(f => f !== "all").length;
  const tagsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const clearAllFilters = () => {
    setFilter("all");
    setTagFilter("all");
    setPriceFilter("all");
  };

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (tagsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tagsScrollRef.current;
      const isAtStart = scrollLeft <= 1;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
      
      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);
    }
  };

  // Scroll functions with smooth animation
  const scrollTags = (direction: 'left' | 'right') => {
    if (tagsScrollRef.current) {
      const scrollAmount = 300; // pixels to scroll
      const currentScroll = tagsScrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;
      
      tagsScrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      // Check position after scroll animation completes
      setTimeout(() => {
        checkScrollPosition();
      }, 300);
    }
  };

  // Check scroll position on mount and when tags change
  useEffect(() => {
    // Initial check with slight delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      checkScrollPosition();
    }, 100);
    
    const scrollContainer = tagsScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      
      // Use ResizeObserver to detect content size changes
      const resizeObserver = new ResizeObserver(() => {
        checkScrollPosition();
      });
      resizeObserver.observe(scrollContainer);
      
      return () => {
        clearTimeout(timeoutId);
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
        resizeObserver.disconnect();
      };
    }
    
    return () => clearTimeout(timeoutId);
  }, [uniqueTags]);

  return (
    <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw] py-12 sm:py-16 lg:py-20">
      {isCheckout && (
        <Checkout setIsCheckout={setIsCheckout} isCheckout={isCheckout} />
      )}
      
      {/* Header Section */}
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-gray-300 to-transparent"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          <div className="h-px w-12 bg-gradient-to-l from-gray-300 to-transparent"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-cardo font-bold text-gray-900 leading-tight mb-4">
          Witaj w moim sklepie
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-ubuntu font-light leading-relaxed max-w-2xl">
          Zamów oryginalne obrazy na płótnie, naklejki lub druki
        </p>
      </div>

      {/* Modern Filter Section - Compact Design */}
      <div className="mb-8 sm:mb-10">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500 text-sm" />
            <span className="text-sm font-ubuntu font-medium text-gray-700 uppercase tracking-wider">
              Filtry
            </span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-ubuntu transition-colors duration-200"
            >
              <FaTimes className="text-xs" />
              Wyczyść wszystkie
            </button>
          )}
        </div>

        {/* Compact Filter Row */}
        <div className="space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-ubuntu font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Kategoria
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "Wszystkie" },
                { value: "paintings", label: "Obrazy" },
                { value: "stickers", label: "Naklejki" },
                { value: "prints", label: "Druki" },
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`px-4 py-2 rounded-xl font-ubuntu text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === category.value
                      ? "bg-gradient-to-r from-gray-900 to-black text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter - Horizontally Scrollable with Arrows */}
          {uniqueTags.length > 0 && (
            <div className="relative">
              <label className="block text-xs font-ubuntu font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Tagi
              </label>
              <div className="relative flex items-center">
                {/* Left Arrow */}
                {canScrollLeft && (
                  <button
                    onClick={() => scrollTags('left')}
                    className="absolute left-0 z-10 w-10 flex items-center justify-start pl-2"
                    aria-label="Scroll left"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-900 shadow-lg flex items-center justify-center hover:bg-gray-800 hover:shadow-xl transition-all duration-200">
                      <FaChevronLeft className="text-white text-sm" />
                    </div>
                  </button>
                )}
                
                {/* Scrollable Tags Container */}
                <div 
                  ref={tagsScrollRef}
                  className="overflow-x-auto scrollbar-hide -mx-2 px-2 flex-1"
                  style={{ scrollBehavior: 'smooth' }}
                  onScroll={checkScrollPosition}
                >
                  <div className="flex gap-2 py-2 pr-12" style={{ minWidth: 'max-content' }}>
                    <button
                      onClick={() => setTagFilter("all")}
                      className={`px-4 py-2 rounded-full font-ubuntu text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                        tagFilter === "all"
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      Wszystkie tagi
                    </button>
                    {uniqueTags.map((tag: any) => (
                      <button
                        key={tag}
                        onClick={() => setTagFilter(tagFilter.toLowerCase() === tag.toLowerCase() ? "all" : tag.toLowerCase())}
                        className={`px-4 py-2 rounded-full font-ubuntu text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                          tagFilter.toLowerCase() === tag.toLowerCase()
                            ? "bg-gray-900 text-white shadow-md"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        #{tag.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Arrow */}
                {canScrollRight && (
                  <button
                    onClick={() => scrollTags('right')}
                    className="absolute right-0 z-10 w-10 flex items-center justify-end pr-2"
                    aria-label="Scroll right"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-900 shadow-lg flex items-center justify-center hover:bg-gray-800 hover:shadow-xl transition-all duration-200">
                      <FaChevronRight className="text-white text-sm" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Price Sort - No Label */}
          <div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "Domyślne", icon: null },
                { value: "low-to-high", label: "Od najniższej", icon: <FaSortAmountDown className="ml-1.5" /> },
                { value: "high-to-low", label: "Od najwyższej", icon: <FaSortAmountUp className="ml-1.5" /> },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriceFilter(option.value)}
                  className={`px-4 py-2 rounded-xl font-ubuntu text-sm font-medium transition-all duration-200 flex items-center whitespace-nowrap ${
                    priceFilter === option.value
                      ? "bg-gradient-to-r from-gray-900 to-black text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {option.label}
                  {option.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 sm:right-8 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-xl z-50 font-ubuntu font-medium animate-fade-in-out">
          Filtry zostały zastosowane pomyślnie!
        </div>
      )}

      {/* Products Grid */}
      <div 
        className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 overflow-hidden"
        style={{ columnGap: '1rem' }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any, i) => (
            <div key={product.id || i} className="break-inside-avoid mb-4 w-full">
              <Product
                product={product}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 break-inside-avoid mb-4 text-center">
            <p className="text-gray-600 font-ubuntu text-lg">Brak wyników...</p>
            <p className="text-gray-500 font-ubuntu text-sm mt-2">
              {safeProducts.length === 0 
                ? "Nie znaleziono produktów. Sprawdź połączenie z bazą danych."
                : "Spróbuj zmienić filtry"}
            </p>
            {safeProducts.length === 0 && (
              <p className="text-gray-400 font-ubuntu text-xs mt-2">
                Sprawdź konsolę przeglądarki dla szczegółów.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
