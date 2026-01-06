import { useState, useEffect, useMemo, useRef } from "react";

// Destination data with monthly prices (in BRL)
const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "França",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    description: "Cidade da Luz e do Romance",
    monthlyPrices: {
      flights: [2250, 2100, 1900, 1750, 2000, 2600, 3400, 3600, 2400, 1950, 1800, 2400],
      hotels: [900, 800, 750, 700, 825, 1000, 1400, 1500, 950, 775, 725, 975]
    }
  },
  {
    id: 2,
    name: "Tóquio",
    country: "Japão",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    description: "Onde Tradição Encontra o Futuro",
    monthlyPrices: {
      flights: [4450, 4250, 3900, 4100, 4500, 4750, 5500, 5750, 4400, 4050, 3950, 4600],
      hotels: [750, 700, 650, 675, 775, 900, 1100, 1200, 850, 725, 675, 825]
    }
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonésia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    description: "Ilha dos Deuses",
    monthlyPrices: {
      flights: [3600, 3400, 3250, 3000, 2900, 3100, 3750, 4000, 3450, 3200, 3050, 3500],
      hotels: [425, 400, 375, 350, 340, 410, 600, 700, 475, 390, 360, 450]
    }
  },
  {
    id: 4,
    name: "Nova York",
    country: "EUA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    description: "A Cidade Que Nunca Dorme",
    monthlyPrices: {
      flights: [1900, 1750, 1600, 1700, 1950, 2250, 2600, 2700, 2100, 1800, 1700, 2000],
      hotels: [1250, 1150, 1050, 1100, 1300, 1500, 1750, 1900, 1450, 1200, 1125, 1400]
    }
  },
  {
    id: 5,
    name: "Santorini",
    country: "Grécia",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    description: "Paraíso do Mar Egeu",
    monthlyPrices: {
      flights: [1600, 1450, 1350, 1500, 1900, 2250, 2900, 3100, 2100, 1650, 1400, 1750],
      hotels: [600, 500, 450, 550, 900, 1400, 1900, 2100, 1250, 700, 525, 650]
    }
  },
  {
    id: 6,
    name: "Dubai",
    country: "Emirados Árabes",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    description: "Cidade de Ouro",
    monthlyPrices: {
      flights: [2400, 2100, 1950, 2050, 2250, 2600, 3100, 3400, 2500, 2150, 2000, 2750],
      hotels: [1000, 900, 800, 850, 950, 1200, 900, 1000, 1050, 925, 825, 1100]
    }
  },
  {
    id: 7,
    name: "Maldivas",
    country: "Maldivas",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    description: "Paraíso Tropical",
    monthlyPrices: {
      flights: [4750, 4400, 4100, 3950, 4250, 4600, 5250, 5500, 4500, 4200, 4000, 4900],
      hotels: [2250, 1900, 1600, 1500, 1750, 2100, 2750, 3000, 2400, 2000, 1700, 2400]
    }
  },
  {
    id: 8,
    name: "Barcelona",
    country: "Espanha",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    description: "Arte e Arquitetura",
    monthlyPrices: {
      flights: [1900, 1700, 1550, 1650, 1950, 2400, 2900, 3100, 2250, 1800, 1600, 2000],
      hotels: [700, 600, 550, 625, 800, 1000, 1300, 1450, 900, 675, 575, 750]
    }
  }
];

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showMobileAutocomplete, setShowMobileAutocomplete] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
        setShowMobileAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return destinations;
    const query = searchQuery.toLowerCase();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSelectSuggestion = (destination: typeof destinations[0]) => {
    setSearchQuery(destination.name);
    setShowAutocomplete(false);
    setShowMobileAutocomplete(false);
    setSelectedDestination(destination);
    setShowPriceComparison(true);
  };

  const getMinPrice = (prices: number[]) => Math.min(...prices);
  const getMaxPrice = (prices: number[]) => Math.max(...prices);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <span className="text-white font-bold text-lg tracking-tight">V1</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">Viagens</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#destinations" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Destinos</a>
            <a href="#compare" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Comparar Preços</a>
            <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5">
              Reservar
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-50 transition-colors"
            aria-label="Abrir menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45 translate-x-px' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45 translate-x-px' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 md:hidden shadow-2xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                <span className="text-white font-bold text-lg tracking-tight">V1</span>
              </div>
              <span className="text-xl font-semibold text-gray-900 tracking-tight">Viagens</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-50 transition-colors"
              aria-label="Fechar menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-6 border-b border-emerald-100">
            <div className="relative" ref={mobileSearchRef}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar destinos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowMobileAutocomplete(e.target.value.length > 0);
                }}
                onFocus={() => searchQuery.length > 0 && setShowMobileAutocomplete(true)}
                className="w-full pl-12 pr-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl outline-none focus:border-emerald-300 transition-colors text-gray-700 placeholder:text-gray-400"
              />
              
              {/* Mobile Autocomplete Dropdown */}
              {showMobileAutocomplete && autocompleteSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-emerald-100 overflow-hidden z-50 animate-slideUp">
                  {autocompleteSuggestions.map((destination) => (
                    <button
                      key={destination.id}
                      onClick={() => {
                        handleSelectSuggestion(destination);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-emerald-50 transition-colors text-left"
                    >
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-500">{destination.country}</div>
                      </div>
                      <div className="ml-auto text-emerald-600 font-semibold text-sm">
                        R$ {formatPrice(getMinPrice(destination.monthlyPrices.flights))}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              <li>
                <a 
                  href="#destinations" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <span className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-xl text-lg group-hover:bg-emerald-200 transition-colors">🌍</span>
                  <div>
                    <span className="text-gray-900 font-medium block">Destinos</span>
                    <span className="text-gray-500 text-sm">Explore lugares populares</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="#compare" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <span className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-xl text-lg group-hover:bg-emerald-200 transition-colors">📊</span>
                  <div>
                    <span className="text-gray-900 font-medium block">Comparar Preços</span>
                    <span className="text-gray-500 text-sm">Encontre as melhores ofertas</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <span className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-xl text-lg group-hover:bg-emerald-200 transition-colors">✈️</span>
                  <div>
                    <span className="text-gray-900 font-medium block">Voos</span>
                    <span className="text-gray-500 text-sm">Reserve sua viagem</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <span className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-xl text-lg group-hover:bg-emerald-200 transition-colors">🏨</span>
                  <div>
                    <span className="text-gray-900 font-medium block">Hotéis</span>
                    <span className="text-gray-500 text-sm">Encontre hospedagens</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-emerald-100">
            <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-200">
              Reservar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-100/50 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] animate-float">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-emerald-100/50 flex items-center justify-center text-2xl">✈️</div>
          </div>
          <div className="absolute top-[25%] right-[15%] animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="w-14 h-14 rounded-xl bg-white shadow-xl shadow-emerald-100/50 flex items-center justify-center text-xl">🏨</div>
          </div>
          <div className="absolute bottom-[30%] left-[8%] animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 rounded-xl bg-white shadow-xl shadow-emerald-100/50 flex items-center justify-center text-xl">🌴</div>
          </div>
          <div className="absolute bottom-[25%] right-[12%] animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-emerald-100/50 flex items-center justify-center text-2xl">🗺️</div>
          </div>
        </div>

        <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-medium text-sm mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Encontre as melhores ofertas de viagem
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Descubra Sua Próxima
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Aventura
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Compare voos e hotéis ao longo de 12 meses. Encontre o momento perfeito para viajar pelo melhor preço.
          </p>

          {/* Search Bar */}
          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group" ref={searchRef}>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-emerald-100/50 overflow-visible">
                <div className="pl-6 text-emerald-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Para onde você quer ir?"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowAutocomplete(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery.length > 0 && setShowAutocomplete(true)}
                  className="flex-1 px-4 py-5 text-lg outline-none placeholder:text-gray-400"
                />
                <button className="m-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg">
                  Buscar
                </button>
              </div>
              
              {/* Autocomplete Dropdown */}
              {showAutocomplete && autocompleteSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-50 animate-slideUp">
                  {autocompleteSuggestions.map((destination) => (
                    <button
                      key={destination.id}
                      onClick={() => handleSelectSuggestion(destination)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50 transition-colors text-left group"
                    >
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-500">{destination.country}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 font-bold">R$ {formatPrice(getMinPrice(destination.monthlyPrices.flights))}</div>
                        <div className="text-xs text-gray-400">a partir de</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className={`flex items-center justify-center gap-12 mt-16 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-500 text-sm">Destinos</div>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">12</div>
              <div className="text-gray-500 text-sm">Meses Comparados</div>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">Melhor</div>
              <div className="text-gray-500 text-sm">Preço Garantido</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-emerald-300 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-emerald-400 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-24 px-6 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Destinos Populares
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore nossos destinos selecionados com preços em tempo real para voos e hospedagens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                onClick={() => {
                  setSelectedDestination(destination);
                  setShowPriceComparison(true);
                }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                    <p className="text-white/80 text-sm">{destination.country}</p>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-emerald-600 text-sm font-semibold">
                    A partir de R$ {formatPrice(getMinPrice(destination.monthlyPrices.flights))}
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✈️</span>
                        <span className="text-gray-500 text-sm">Voos</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold">R$ {formatPrice(getMinPrice(destination.monthlyPrices.flights))}</span>
                        <span className="text-gray-400 text-sm"> - R$ {formatPrice(getMaxPrice(destination.monthlyPrices.flights))}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏨</span>
                        <span className="text-gray-500 text-sm">Hotéis/noite</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold">R$ {formatPrice(getMinPrice(destination.monthlyPrices.hotels))}</span>
                        <span className="text-gray-400 text-sm"> - R$ {formatPrice(getMaxPrice(destination.monthlyPrices.hotels))}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-5 py-3 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg">
                    Ver Calendário de Preços
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Nenhum destino encontrado</h3>
              <p className="text-gray-500">Tente buscar por outro destino</p>
            </div>
          )}
        </div>
      </section>

      {/* Price Comparison Modal */}
      {showPriceComparison && selectedDestination && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowPriceComparison(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 overflow-hidden rounded-t-3xl">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button
                onClick={() => setShowPriceComparison(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white">{selectedDestination.name}</h2>
                <p className="text-white/80">{selectedDestination.country}</p>
              </div>
            </div>

            <div className="p-8" id="compare">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                Comparação de Preços - 12 Meses
              </h3>

              {/* Price Chart */}
              <div className="mb-8">
                <div className="flex items-end gap-1 h-48 px-2">
                  {selectedDestination.monthlyPrices.flights.map((price, i) => {
                    const maxPrice = getMaxPrice(selectedDestination.monthlyPrices.flights);
                    const minPrice = getMinPrice(selectedDestination.monthlyPrices.flights);
                    const height = ((price - minPrice) / (maxPrice - minPrice)) * 100 + 20;
                    const isLowest = price === minPrice;
                    
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center group">
                        <div className="relative w-full">
                          <div
                            className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${isLowest ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' : 'bg-gradient-to-t from-emerald-200 to-emerald-100'}`}
                            style={{ height: `${height}%`, minHeight: '30px' }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                              R$ {formatPrice(price)}
                            </div>
                          </div>
                          {isLowest && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs py-1 px-2 rounded-full whitespace-nowrap">
                              Melhor!
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-2">{months[i]}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">Preços de Voos ao Longo do Ano</p>
              </div>

              {/* Price Table */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {months.map((month, i) => {
                  const flightPrice = selectedDestination.monthlyPrices.flights[i];
                  const hotelPrice = selectedDestination.monthlyPrices.hotels[i];
                  const isLowestFlight = flightPrice === getMinPrice(selectedDestination.monthlyPrices.flights);
                  const isLowestHotel = hotelPrice === getMinPrice(selectedDestination.monthlyPrices.hotels);
                  
                  return (
                    <div
                      key={month}
                      className={`p-4 rounded-2xl border-2 transition-all hover:shadow-lg ${isLowestFlight || isLowestHotel ? 'border-emerald-400 bg-emerald-50' : 'border-gray-100 hover:border-emerald-200'}`}
                    >
                      <div className="text-sm font-semibold text-gray-900 mb-3">{month}</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">✈️</span>
                          <span className={`text-sm font-semibold ${isLowestFlight ? 'text-emerald-600' : 'text-gray-700'}`}>
                            R$ {formatPrice(flightPrice)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">🏨</span>
                          <span className={`text-sm font-semibold ${isLowestHotel ? 'text-emerald-600' : 'text-gray-700'}`}>
                            R$ {formatPrice(hotelPrice)}
                          </span>
                        </div>
                      </div>
                      {(isLowestFlight || isLowestHotel) && (
                        <div className="mt-2 text-xs text-emerald-600 font-medium text-center">
                          {isLowestFlight && isLowestHotel ? '✨ Melhor Geral' : isLowestFlight ? '✈️ Melhor Voo' : '🏨 Melhor Hotel'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm opacity-80 mb-1">Melhor época para visitar</div>
                    <div className="text-2xl font-bold">
                      {months[selectedDestination.monthlyPrices.flights.indexOf(getMinPrice(selectedDestination.monthlyPrices.flights))]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-80 mb-1">A partir de</div>
                    <div className="text-3xl font-bold">
                      R$ {formatPrice(getMinPrice(selectedDestination.monthlyPrices.flights) + getMinPrice(selectedDestination.monthlyPrices.hotels))}
                    </div>
                  </div>
                  <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-1">
                    Reservar Agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">V1</span>
            </div>
            <span className="text-xl font-semibold">Viagens</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4">Sobre</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                V1 Viagens ajuda você a encontrar as melhores ofertas de viagem comparando preços ao longo de todos os 12 meses do ano.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Destinos</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Comparar Preços</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Guias de Viagem</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>contato@v1viagens.com.br</li>
                <li>+55 (11) 99999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2026 V1 Viagens. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes scroll {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Index;
