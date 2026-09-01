'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { IconClock, IconCheck, IconEdit, IconTrash, IconRefresh, IconX, IconLoader } from '@/components/Icons' // შენიშვნა: თუ Icons ცალკე გაქვს, გამოიყენე ის, თუ არა - ქვემოთ მოცემულს გამოვიყენებთ

// მარტივი იკონები კომპონენტის შიგნით (თუ ცალკე ფაილში არ გაქვს)
const IconHistory = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>
)
const IconChevronRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
)

// მოქმედების ტიპის მიხედვით იკონი და ფერი
const getActionStyle = (actionType: string) => {
  switch (actionType) {
    case 'create': return { icon: '➕', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    case 'update': return { icon: '✏️', color: 'text-blue-400', bg: 'bg-blue-500/10' }
    case 'delete': return { icon: '🗑️', color: 'text-rose-400', bg: 'bg-rose-500/10' }
    case 'verify': return { icon: '✓', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    case 'remind': return { icon: '🔔', color: 'text-amber-400', bg: 'bg-amber-500/10' }
    case 'generate': return { icon: '⚙️', color: 'text-purple-400', bg: 'bg-purple-500/10' }
    case 'bulk_action': return { icon: '📦', color: 'text-indigo-400', bg: 'bg-indigo-500/10' }
    default: return { icon: '•', color: 'text-slate-400', bg: 'bg-slate-500/10' }
  }
}

// ============ COMPACT LOG LIST (ბოლო 10) ============
export function ActivityLogList({ buildingId, onViewAll }: { buildingId: string, onViewAll: () => void }) {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('building_id', buildingId)
        .order('created_at', { ascending: false })
        .limit(10)
      setLogs(data || [])
      setLoading(false)
    }
    fetchLogs()
  }, [buildingId])

  if (loading) return <div className="flex items-center justify-center p-8"><IconLoader className="w-6 h-6 text-emerald-400 animate-spin" /></div>

  return (
    <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <IconHistory className="w-6 h-6 text-blue-400" />
          ბოლო მოქმედებები
        </h3>
        <button onClick={onViewAll} className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
          ყველას ნახვა <IconChevronRight className="w-4 h-4" />
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          ჯერ არანაირი მოქმედება არ დაფიქსირებულა
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => {
            const style = getActionStyle(log.action_type)
            const date = new Date(log.created_at).toLocaleString('ka-GE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            
            return (
              <div key={log.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-700/30 transition-colors">
                <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0 text-lg`}>
                  {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">{log.description}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                    <span>{log.user_name || 'უცნობი'}</span>
                    <span>•</span>
                    <span>{date}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ============ FULL LOG MODAL (სრული ისტორია) ============
export function ActivityLogModal({ isOpen, onClose, buildingId }: { isOpen: boolean, onClose: () => void, buildingId: string }) {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [filterAction, setFilterAction] = useState<string>('all')

  useEffect(() => {
    if (isOpen) fetchLogs()
  }, [isOpen, filterAction])

  const fetchLogs = async () => {
    setLoading(true)
    let query = supabase
      .from('activity_logs')
      .select('*')
      .eq('building_id', buildingId)
      .order('created_at', { ascending: false })
      .limit(100)

    if (filterAction !== 'all') {
      query = query.eq('action_type', filterAction)
    }

    const { data } = await query
    setLogs(data || [])
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <IconHistory className="w-6 h-6 text-blue-400" />
            სრული აქტივობის ჟურნალი
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <IconX className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-white/10 bg-slate-800/30">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'create', 'update', 'delete', 'verify', 'remind', 'generate', 'bulk_action'].map((action) => (
              <button
                key={action}
                onClick={() => setFilterAction(action)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterAction === action 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {action === 'all' ? 'ყველა' : action}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <IconLoader className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              ჩანაწერები ვერ მოიძებნა
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => {
                const style = getActionStyle(log.action_type)
                const date = new Date(log.created_at).toLocaleString('ka-GE', { 
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })
                
                return (
                  <div key={log.id} className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0 text-lg`}>
                        {style.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">{log.description}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {log.user_name || 'უცნობი'} • {date}
                        </div>
                      </div>
                    </div>
                    
                    {/* დეტალები (თუ არის old_value/new_value) */}
                    {(log.old_value || log.new_value) && (
                      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                        {log.old_value && (
                          <div>
                            <div className="text-slate-500 mb-1">წინა მნიშვნელობა:</div>
                            <pre className="text-slate-300 bg-slate-900/50 p-2 rounded-lg overflow-x-auto">
                              {JSON.stringify(log.old_value, null, 2)}
                            </pre>
                          </div>
                        )}
                        {log.new_value && (
                          <div>
                            <div className="text-slate-500 mb-1">ახალი მნიშვნელობა:</div>
                            <pre className="text-emerald-300 bg-slate-900/50 p-2 rounded-lg overflow-x-auto">
                              {JSON.stringify(log.new_value, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}