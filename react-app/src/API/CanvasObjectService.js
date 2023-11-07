import axios from "axios";

export default class CanvasObjectService {
    static apiLink = "http://xyla.istu.webappz.ru/asu/kursach/api/object/";

    static async deleteCanvasObjectFromCabinet(deviceId) {
        const response = await axios.post(this.apiLink + "deleteCanvasObjectFromCabinet.php", {id: deviceId})
    }

    static async addCanvasObjectToCabinet(deviceList) {
        const response = await axios.post(this.apiLink + "addCanvasObjectToCabinet.php", JSON.stringify(deviceList))
    }

    static async getAllCanvasObjectFromCabinet(cabinet) {
        const response = await axios.get(this.apiLink + "getAllCanvasObject.php?cabinet=" + cabinet)
        return response.data;
    }
}
