import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class UserViewModel {

    user = null;
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
    }

    getApi() {
        return axios.create({
            baseURL: process.env.REACT_APP_API_AUTH,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    async login(email, password) {
        try {
            const response = await this.getApi().post("/auth", {
                email,
                password
            });
            if (response.data.access_token) {
                this.user = response.data;
                this.isAuthenticated = true;
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    async register(fullname, email, password) {
        try {
            const response = await this.getApi().post("/signup", {
                fullname,
                email,
                password
            });
            console.log(response);
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
