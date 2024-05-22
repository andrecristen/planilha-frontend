import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class UserViewModel {
    user = null;
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
    }

    async login(username, password) {
        try {
            const response = await axios.get('https://664d4854ede9a2b5565318dd.mockapi.io/login/users/1');
            if (response.data.username === username && response.data.password === password) {
                this.user = response.data;
                this.isAuthenticated = true;
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    async register(username, email, password) {
        try {
            const response = await axios.post('https://664d4854ede9a2b5565318dd.mockapi.io/login/users', {
                username,
                email,
                password
            });
            this.user = response.data;
            this.isAuthenticated = true;
        } catch (error) {
            console.error('Registration failed', error);
        }
    }

    logout() {
        this.user = null;
        this.isAuthenticated = false;
    }
}

export default new UserViewModel();
