<template>
    <section class=" text-center text-lg-start">
        <div class="card mb-3">
            <div class="row g-0 d-flex align-items-center">
                <div class="col-lg-8 offset-md-2">
                    <div class="card-body py-5 px-md-5">

                        <form>
                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <input type="email" id="form2Example1" class="form-control" v-model="email" />
                                <label class="form-label" for="form2Example1">Email</label>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <input type="password" id="form2Example2" class="form-control" v-model="password"/>
                                <label class="form-label" for="form2Example2">Пароль</label>
                            </div>

                            <!-- Submit button -->
                            <button type="button" class="btn btn-primary btn-block" @click.prevent="loginUser({email, password})">Логин</button>
                            <router-link to="/register" class="btn btn-primary btn-block ml-4">К регистрации</router-link>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data: function(){
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapActions([
            'loginUser'
        ])
    }
}
</script>
