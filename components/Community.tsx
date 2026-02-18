
import React from 'react';
import { Users, Sprout, Building2, Map, Star, ArrowUpRight } from 'lucide-react';

const Community: React.FC = () => {
  const groups = [
    { name: 'SF Reforesters', members: 1200, type: 'Local Group', image: 'https://picsum.photos/seed/sf/200' },
    { name: 'Green Earth NGO', members: 45000, type: 'Global Partner', image: 'https://picsum.photos/seed/ngo/200' },
    { name: 'Indoor Jungle Collective', members: 3200, type: 'Enthusiasts', image: 'https://picsum.photos/seed/jungle/200' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Discover Groups</h2>
        <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Find Near Me</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all group cursor-pointer">
            <img src={group.image} alt={group.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{group.name}</h3>
              <p className="text-xs text-slate-400 font-medium">{group.type} • {group.members.toLocaleString()} members</p>
              <button className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-wider">
                Join Community
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-50 rounded-full"></div>
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Become a Partner</h3>
          <p className="text-slate-500 text-sm mb-4 max-w-sm">Are you a nursery or NGO? Collaborate with Rooted to reward users and grow your impact.</p>
          <div className="flex gap-4">
            <PartnerType icon={<Building2 size={20} />} label="Nursery" />
            <PartnerType icon={<Sprout size={20} />} label="NGO" />
            <PartnerType icon={<Users size={20} />} label="Business" />
          </div>
          <button className="mt-6 w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors">
            Apply to Collaborate
          </button>
        </div>
      </div>

      <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <Map className="absolute right-0 bottom-0 opacity-10 -mr-10 -mb-10" size={200} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-emerald-500 rounded-lg">
              <Star size={16} fill="white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Featured Mission</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">The Great Redwood Restoration</h2>
          <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
            Partnering with "Trees for Future", we aim to plant 10,000 redwoods this quarter. Join a local squad and earn exclusive badges and triple credits!
          </p>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-black">6,420</p>
              <p className="text-[10px] uppercase font-bold text-emerald-400">Planted</p>
            </div>
            <div className="h-10 w-px bg-emerald-700"></div>
            <div>
              <p className="text-2xl font-black">842</p>
              <p className="text-[10px] uppercase font-bold text-emerald-400">Volunteers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartnerType: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex-1 hover:border-emerald-200 hover:bg-emerald-50 transition-colors cursor-pointer group">
    <div className="text-slate-400 group-hover:text-emerald-600 transition-colors">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{label}</span>
  </div>
);

export default Community;
