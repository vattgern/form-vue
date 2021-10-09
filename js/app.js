const auth = Vue.createApp({});
auth.component('personal-blog',{
    template: `
    <div class="auth__form">
                <section>
                    <div id="forNum">
                        <label for="number">Телефон:</label>
                        <input type="text" name="number" id="number" placeholder="Введите телефон"
                            v-model="number">
                        <!-- ! Проверка на телефон -->
                        <small id="numCheck" :class="{ doneAll : isRightNum }">
                            <h2>
                                Телефон должен быть:
                            </h2>
                            <ul>
                                <li :class="{ done : isAllNumber }">
                                    Должен содержть только цифры
                                </li>
                                <li :class="{ done : isHaveLength }">
                                    Должен содержть 11 символов
                                </li>
                            </ul>
                        </small>
                    </div>
                    <div id="forPass">
                        <label for="pass">Пароль:</label>
                        <input type="password" name="pass" id="pass" placeholder="Введите пароль"
                        v-model="password">
                        <!-- ! Проверка пароля -->
                        <small id="passCheck" :class="{ doneAll : isAllTrue }">
                            <h2>
                                Пароль должен быть:
                            </h2>
                            <ul>
                                <li>
                                    <span :class="{ done : isMinLength }">Минимум 6 символов</span>,
                                </li>
                                <li>
                                    <span :class="{ done : isHaveNumber }">Содержать цифру(-ы)</span>
                                </li>
                                <li>
                                    <span :class="{ done : isHaveSpecial }">Содержать спец. символ(-ы)</span>
                                </li>
                                <li>
                                    <span :class="{ done : isMaxLength }">
                                        Максимум 30 символов
                                    </span>
                                </li>
                            </ul>
                        </small>
                    </div>
                    <button class="submit__btn" @click="checkForm">
                        Войти
                    </button>
                    <div :class = "{message}">
                        <strong :class="{ doneAll : this.message.notFound }">
                            Неправильно введены данные
                        </strong>
                        <strong :class="{ doneAll : this.message.backTo }">
                            Неверный пароль
                        </strong>
                    </div>
                </section>
            </div>
            <div v-if="isLogin" class="personal__blog">
                <h1>Вы попали за защищенную страницу</h1>
                <button @click="isLogin = false">
                    Выход
                </button>
            </div>
    `,
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
                'messageBox': true,
                notUser: true
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
                    this.message.backTo = false;
                }
            } else{
                this.password = '';
                this.number = '';
                this.message.notFound = false;
                setTimeout(() => {
                    this.message.notFound = true;
                }, 4000);
            }
        },
    }
});
auth.mount("#auth");