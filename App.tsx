
import React, { useState } from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  User as UserIcon, 
  MessageSquare, 
  Stethoscope, 
  PlusCircle, 
  Search, 
  Bell, 
  Leaf, 
  MapPin,
  TrendingUp,
  Award
} from 'lucide-react';
import { User, AppView, Post } from './types';
import Feed from './components/Feed';
import Shop from './components/Shop';
import PlantTracker from './components/PlantTracker';
import PlantDoctor from './components/PlantDoctor';
import Profile from './components/Profile';
import Community from './components/Community';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('feed');
  const [user, setUser] = useState<User>({
    id: 'u1',
    name: 'Alex Gardener',
    avatar: 'https://picsum.photos/seed/alex/200',
    credits: 1250,
    plantedCount: 24,
    bio: 'Plant lover and urban gardening advocate. Let\'s grow together!'
  });

  const [posts] = useState<Post[]>([
    {
      id: 'p1',
      userId: 'u2',
      userName: 'Sarah Bloom',
      userAvatar: 'https://picsum.photos/seed/sarah/200',
      content: 'Welcome to a community where passion for plants meets purpose. Just planted my first Oak tree in the community park! 🌳',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
      timestamp: '2h ago',
      likes: 45,
      comments: 12,
      tags: ['RootedWithMe', 'Nature']
    },
    {
      id: 'p2',
      userId: 'u3',
      userName: 'Green Nursery',
      userAvatar: 'https://picsum.photos/seed/nursery/200',
      content: 'New arrivals today! Whether you\'re nurturing your first houseplant or leading large-scale plantation drives, this is your space.',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800',
      timestamp: '4h ago',
      likes: 120,
      comments: 8,
      tags: ['Shop', 'Succulents']
    }
  ]);

  const addCredits = (amount: number) => {
    setUser(prev => ({ ...prev, credits: prev.credits + amount, plantedCount: prev.plantedCount + 1 }));
  };

  const spendCredits = (amount: number) => {
    setUser(prev => ({ ...prev, credits: prev.credits - amount }));
  };

  return (
    <div className="min-h-screen text-slate-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('feed')}
          >
            <div className="bg-[#769056] p-2.5 rounded-full group-hover:bg-[#8ba668] transition-colors shadow-lg">
              <Sprout className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight serif-title tracking-tight">Rooted With Me</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#769056] font-bold">Branch out Social</p>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-12">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                placeholder="Search the ecosystem..." 
                className="w-full bg-white/10 border border-white/5 rounded-full py-2 pl-10 pr-4 focus:bg-white/15 focus:ring-1 focus:ring-[#769056] transition-all outline-none text-sm text-white placeholder-white/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center bg-[#769056]/20 px-3.5 py-1.5 rounded-full border border-[#769056]/30">
              <Award className="text-[#769056] mr-2" size={16} />
              <span className="font-bold text-white text-sm">{user.credits.toLocaleString()}</span>
              <span className="text-[#769056] text-[10px] ml-1.5 font-bold uppercase tracking-wider">Credits</span>
            </div>
            <button className="text-white/60 hover:text-[#769056] transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#769056] rounded-full border-2 border-black"></span>
            </button>
            <button 
              onClick={() => setView('profile')}
              className="w-10 h-10 rounded-full border-2 border-[#769056]/50 p-0.5 hover:border-[#769056] transition-all overflow-hidden"
            >
              <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <nav className="hidden lg:block lg:col-span-3 space-y-1.5 sticky top-28 h-fit">
          <NavItem icon={<Leaf size={18} />} label="Home" active={view === 'feed'} onClick={() => setView('feed')} />
          <NavItem icon={<ShoppingBag size={18} />} label="Shop" active={view === 'shop'} onClick={() => setView('shop')} />
          <NavItem icon={<PlusCircle size={18} />} label="Plant & Earn" active={view === 'plant'} onClick={() => setView('plant')} />
          <NavItem icon={<Stethoscope size={18} />} label="Plant Doctor" active={view === 'doctor'} onClick={() => setView('doctor')} />
          <NavItem icon={<MessageSquare size={18} />} label="NGO & Community" active={view === 'community'} onClick={() => setView('community')} />
          <NavItem icon={<UserIcon size={18} />} label="My Profile" active={view === 'profile'} onClick={() => setView('profile')} />

          <div className="mt-10 pt-8 border-t border-white/5">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-5 px-4">Trusted Partners</h3>
            <div className="space-y-5 px-4">
              <PartnerCard name="Green Earth NGO" type="Ecosystem Partner" />
              <PartnerCard name="Leafy Nurseries" type="Verified Supplier" />
              <PartnerCard name="Bloom Tech" type="Course Provider" />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-span-1 lg:col-span-6 space-y-8 pb-24 lg:pb-0">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden p-1 shadow-2xl">
             <div className="p-1 min-h-[500px]">
                {view === 'feed' && <Feed posts={posts} />}
                {view === 'shop' && <Shop credits={user.credits} onPurchase={spendCredits} />}
                {view === 'plant' && <PlantTracker onVerified={addCredits} />}
                {view === 'doctor' && <PlantDoctor />}
                {view === 'profile' && <Profile user={user} posts={posts.filter(p => p.userId === user.id)} />}
                {view === 'community' && <Community />}
             </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-28 h-fit">
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="font-bold text-white flex items-center gap-2 mb-5 serif-title">
              <TrendingUp size={18} className="text-[#769056]" />
              Personal Impact
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/50">Total Planted</span>
                <span className="font-bold text-white">{user.plantedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/50">Eco-Rank</span>
                <span className="font-bold text-white">Top 12%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#769056] h-full rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
              </div>
              <p className="text-[11px] text-[#769056] text-center font-medium italic">Your growth journey is inspiring!</p>
            </div>
          </div>

          <div className="bg-[#769056] rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-2 serif-title">Branch Out</h3>
            <p className="text-white/80 text-sm mb-5 leading-relaxed">Redeem your credits for exclusive native seeds and expert-led gardening courses.</p>
            <button 
              onClick={() => setView('shop')}
              className="w-full bg-black text-white font-bold py-2.5 rounded-2xl text-xs hover:bg-black/80 transition-all uppercase tracking-widest"
            >
              Enter Shop
            </button>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
        <button onClick={() => setView('feed')} className={`p-2 transition-colors ${view === 'feed' ? 'text-[#769056]' : 'text-white/40'}`}>
          <Leaf size={22} />
        </button>
        <button onClick={() => setView('shop')} className={`p-2 transition-colors ${view === 'shop' ? 'text-[#769056]' : 'text-white/40'}`}>
          <ShoppingBag size={22} />
        </button>
        <button onClick={() => setView('plant')} className="bg-[#769056] text-white p-4 rounded-full -mt-12 shadow-2xl ring-4 ring-black">
          <PlusCircle size={24} />
        </button>
        <button onClick={() => setView('doctor')} className={`p-2 transition-colors ${view === 'doctor' ? 'text-[#769056]' : 'text-white/40'}`}>
          <Stethoscope size={22} />
        </button>
        <button onClick={() => setView('profile')} className={`p-2 transition-colors ${view === 'profile' ? 'text-[#769056]' : 'text-white/40'}`}>
          <UserIcon size={22} />
        </button>
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl font-medium transition-all group ${
      active 
        ? 'bg-[#769056] text-white shadow-lg' 
        : 'text-white/60 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={active ? 'text-white' : 'text-[#769056] group-hover:scale-110 transition-transform'}>{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

const PartnerCard: React.FC<{ name: string; type: string }> = ({ name, type }) => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="w-1.5 h-1.5 rounded-full bg-[#769056] group-hover:scale-150 transition-transform"></div>
    <div>
      <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{name}</p>
      <p className="text-[10px] text-white/30 uppercase tracking-wider">{type}</p>
    </div>
  </div>
);

export default App;
