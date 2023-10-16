class Device {
    constructor(deviceType,cabinet, data, inputDataProps) {
        this.id = null;
        this.name = null
        this.type = deviceType;
        this.cabinet = cabinet
        this.x = 50;
        this.y = 50;
        this.sX = 1;
        this.sY = 1;
        this.rotation = 0;
        this.data = data
        this.inputDataProps = inputDataProps
    }

    setPosition(x,y) {
        this.x = x;
        this.y = y;
    }

    setScaleAndRotation(sX,sY,rotation) {
        this.sX = sX;
        this.sY = sY;
        this.rotation = rotation;
    }

    createFormInputs(){


        let deviceName =  "<td><label>"+this.name+"</label></td>"


        let inputs =  Object.keys(this.inputDataProps);
        let inputsSting = "";

        inputs.forEach((input)=>
            {
                let inputType = this.inputDataProps[input].type;
                let inputName = (this.inputDataProps[input].name+this.name[this.name.length-1]);
                let inputPlaceholder = this.inputDataProps[input].placeholder;
                let inputValue = this.data[input] === null ? "" :  this.data[input];

                let inputElement = document.createElement('input');
                inputElement.className="w-100"

                inputElement.type = inputType;
                inputElement.name = inputName;
                inputElement.placeholder = inputPlaceholder;
                inputElement = inputElement.outerHTML;
                inputElement = inputElement.replace(">", " value='"+inputValue+"' required>")
                let hiddenInput = "<input type='hidden' name='computer-name' value='"+this.name+"'>"

                inputsSting += "<td class='border border-dark' ><label>"+input+"</label>"+(inputElement+ hiddenInput )+"</td>"
            }
        )

        return deviceName + inputsSting;
    }

    updateData(formData) {
        let keys =  Object.keys(this.inputDataProps);

        keys.forEach((key)=> {
            this.data[key]=formData.get((this.inputDataProps[key].name+this.name[this.name.length-1]))
        })

        return this.data
    }

}