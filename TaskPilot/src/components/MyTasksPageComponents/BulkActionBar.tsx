import { X, CheckCircle, Tag, ArrowRight, Trash2 } from 'lucide-react';

interface Props {
  count: number;
  onClear: () => void;
}

export default function BulkActionBar({ count, onClear }: Props) {
  if (count === 0) return null;

  return (
    <div className="tf-bulk-action-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={onClear} style={{ background: 'none', border: 'none', color: '#c7c4d8', cursor: 'pointer' }}>
          <X size={18} />
        </button>
        <span style={{ fontWeight: 500 }}>{count} selected</span>
      </div>
      <div className="tf-bulk-actions">
        <button className="tf-bulk-btn"><CheckCircle size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />Change Status</button>
        <button className="tf-bulk-btn"><ArrowRight size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />Move to Sprint</button>
        <button className="tf-bulk-btn"><Tag size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />Add Label</button>
        <div style={{ width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <button className="tf-bulk-btn" style={{ color: '#ffb695' }}><Trash2 size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />Delete</button>
      </div>
    </div>
  );
}
