<template>
    <li class="chat-left" v-if="my ==false">
        <div class="chat-avatar">
            <img :src="avatar">
            <div class="chat-name">{{name}}</div>
        </div>
        <div class="chat-text"><p :class="{'personal-message': for_me}">{{message}}</p></div>
        <div class="chat-hour">{{formatDate(time)}} <span class="fa fa-check-circle"></span></div>
    </li>
    <li class="chat-right" v-else>
        <div class="chat-hour">{{formatDate(time)}} <span class="fa fa-check-circle"></span></div>
        <div class="chat-text"><p :class="{'personal-message': for_me}">{{message}}</p></div>
        <div class="chat-avatar">
            <img v-if="avatar" :src="avatar">
            <div class="chat-name">{{name}}</div>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        my: Boolean,
        avatar: String,
        name: String,
        message: String,
        time: String,
        for_me: Boolean,
    },
    methods:{
        formatDate: function(value){
            if(!value){
                return ''
            }
            let date = new Date(Date.parse(value));
            return date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        }
    }
}
</script>
