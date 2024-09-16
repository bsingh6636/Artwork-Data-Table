import React, { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

interface OverlayPaneelProps {
  onRowSelectionChange: (numRows: number) => void;
}

export default function OverlayPaneel({ onRowSelectionChange }: OverlayPaneelProps) {
  const op = useRef<OverlayPanel>(null);
  const [rowCount, setRowCount] = useState<number | undefined>(undefined);

  const handleSubmit = () => {
    if (rowCount !== undefined) {
      onRowSelectionChange(rowCount);
      op.current?.hide();
    }
  };

  return (
    <div className="card flex justify-content-center">
      <span
        className="cursor-pointer p-1 bg-gray-400 text-blue-900 rounded-lg hover:scale-105 hover:bg-gray-700 hover:text-white"
        onClick={(e) => op.current?.toggle(e)}
      >
        Select Rows
      </span>
      <OverlayPanel ref={op} className="custom-overlay-panel">
        <div className="p-3">
          <input
            type="number"
            placeholder="Enter number of rows"
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}
            className="bg-gray-200 text-black p-2 rounded-md w-full mb-2"
          />
          <Button label="Submit" onClick={handleSubmit} className="w-full p-2 bg-blue-600 text-white rounded-md" />
        </div>
      </OverlayPanel>
    </div>
  );
}
