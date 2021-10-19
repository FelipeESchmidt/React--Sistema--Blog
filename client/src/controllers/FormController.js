class FormController {

    constructor(){
        this.types = {
            "text": [
                {
                    regex: `[A-Za-z1-9 ]{2,}`,
                    messageIfNot: "Precisa ter no mínimo 2 caracteres"
                },
            ],
            "body": [
                {
                    regex: `[A-Za-z1-9 ]{10,}`,
                    messageIfNot: "Precisa ter no mínimo 10 caracteres"
                },
            ]
        }
    }

    validate(fieldValue, type){
        let tester;
        const fieldTested = {
            error: false,
            messages: []
        }
        for (let testId in this.types[type]){
            tester = null;
            tester = new RegExp(this.types[type][testId].regex, 'g');
            if(!tester.exec(fieldValue)){
                fieldTested.error = true;
                fieldTested.messages.push(this.types[type][testId].messageIfNot);
            }
        }
        return fieldTested;
    }

    createRandomId(){
        return Math.random().toString(36).substr(2, 22) + Math.random().toString(36).substr(2, 22);
    }

    createPath(string){
        return string.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase();
    }

}

export default FormController;