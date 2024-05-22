import React from 'react';

const SpreadsheetItem = ({ spreadsheet }) => {
    return (
        <div className="p-2 border-b">
            <h2 className="text-lg">{spreadsheet.name}</h2>
            <pre className="text-sm max-h-20 overflow-auto">{spreadsheet.content}</pre>
        </div>
    );
};

export default SpreadsheetItem;