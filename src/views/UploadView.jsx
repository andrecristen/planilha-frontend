import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import spreadsheetViewModel from '../viewmodels/SpreadsheetViewModel';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../contexts/WebSocketContext';

const UploadView = observer(() => {

    const ws = useWebSocket();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fileName: '', fileContent: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        
    }, [ws]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setFormData({ ...formData, fileContent: e.target.result });
        };
        if (file) {
            reader.readAsText(file);
        }
    };

    const handleUpload = () => {
        const { fileName, fileContent } = formData;
        if (!fileName || !fileContent) {
            setError('Forneça o nome do arquivo e o conteúdo do arquivo.');
            return;
        }
        setIsLoading(true);
        spreadsheetViewModel.uploadSpreadsheet(fileName, fileContent).then(() => {
            setIsLoading(false);
            navigate("/spreadsheets");
        }).catch((err) => {
            setIsLoading(false);
            setError('Falha ao fazer upload da planilha. Por favor, tente novamente.' + err.toString());
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Importar Planilha</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Name"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                />
                <input
                    type="file"
                    className="mb-2 p-2 border rounded w-full"
                    onChange={handleFileChange}
                    accept=".csv"
                />
                <button
                    onClick={handleUpload}
                    className={`bg-blue-500 text-white p-2 rounded w-full ${isLoading ? 'opacity-50' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Importando...' : 'Importar'}
                </button>
            </div>
        </div>
    );
});

export default UploadView;