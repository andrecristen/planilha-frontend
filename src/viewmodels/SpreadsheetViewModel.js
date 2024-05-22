import axios from "axios";
import { makeAutoObservable } from "mobx";
import UserViewModel from "./UserViewModel";

class SpreadsheetViewModel {
    spreadsheets = [];

    constructor() {
        makeAutoObservable(this);
    }

    getApi() {
        return axios.create({
            baseURL: process.env.REACT_APP_API_IMPORT,
            headers: {
                "Accept": "*/*",
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + UserViewModel.user.access_token
            }
        });
    }

    async uploadSpreadsheet(name, content) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("user", UserViewModel.user.email);
        formData.append("file", new Blob([content], { type: "text/csv" }), name);

        try {
            const response = await this.getApi().post("/uploadfile/", formData);
            this.spreadsheets.push({ name, content, id: response.data.id });
        } catch (error) {
            console.error("Failed to upload spreadsheet:", error);
            throw error;
        }
    }

    getSpreadsheets() {
        return this.spreadsheets;
    }
}

export default new SpreadsheetViewModel();