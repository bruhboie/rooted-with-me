
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send } from 'lucide-react';
import { Post } from '../types';

interface FeedProps {
  posts: Post[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  const [newPost, setNewPost] = useState('');

  return (
    <div className="space-y-6">
      {/* Create Post Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <div className="flex gap-4">
          <img src="https://picsum.photos/seed/alex/200" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-slate-100" />
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your gardening journey..."
            className="flex-1 bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-1 focus:ring-[#769056] resize-none min-h-[100px] text-slate-800 font-medium"
          />
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
          <button className="flex items-center gap-2 text-slate-400 hover:text-[#769056] font-bold text-[11px] uppercase tracking-wider transition-colors">
            <ImageIcon size={18} />
            Add Visuals
          </button>
          <button className="bg-[#769056] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#8ba668] transition-all shadow-lg flex items-center gap-2 uppercase tracking-widest">
            Publish
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-3xl shadow-sm overflow-hidden group">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={post.userAvatar} alt={post.userName} className="w-11 h-11 rounded-full border-2 border-slate-100" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm serif-title tracking-tight">{post.userName}</h4>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{post.timestamp}</p>
              </div>
            </div>
            <button className="text-slate-300 hover:text-slate-500">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div className="px-6 pb-4">
            <p className="text-slate-700 text-base leading-relaxed italic font-medium">"{post.content}"</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-[#769056] text-[10px] font-black uppercase tracking-widest">#{tag}</span>
              ))}
            </div>
          </div>

          {post.image && (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 mx-auto px-6 mb-4">
              <img src={post.image} alt="Post image" className="w-full h-full object-cover rounded-2xl shadow-inner group-hover:scale-[1.02] transition-transform duration-700" />
            </div>
          )}

          <div className="p-6 pt-2 flex items-center gap-8 border-t border-slate-50">
            <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors font-black text-[10px] uppercase tracking-widest">
              <Heart size={18} />
              {post.likes} <span className="hidden sm:inline">Likes</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-[#769056] transition-colors font-black text-[10px] uppercase tracking-widest">
              <MessageCircle size={18} />
              {post.comments} <span className="hidden sm:inline">Comments</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors font-black text-[10px] uppercase tracking-widest ml-auto">
              <Share2 size={18} />
              Forward
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
