const password = Vue.createApp({
    data() {
        return {
            password: '',
            isMinLength: false,
            isHaveNumber: false,
            isHaveSpecial: false,
            isMaxLength: false,
            isAllTrue: false
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
        }
    }
});
password.mount('#forPass');
const callNumber = Vue.createApp({
    data() {
        return {
            text: '',
            isAllNumber: false,
            isHaveLength: false,
            isRightNum: false,
        }
    },
    watch:{
        text(){
            this.isHaveLength = (this.text.length == 11);
            this.isAllNumber = /[0-9]{3}[0-9]{3}[0-9]{4}/.test(this.text);
            this.isRightNum = (this.isHaveLength == true) && (this.isAllNumber == true);
        }
    }
});
callNumber.mount("#forNum");