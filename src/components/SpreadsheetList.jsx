import React from 'react';
import SpreadsheetItem from './SpreadsheetItem';

const SpreadsheetList = ({ spreadsheets }) => {
    return (
        <div>
            {spreadsheets.map((spreadsheet, index) => (
                <SpreadsheetItem key={index} spreadsheet={spreadsheet} />
            ))}
        </div>
    );
};

export default SpreadsheetList;
