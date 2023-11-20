import axios from "axios"

export default class CabinetService {

    static apiLink = "http://xyla.istu.webappz.ru/asu/kursach/api/cabinet/";

    static async getAllCabinets() {
        const response = await axios.get(this.apiLink + "getCabinetList.php")
        return response.data;
    }

    static async getCabinet(cabinetNumber) {
        const response = await axios.get(this.apiLink + "getCabinet.php?number="+cabinetNumber)
        return response.data;
    }

    static async addCabinet(number) {
        const createCab = await axios.post(this.apiLink + "createCabinet.php", number)
        return createCab
    }

    static async addSVG(fileData) {
        const svg = await axios.post(this.apiLink + 'addSVG.php', fileData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async deleteCabinet(json) {
        const del = await axios.post(this.apiLink + "deleteCabinet.php", json)
        return del
    }
}