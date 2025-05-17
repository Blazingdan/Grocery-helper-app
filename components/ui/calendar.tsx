import React from 'react';

export function Calendar({ selected, onSelect }) {
  return (
    <input
      type="date"
      value={selected ? selected.toISOString().substring(0, 10) : ''}
      onChange={(e) => onSelect(e.target.value ? new Date(e.target.value) : undefined)}
      className="border border-gray-300 rounded px-3 py-2 w-full"
    />
  );
}
