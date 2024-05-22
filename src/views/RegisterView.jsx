import React, { useState } from 'react';
import { observer } from 'mobx-react';
import userViewModel from '../viewmodels/UserViewModel';
import { useNavigate } from 'react-router-dom';

const RegisterView = observer(() => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        await userViewModel.register(username, email, password);
        if (userViewModel.isAuthenticated) {
            navigate('/upload');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Registrar</h1>
                <input
                    type="text"
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleRegister}
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Registrar-se
                </button>
            </div>
        </div>
    );
});

export default RegisterView;
