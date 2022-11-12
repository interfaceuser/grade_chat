<template>
    <li class="chat-left" v-if="my ==false">
        <div class="chat-avatar">
            <img :src="avatar" alt="Retail Admin">
            <div class="chat-name">{{name}}</div>
        </div>
        <div class="chat-text">{{message}}</div>
        <div class="chat-hour">{{time}} <span class="fa fa-check-circle"></span></div>
    </li>
    <li class="chat-right" v-else>
        <div class="chat-hour">{{time}} <span class="fa fa-check-circle"></span></div>
        <div class="chat-text">{{message}}</div>
        <div class="chat-avatar">
            <img :src="avatar" alt="Retail Admin">
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
    }
}
</script>
