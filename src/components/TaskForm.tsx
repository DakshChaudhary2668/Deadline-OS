import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, BookOpen, User, Briefcase, Award, Zap } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  task: Task | null; // If null, we are in Create mode
  onSave: (taskData: Partial<Task>) => void;
  onClose: () => void;
}

export default function TaskForm({ task, onSave, onClose }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [estimatedEffort, setEstimatedEffort] = useState(2);
  const [category, setCategory] = useState<Task['category']>('Work');
  const [importance, setImportance] = useState<Task['importance']>('Medium');

  // Pre-populate if editing
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDeadline(task.deadline);
      setEstimatedEffort(task.estimatedEffort);
      setCategory(task.category);
      setImportance(task.importance);
    } else {
      // Create mode: setup standard tomorrow deadline as default helper
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(17, 0, 0, 0); // Tomorrow at 5pm
      setDeadline(tomorrow.toISOString().slice(0, 16));
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    onSave({
      title,
      description,
      deadline,
      estimatedEffort,
      category,
      importance,
    });
  };

  const categoriesObj = [
    { name: 'Work', icon: Briefcase, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { name: 'Study', icon: BookOpen, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
    { name: 'Career', icon: Award, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { name: 'Personal', icon: User, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
  ];

  const importanceObj = [
    { name: 'Low', color: 'bg-slate-800 text-slate-400 border-slate-700/60' },
    { name: 'Medium', color: 'bg-indigo-950/40 text-indigo-400 border-indigo-500/20' },
    { name: 'High', color: 'bg-amber-950/40 text-amber-500 border-amber-500/20' },
    { name: 'Critical', color: 'bg-rose-950/50 text-rose-400 border-rose-500/30' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#0E0E0E] border border-[#1A1A1A] rounded w-full max-w-lg overflow-hidden shadow-2xl relative">
        
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-600"></div>

        <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
              {task ? 'Update Constraints' : 'Register Blocker'}
            </span>
            <h3 className="text-lg font-serif italic text-white mt-1">
              {task ? 'Edit Dynamic Task' : 'Register New Milestone'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-gray-900 transition duration-150"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* TITLE */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Milestone Name / Title</label>
            <input 
              type="text"
              required
              placeholder="e.g., Deliver Raft Consensus API draft"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#131313] border border-[#1A1A1A] rounded text-white placeholder-gray-600 text-xs focus:outline-none focus:border-gray-500 transition"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Deliverables / Summary</label>
            <textarea
              placeholder="Explicitly define what successful completion looks like..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#131313] border border-[#1A1A1A] rounded text-white placeholder-gray-600 text-xs focus:outline-none focus:border-gray-500 resize-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* DEADLINE */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="h-3 w-3 text-gray-500" />
                Hard Deadline
              </label>
              <input 
                type="datetime-local"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#131313] border border-[#1A1A1A] rounded text-white text-xs focus:outline-none focus:border-gray-500 transition [color-scheme:dark]"
              />
            </div>

            {/* ESTIMATED HOURS */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3 text-gray-500" />
                Effort Hours
              </label>
              <div className="flex items-center bg-[#131313] border border-[#1A1A1A] rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setEstimatedEffort(Math.max(1, estimatedEffort - 1))}
                  className="px-3 py-1.5 text-gray-300 hover:bg-gray-900 transition text-[11px] font-mono"
                >
                  -
                </button>
                <input 
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={estimatedEffort}
                  onChange={(e) => setEstimatedEffort(Number(e.target.value))}
                  className="w-full bg-transparent border-none text-center text-white text-xs focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setEstimatedEffort(Math.min(120, estimatedEffort + 1))}
                  className="px-3 py-1.5 text-gray-300 hover:bg-gray-900 transition text-[11px] font-mono"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* CATEGORY (GRID CHOICE) */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Workspace Category</label>
            <div className="grid grid-cols-4 gap-2">
              {categoriesObj.map(cat => {
                const Icon = cat.icon;
                const active = category === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name as Task['category'])}
                    className={`flex flex-col items-center gap-1 p-2 rounded border text-[10px] font-mono cursor-pointer transition ${
                      active 
                        ? 'border-white text-white bg-[#1A1A1A]' 
                        : 'border-[#1A1A1A] text-gray-500 hover:text-white hover:bg-[#131313]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="mt-0.5">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* IMPORTANCE */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">SLA Importance Level</label>
            <div className="grid grid-cols-4 gap-2">
              {importanceObj.map(imp => {
                const active = importance === imp.name;
                return (
                  <button
                    key={imp.name}
                    type="button"
                    onClick={() => setImportance(imp.name as Task['importance'])}
                    className={`py-1.5 rounded text-center text-[10px] font-mono border cursor-pointer transition ${
                      active 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-gray-550 border-[#1A1A1A] hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {imp.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4 border-t border-[#1A1A1A]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-1.5 px-4 border border-[#1A1A1A] bg-transparent hover:bg-gray-900 text-gray-400 hover:text-white text-xs font-mono rounded transition duration-150 uppercase tracking-widest"
            >
              DISCARD
            </button>
            <button
              type="submit"
              className="flex-1 py-1.5 px-4 bg-white text-black text-xs font-mono font-bold rounded hover:bg-gray-200 transition duration-150 uppercase tracking-widest flex items-center justify-center gap-1.5"
            >
              <Zap className="h-3 w-3 shrink-0 fill-current" />
              {task ? 'SAVE CHANGES' : 'DEPLOY TARGET'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
