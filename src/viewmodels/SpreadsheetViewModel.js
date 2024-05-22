import { makeAutoObservable } from "mobx";

class SpreadsheetViewModel {
    spreadsheets = [];

    constructor() {
        makeAutoObservable(this);
    }

    uploadSpreadsheet(name, content) {
        this.spreadsheets.push({ name, content });
    }

    getSpreadsheets() {
        return this.spreadsheets;
    }
}

export default new SpreadsheetViewModel();
