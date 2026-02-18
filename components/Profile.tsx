
import React from 'react';
import { User, Post } from '../types';
import { Calendar, MapPin, Award, Leaf, Settings } from 'lucide-react';

interface ProfileProps {
  user: User;
  posts: Post[];
}

const Profile: React.FC<ProfileProps> = ({ user, posts }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <div className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" 
              />
              <div className="absolute bottom-1 right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white">
                <Leaf size={12} />
              </div>
            </div>
            <button className="bg-white border border-slate-200 p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
              <Settings size={20} />
            </button>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Joined Oct 2023</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-lg">
            {user.bio}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 py-4 border-y border-slate-100">
            <div className="text-center">
              <p className="text-xl font-bold text-slate-800">{user.plantedCount}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Plants Logged</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-xl font-bold text-slate-800">{user.credits.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Credits Earned</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-800">12</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Badges Won</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge label="Urban Pioneer" color="emerald" />
            <Badge label="10+ Trees" color="blue" />
            <Badge label="Native Saver" color="amber" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Award size={20} className="text-emerald-500" />
          Achievement Progress
        </h3>
        <div className="space-y-6">
          <ProgressItem 
            label="Forest Guardian" 
            desc="Plant 50 trees in public parks" 
            current={user.plantedCount} 
            total={50} 
            icon={<Leaf size={14} />}
          />
          <ProgressItem 
            label="Generous Giver" 
            desc="Redeem 5 items from the market" 
            current={3} 
            total={5} 
            icon={<Award size={14} />}
          />
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ label: string, color: string }> = ({ label, color }) => {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${colors[color] || colors.emerald}`}>
      {label}
    </span>
  );
};

const ProgressItem: React.FC<{ label: string, desc: string, current: number, total: number, icon: React.ReactNode }> = ({ label, desc, current, total, icon }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          {icon}
          {label}
        </h4>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <span className="text-xs font-bold text-emerald-600">{Math.round((current/total)*100)}%</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div 
        className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
        style={{ width: `${(current/total)*100}%` }}
      ></div>
    </div>
  </div>
);

export default Profile;
