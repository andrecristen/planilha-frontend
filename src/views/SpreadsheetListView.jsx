import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import spreadsheetViewModel from '../viewmodels/SpreadsheetViewModel';
import SpreadsheetList from '../components/SpreadsheetList';

const SpreadsheetListView = observer(() => {

    const navigate = useNavigate();
    const spreadsheets = spreadsheetViewModel.getSpreadsheets();

    const handleNavigateToUpload = () => {
        navigate('/upload');
    };

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEB_SOCKET)

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            alert('Nova mensagem recebida: ' + event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen mx-6">
            <div className="bg-white p-6 rounded shadow-md w-full h-full min-h-screen max-w-screen-2xl mx-6">
                <h1 className="text-2xl mb-4">Planilhas Importadas</h1>

                <button
                    onClick={handleNavigateToUpload}
                    className="bg-blue-500 text-white p-2 rounded w-full mb-4"
                >
                    Adicionar Nova Planilha
                </button>

                <SpreadsheetList spreadsheets={spreadsheets} />
            </div>
        </div>
    );
});

export default SpreadsheetListView;
