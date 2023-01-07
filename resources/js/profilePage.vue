<template>
    <div class="container">
        <div class="page-title">
            <div class="row gutters">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h5 class="title">Профиль юзера</h5>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" style="display: flex;justify-content: end;">
                    <a href="#!" @click.prevent="chat()" class="m-3">Чат</a>
                    <a href="#!" @click.prevent="logout()" class="m-3">Выйти</a>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="row gutters">
                <form>
                    <div class="form-outline mb-4">
                        <p>Email: {{user.email}}</p>
                    </div>
                    <div class="form-outline mb-4">
                        <input type="text" id="form2Example1" class="form-control" v-model="user.name" />
                        <label class="form-label" for="form2Example1">Имя</label>
                    </div>
                    <div class="form-outline mb-4">
                        <img :src="user.avatar_path" alt="">
                    </div>
                    <div class="form-outline mb-4">
                        <input type="file" id="form2Example2" class="form-control" ref="avatar" @change="fileUpload()"/>
                        <label class="form-label" for="form2Example2">Аватар</label>
                    </div>
                    <button type="button" class="btn btn-primary btn-block" @click.prevent="saveUserProfile()">Сохранить</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['logout', 'chat', 'saveUserProfile', 'getUserProfile']),
        ...mapMutations(['setAvatarFileValue']),
        fileUpload(){
            this.setAvatarFileValue(this.$refs.avatar.files[0])
        },
    },
    async mounted(){
        this.getUserProfile()
    }
}
</script>
