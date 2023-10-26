import axios from "axios"

export default class DeviceService {

    static apiLink = "http://xyla.istu.webappz.ru/asu/kursach/api/device/";

    static async getAllDevicesFromCabinet(cabinet) {
        const response = await axios.get(this.apiLink + "getCabinetDevices.php?cabinet=" + cabinet)
        return response.data;
    }

    static async deleteDeviceFromCabinet(deviceId) {
        const response = await axios.post(this.apiLink + "removeDeviceFromCabinet.php", {id: deviceId})
    }

    static async addDeviceToCabinet(deviceList) {
        const response = await axios.post(this.apiLink + "addDeviceToCabinet.php", JSON.stringify(deviceList))
    }

}