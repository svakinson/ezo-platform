// ... (წინა კოდი იგივე რჩება ემოთ) ...

// რომელი ველები არ უნდა გამოჩნდეს ჟურნალში
const HIDDEN_FIELDS = [
  'is_recurring',
  'category_id',
  'building_id',
  'apartment_id',
  'user_id',
  'id',
  'created_at',
  'updated_at',
  'fee_month',
  'expense_date',
  'payment_date',
  'verified_by',
  'reminder_count',
  'reminder_sent',
  'reminder_last_sent',
  'calculation_method',
  'property_type',
  'base_amount',
  'special_assessment_amount',
  'late_fee_amount',
  'late_fee_percentage',
  'grace_period_days',
  'due_date'
]

// მნიშვნელობების ამაზად ფორმატირება
const formatValue = (key: string, value: any): string => {
  if (key === 'amount') {
    return `₾${Number(value).toLocaleString('ka-GE')}`
  }
  if (key === 'is_paid') {
    return value ? 'გადახდილი' : 'გადაუხდელი'
  }
  if (key === 'status') {
    const statusMap: Record<string, string> = {
      'paid': 'გადახდილი',
      'pending': 'მოლოდინში',
      'overdue': 'გადაუხდელი',
      'pending_receipt': 'ქვითარი ატვირთულია',
      'exempt': 'განთავისუფლებული'
    }
    return statusMap[value] || value
  }
  if (key === 'payment_due_day') {
    return `${value}-ში`
  }
  if (key === 'is_primary') {
    return value ? 'დიახ' : 'არა'
  }
  if (typeof value === 'number') {
    return value.toString()
  }
  if (typeof value === 'boolean') {
    return value ? 'დიახ' : 'არა'
  }
  return String(value)
}

// ველის სახელის ლამაზად დასახელება
const formatFieldName = (key: string): string => {
  const fieldNames: Record<string, string> = {
    'amount': 'თანხა',
    'description': 'აღწერა',
    'is_paid': 'სტატუსი',
    'status': 'სტატუსი',
    'payment_due_day': 'გადახდის ვადა',
    'fee_calculation_method': 'გამოთვლის მეთოდი',
    'is_primary': 'მთავარი ანგარიში',
    'bank_name': 'ბანკის სახელი',
    'account_number': 'ანგარიშის ნომერი',
    'account_holder': 'ანგარიშის მფლობელი',
    'currency': 'ვალუტა',
    'swift_code': 'SWIFT კოდი',
    'notes': 'შენიშვნები'
  }
  return fieldNames[key] || key
}

// ... (დარჩენილი კოდი იგივე) ...

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
            {[
              { key: 'all', label: 'ყველა', color: 'bg-emerald-500' },
              { key: 'create', label: 'დამატება', color: 'bg-emerald-500' },
              { key: 'update', label: 'რედაქტირება', color: 'bg-blue-500' },
              { key: 'delete', label: 'წაშლა', color: 'bg-rose-500' },
              { key: 'verify', label: 'დადასტურება', color: 'bg-emerald-500' },
              { key: 'remind', label: 'შეხსენება', color: 'bg-amber-500' },
              { key: 'generate', label: 'გენერაცია', color: 'bg-purple-500' },
              { key: 'bulk_action', label: 'ჯგუფური', color: 'bg-indigo-500' }
            ].map((action) => (
              <button
                key={action.key}
                onClick={() => setFilterAction(action.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterAction === action.key 
                    ? `${action.color} text-white` 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <IconLoader className="w-8 h-8 text-emerald-400" />
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
                
                // ფილტრავს ტექნიკურ ველებს
                const filterValue = (obj: any) => {
                  if (!obj) return null
                  const filtered: any = {}
                  Object.entries(obj).forEach(([key, value]) => {
                    if (!HIDDEN_FIELDS.includes(key)) {
                      filtered[key] = value
                    }
                  })
                  return Object.keys(filtered).length > 0 ? filtered : null
                }

                const oldValues = filterValue(log.old_value)
                const newValues = filterValue(log.new_value)
                
                return (
                  <div key={log.id} className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0 text-xl`}>
                        {style.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${style.bg} ${style.color}`}>
                            {style.label}
                          </span>
                          <div className="text-sm font-bold text-white">{log.description}</div>
                        </div>
                        <div className="text-xs text-slate-400">
                          <span className="font-medium text-slate-300">{log.user_name || 'უცნობი'}</span>
                          <span className="mx-2">•</span>
                          <span>{date}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* ლამაზად ფორმატირებული ცვლილებები (მხოლოდ მნიშვნელოვანი ველები) */}
                    {(oldValues || newValues) && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {oldValues && Object.entries(oldValues).map(([key, value]) => (
                            <div key={key} className="bg-slate-900/50 rounded-lg p-3">
                              <div className="text-xs text-slate-500 mb-1">{formatFieldName(key)}</div>
                              <div className="text-sm text-slate-300 font-mono">{formatValue(key, value)}</div>
                            </div>
                          ))}
                          {newValues && Object.entries(newValues).map(([key, value]) => (
                            <div key={key} className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                              <div className="text-xs text-emerald-400/70 mb-1">{formatFieldName(key)}</div>
                              <div className="text-sm text-emerald-300 font-mono font-medium">{formatValue(key, value)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* დამატებითი მეტა მონაცემები */}
                    {log.metadata && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-xs text-slate-500 mb-2">დამატებითი ინფორმაცია:</div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(log.metadata).map(([key, value]) => (
                            <span key={key} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                              {formatFieldName(key)}: {formatValue(key, value)}
                            </span>
                          ))}
                        </div>
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