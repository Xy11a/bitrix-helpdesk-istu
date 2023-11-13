import axios from "axios"

export default class RequestTemplate {

    static apiLink = "http://xyla.istu.webappz.ru/asu/kursach/api/requestTemplate/";

    static async getAllRequestTemplates() {
        const response = await axios.get(this.apiLink + "getAllRequestTemplates.php")
        let data = [];
        response.data.forEach((el) => {
            data.push(
                {
                    name: el.name,
                    type: el.type,
                    id: el.id,
                    options: JSON.parse(el.options),
                    inputDataProps: JSON.parse(el.inputDataProps),
                    data: JSON.parse(el.data)
                }
            )
        })

        return data;
    }

    static async deleteRequestTemplate(id) {
        const response = await axios.post(this.apiLink + "deleteRequestTemplate.php", {id: id})
    }

    static async addRequestTemplate(request) {
        const response = await axios.post(this.apiLink + "addRequestTemplate.php", JSON.stringify([request]))
    }

}