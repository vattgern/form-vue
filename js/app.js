const auth = Vue.createApp({
    data() {
        return {
            dataBase: {
                "number" : [8986858415, 89613986822],
                "password" : ["Zirael4587&", "mum4587&"]
            },
            isLogin: false,
            message: {
                // * Вывод о ненайденном пользователе
                notFound: true,
                // * Вывод окна о пароле и телефоне
                backTo: true,
                'messageBox': true
            },
            password: '',
            isMinLength: false,
            isHaveNumber: false,
            isHaveSpecial: false,
            isMaxLength: false,
            isAllTrue: false,
            number: '',
            isAllNumber: false,
            isHaveLength: false,
            isRightNum: false,
        }
    },
    watch:{
        password(){
            this.isMinLength = (this.password.length > 5);
            this.isHaveNumber = /\d/.test(this.password);
            this.isHaveSpecial = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
            this.isMaxLength = (this.password.length < 31);
            this.isAllTrue = (this.isHaveNumber == true) && (this.isMinLength == true)
                            && (this.isMaxLength == true) && (this.isHaveSpecial == true);
        },
        number(){
            this.isHaveLength = (this.number.length == 11);
            this.isAllNumber = /[0-9]{3}[0-9]{3}[0-9]{4}/.test(this.number);
            this.isRightNum = (this.isHaveLength == true) && (this.isAllNumber == true);
        }
    },
    methods: {
        checkForm(){
            if(this.isAllTrue && this.isRightNum){
                this.backTo = true;
                let index = 0;
                for (const elem of this.dataBase["number"]) {
                    if(this.number == elem){
                        index++;
                    }
                }
                if(this.password == this.dataBase["password"][index]){
                    this.password = '';
                    this.number = '';
                    this.isLogin = true;
                } else{
                    this.password = '';
                    this.number = '';
                    this.message.notFound = false;
                }
            } else{
                this.password = '';
                this.number = '';
                this.backTo = false;
            }
        },
        exit(){
            this.isLogin = false;
        }
    },
}).component('personal-blog',{
    methods: {
        dead(){
            let block = document.querySelector(".personal__blog").remove();
        }
    },
    template: `
        <div class="personal__blog">
            <h1>Вы попали за защищенную страницу</h1>
            <button @click="dead">
                Выход
            </button>
        </div>
    `
});
auth.mount("#auth");