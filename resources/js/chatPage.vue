<template>
    <div class="container">
        <div class="page-title">
            <div class="row gutters">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h5 class="title">Chat App</h5>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" style="display: flex;justify-content: end;">
                    <a href="#!" @click.prevent="profile()" class="m-3">Профиль</a>
                    <a href="#!" @click.prevent="logout()" class="m-3">Выйти</a>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="card m-0">
                        <div class="row no-gutters">
                            <user-list></user-list>
                            <message-list></message-list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userList from "./components/userList";
import messageList from "./components/messageList";
import {mapActions} from "vuex";

export default {
    components: {
        'user-list': userList,
        'message-list': messageList,
    },
    methods: {
        ...mapActions(['logout', 'profile', 'initChatRenew', 'removeChatRenew', 'getUserProfile', 'renewChat'])
    },
    async mounted(){
        let result = await this.getUserProfile()
        result = result && await this.renewChat()
        if(result){
            this.initChatRenew()
        }
    },
    beforeUnmount(){
        this.removeChatRenew()
    }
}
</script>
