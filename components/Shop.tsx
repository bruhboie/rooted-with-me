
import React, { useState } from 'react';
import { ShoppingCart, Filter, Award, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ShopProps {
  credits: number;
  onPurchase: (amount: number) => void;
}

const Shop: React.FC<ShopProps> = ({ credits, onPurchase }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const products: Product[] = [
    { id: 'pr1', name: 'Monstera Deliciosa', price: 25, priceInCredits: 500, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=600', seller: 'Leafy Nurseries', category: 'Plant', description: 'The iconic swiss cheese plant. Perfect for indoor vibes.' },
    { id: 'pr2', name: 'Organic Soil Mix (10kg)', price: 15, priceInCredits: 300, image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600', seller: 'Green Earth NGO', category: 'Fertilizer', description: 'Nutrient-rich mix designed for reforestation projects.' },
    { id: 'pr3', name: 'Heritage Tomato Seeds', price: 5, priceInCredits: 100, image: 'https://images.unsplash.com/photo-1592552097308-4903328e19c9?auto=format&fit=crop&q=80&w=600', seller: 'Farmer John', category: 'Seed', description: 'Heirloom seeds from a 50-year-old lineage.' },
    { id: 'pr4', name: 'Ergonomic Hand Trowel', price: 12, priceInCredits: 240, image: 'https://images.unsplash.com/photo-1416870230247-d0a2906d897f?auto=format&fit=crop&q=80&w=600', seller: 'Bloom Tech', category: 'Tool', description: 'Stainless steel tool for easy digging.' }
  ];

  const handleBuy = (product: Product) => {
    if (credits >= product.priceInCredits) {
      onPurchase(product.priceInCredits);
      setPurchaseSuccess(product.name);
      setTimeout(() => setPurchaseSuccess(null), 3000);
    } else {
      alert("Insufficient credits. Contribute more to the ecosystem to earn.");
    }
  };

  const filteredProducts = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800 serif-title">Rooted Marketplace</h2>
        <button className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-slate-500 hover:text-[#769056]">
          <Filter size={18} />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Plant', 'Seed', 'Tool', 'Fertilizer'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-[#769056] text-white shadow-xl translate-y-[-2px]' 
                : 'bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {purchaseSuccess && (
        <div className="bg-[#769056]/10 border border-[#769056]/20 p-5 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="text-[#769056]" size={24} />
          <p className="text-[#769056] font-bold serif-title italic">Reserved {purchaseSuccess} for your next project!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-[2rem] border border-slate-50 overflow-hidden shadow-sm hover:shadow-2xl transition-all group duration-500">
            <div className="aspect-[4/3] relative overflow-hidden bg-slate-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-[0.2em]">
                {product.category}
              </div>
            </div>
            <div className="p-7">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-xl serif-title leading-tight">{product.name}</h3>
                <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest pt-1">@{product.seller.split(' ')[0]}</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed italic font-medium">"{product.description}"</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                <div>
                  <div className="flex items-center text-[#769056] font-black text-lg">
                    <Award size={18} className="mr-2" />
                    <span>{product.priceInCredits}</span>
                    <span className="text-[10px] ml-1.5 opacity-60 uppercase tracking-widest">Credits</span>
                  </div>
                  <div className="text-slate-300 text-xs font-bold mt-1 tracking-wider italic">${product.price} USD Contribution</div>
                </div>
                <button 
                  onClick={() => handleBuy(product)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    credits >= product.priceInCredits 
                      ? 'bg-slate-900 text-white hover:bg-[#769056] shadow-lg' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={14} />
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
