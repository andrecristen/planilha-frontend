import React, { useState } from 'react';
import { observer } from 'mobx-react';
import userViewModel from '../viewmodels/UserViewModel';
import { useNavigate } from 'react-router-dom';

const LoginView = observer(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        await userViewModel.login(username, password);
        if (userViewModel.isAuthenticated) {
            navigate("/spreadsheets");
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Login</h1>
                <input
                    type="text"
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="mb-2 p-2 border rounded w-full"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white p-2 rounded w-full"
                >
                    Login
                </button>
                <button
                    type='button'
                    onClick={handleRegister}
                    className="bg-green-600 text-white p-2 rounded w-full mt-2"
                >
                    Registrar-se
                </button>
            </div>
        </div>
    );
});

export default LoginView;
