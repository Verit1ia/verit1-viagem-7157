import { useState, useEffect, useMemo } from "react";

// Destination data with monthly prices
const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    description: "City of Light and Romance",
    monthlyPrices: {
      flights: [450, 420, 380, 350, 400, 520, 680, 720, 480, 390, 360, 480],
      hotels: [180, 160, 150, 140, 165, 200, 280, 300, 190, 155, 145, 195]
    }
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    description: "Where Tradition Meets Future",
    monthlyPrices: {
      flights: [890, 850, 780, 820, 900, 950, 1100, 1150, 880, 810, 790, 920],
      hotels: [150, 140, 130, 135, 155, 180, 220, 240, 170, 145, 135, 165]
    }
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    description: "Island of the Gods",
    monthlyPrices: {
      flights: [720, 680, 650, 600, 580, 620, 750, 800, 690, 640, 610, 700],
      hotels: [85, 80, 75, 70, 68, 82, 120, 140, 95, 78, 72, 90]
    }
  },
  {
    id: 4,
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    description: "The City That Never Sleeps",
    monthlyPrices: {
      flights: [380, 350, 320, 340, 390, 450, 520, 540, 420, 360, 340, 400],
      hotels: [250, 230, 210, 220, 260, 300, 350, 380, 290, 240, 225, 280]
    }
  },
  {
    id: 5,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    description: "Aegean Paradise",
    monthlyPrices: {
      flights: [320, 290, 270, 300, 380, 450, 580, 620, 420, 330, 280, 350],
      hotels: [120, 100, 90, 110, 180, 280, 380, 420, 250, 140, 105, 130]
    }
  },
  {
    id: 6,
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    description: "City of Gold",
    monthlyPrices: {
      flights: [480, 420, 390, 410, 450, 520, 620, 680, 500, 430, 400, 550],
      hotels: [200, 180, 160, 170, 190, 240, 180, 200, 210, 185, 165, 220]
    }
  },
  {
    id: 7,
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    description: "Tropical Paradise",
    monthlyPrices: {
      flights: [950, 880, 820, 790, 850, 920, 1050, 1100, 900, 840, 800, 980],
      hotels: [450, 380, 320, 300, 350, 420, 550, 600, 480, 400, 340, 480]
    }
  },
  {
    id: 8,
    name: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    description: "Art and Architecture",
    monthlyPrices: {
      flights: [380, 340, 310, 330, 390, 480, 580, 620, 450, 360, 320, 400],
      hotels: [140, 120, 110, 125, 160, 200, 260, 290, 180, 135, 115, 150]
    }
  }
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPriceComparison, setShowPriceComparison] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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

  const getMinPrice = (prices: number[]) => Math.min(...prices);
  const getMaxPrice = (prices: number[]) => Math.max(...prices);

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
          <div className="hidden md:flex items-center gap-8">
            <a href="#destinations" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Destinations</a>
            <a href="#compare" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Compare Prices</a>
            <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5">
              Book Now
            </button>
          </div>
        </div>
      </nav>

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
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-emerald-100/50 flex items-center justify-center text-2xl">🏨</div>
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
            Find the best travel deals
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Compare flights and hotels across 12 months. Find the perfect time to travel at the best price.
          </p>

          {/* Search Bar */}
          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-emerald-100/50 overflow-hidden">
                <div className="pl-6 text-emerald-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-5 text-lg outline-none placeholder:text-gray-400"
                />
                <button className="m-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className={`flex items-center justify-center gap-12 mt-16 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-500 text-sm">Destinations</div>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">12</div>
              <div className="text-gray-500 text-sm">Months Compared</div>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">Best</div>
              <div className="text-gray-500 text-sm">Prices Guaranteed</div>
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
              Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our handpicked destinations with real-time pricing for flights and accommodations
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
                    From ${getMinPrice(destination.monthlyPrices.flights)}
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✈️</span>
                        <span className="text-gray-500 text-sm">Flights</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold">${getMinPrice(destination.monthlyPrices.flights)}</span>
                        <span className="text-gray-400 text-sm"> - ${getMaxPrice(destination.monthlyPrices.flights)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏨</span>
                        <span className="text-gray-500 text-sm">Hotels/night</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-bold">${getMinPrice(destination.monthlyPrices.hotels)}</span>
                        <span className="text-gray-400 text-sm"> - ${getMaxPrice(destination.monthlyPrices.hotels)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-5 py-3 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg">
                    View Price Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No destinations found</h3>
              <p className="text-gray-500">Try searching for another destination</p>
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
                12-Month Price Comparison
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
                              ${price}
                            </div>
                          </div>
                          {isLowest && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs py-1 px-2 rounded-full whitespace-nowrap">
                              Best!
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-2">{months[i]}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">Flight Prices Throughout the Year</p>
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
                            ${flightPrice}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">🏨</span>
                          <span className={`text-sm font-semibold ${isLowestHotel ? 'text-emerald-600' : 'text-gray-700'}`}>
                            ${hotelPrice}
                          </span>
                        </div>
                      </div>
                      {(isLowestFlight || isLowestHotel) && (
                        <div className="mt-2 text-xs text-emerald-600 font-medium text-center">
                          {isLowestFlight && isLowestHotel ? '✨ Best Overall' : isLowestFlight ? '✈️ Best Flight' : '🏨 Best Hotel'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm opacity-80 mb-1">Best time to visit</div>
                    <div className="text-2xl font-bold">
                      {months[selectedDestination.monthlyPrices.flights.indexOf(getMinPrice(selectedDestination.monthlyPrices.flights))]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-80 mb-1">Starting from</div>
                    <div className="text-3xl font-bold">
                      ${getMinPrice(selectedDestination.monthlyPrices.flights) + getMinPrice(selectedDestination.monthlyPrices.hotels)}
                    </div>
                  </div>
                  <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-1">
                    Book Now
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
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                V1 Viagens helps you find the best travel deals by comparing prices across all 12 months of the year.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Price Comparison</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Travel Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>hello@v1viagens.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2024 V1 Viagens. All rights reserved.
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
