<template>
    <section class=" text-center text-lg-start">
        <div class="card mb-3">
            <div class="row g-0 d-flex align-items-center">
                <div class="col-lg-8 offset-md-2">
                    <div class="card-body py-5 px-md-5">

                        <form>
                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <input type="email" id="email" class="form-control" v-model="email"/>
                                <label class="form-label" for="email">Email</label>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <input type="password" id="passwd" class="form-control" v-model="password"/>
                                <label class="form-label" for="passwd">Пароль</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" id="passwdConfirm" class="form-control" v-model="password_confirmation"/>
                                <label class="form-label" for="passwdConfirm">Подтверждение пароля</label>
                            </div>


                            <!-- Submit button -->
                            <button type="button" class="btn btn-primary btn-block" @click.prevent="registerUserSend({email, password, password_confirmation})">Регистрация</button>
                            <router-link to="/login" class="btn btn-primary btn-block ml-4">К логину</router-link>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions} from "vuex";
export default {
    data: function(){
        return {
            email: '',
            password: '',
            password_confirmation: '',
        }
    },
    methods: {
        ...mapActions(['registerUser']),
        registerUserSend: async function(data){
            await this.registerUser(data)
        }
    },

}
</script>
