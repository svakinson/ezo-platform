import { supabase } from '@/lib/supabase'

export type ActionType = 'create' | 'update' | 'delete' | 'verify' | 'remind' | 'pay' | 'generate' | 'bulk_action'
export type EntityType = 'expense' | 'expense_template' | 'monthly_fee' | 'bank_account' | 'financial_settings'

interface LogActionParams {
  buildingId: string
  actionType: ActionType
  entityType: EntityType
  entityId?: string
  entityName?: string
  description: string
  oldValue?: any
  newValue?: any
  metadata?: any
}

export async function logAction({
  buildingId,
  actionType,
  entityType,
  entityId,
  entityName,
  description,
  oldValue,
  newValue,
  metadata
}: LogActionParams) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase.from('activity_logs').insert({
      building_id: buildingId,
      user_id: user?.id || null,
      user_name: user?.user_metadata?.full_name || user?.email || 'უცნობი',
      action_type: actionType,
      entity_type: entityType,
      entity_id: entityId || null,
      entity_name: entityName || null,
      description: description,
      old_value: oldValue || null,
      new_value: newValue || null,
      metadata: metadata || null
    })
  } catch (error) {
    console.error('Activity log error:', error)
    // ლოგის ჩაწერა არ უნდა შეაჩეროს მთავარი მოქმედება
  }
}