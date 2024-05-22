import React, { useState } from 'react';
import { observer } from 'mobx-react';
import spreadsheetViewModel from '../viewmodels/SpreadsheetViewModel';
import { useNavigate } from 'react-router-dom';

const UploadView = observer(() => {

    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');

    const handleUpload = () => {
        spreadsheetViewModel.uploadSpreadsheet(fileName, fileContent);
        navigate("/spreadsheets");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Adicionar Planilha</h1>
                <input
                    type="text"
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Nome"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <textarea
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Conteúdo CSV"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Upload
                </button>
            </div>
        </div>
    );
});

export default UploadView;
