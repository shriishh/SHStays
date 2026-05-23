import React from 'react';

export default function CompareTray({ comparedItems, onRemove, onClear, onOpenCompare }) {
  const isVisible = comparedItems.length > 0;

  return (
    <div className={`compare-tray ${isVisible ? 'visible' : ''}`}>
      <div className="tray-info">
        <h4 className="tray-title">Compare Listings</h4>
        <span className="tray-count">Compare ({comparedItems.length}/5 max)</span>
      </div>

      <div className="tray-items">
        {comparedItems.map((item) => (
          <div key={item._id} className="tray-item">
            <img src={item.image} alt={item.name} className="tray-item-thumb" />
            <span className="tray-item-name">{item.name}</span>
            <button 
              className="tray-item-remove" 
              onClick={() => onRemove(item._id)}
              title="Remove"
              aria-label={`Remove ${item.name} from comparison`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="tray-actions">
        <button className="btn-tray-clear" onClick={onClear}>
          Clear All
        </button>
        <button 
          className="btn-tray-compare" 
          onClick={onOpenCompare}
          disabled={comparedItems.length < 1}
        >
          Compare Now &rarr;
        </button>
      </div>
    </div>
  );
}
