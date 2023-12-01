import axios from "axios"
import RequestTemplateService from "./RequestTemplateService";

export default class RequestService {

    static apiLink = "http://xyla.istu.webappz.ru/asu/kursach/api/request/";

    static async getAllRequest() {
        const response = await axios.get(this.apiLink + "getAllRequests.php")
        const templates = await RequestTemplateService.getAllRequestTemplates()
        let data = [];
        response.data.forEach((el) => {
            let temp = templates.find((elem)=> elem.id == el.template)
            data.push(
                {
                    name: temp.name,
                    createDate: el.create_date,
                    status: el.status,
                    id: el.id,
                    data: JSON.parse(el.data),
                    template:temp
                }
            )
        })
        return data;
    }

    static async getAllUserRequest(username) {
        const response = await axios.get(this.apiLink + "getAllRequests.php")
        const templates = await RequestTemplateService.getAllRequestTemplates()
        let data = [];
        response.data.forEach((el) => {
            let temp = templates.find((elem)=> elem.id == el.template)
            if(JSON.parse(el.data)[0] === username) {
                data.push(
                    {
                        name: temp.name,
                        createDate: el.create_date,
                        status: el.status,
                        id: el.id,
                        data: JSON.parse(el.data),
                        template:temp
                    }
                )
            }
        })
        return data;
    }

    static async deleteRequest(id) {
        const response = await axios.post(this.apiLink + "deleteRequest.php", {id: id})
    }

    static async addRequest(request) {
        const response = await axios.post(this.apiLink + "addRequest.php", JSON.stringify([request]))
    }

}