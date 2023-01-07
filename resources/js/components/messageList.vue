<template>
    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <div class="chat-container">
            <ul class="chat-box chatContainerScroll" style="max-height: 700px; overflow: scroll; height: 700px;">
                <message-item
                    v-for="message in messages"
                    :key="message.id"
                    :my="message.from_user_id == user.id"
                    :avatar="userAvatar(message.from_user_id)"
                    :name="userName(message.from_user_id)"
                    :message="message.text"
                    :time="message.created_at"
                    :for_me="message.to_user_id == user.id"
                >
                </message-item>
            </ul>
            <message-input></message-input>
        </div>
    </div>
</template>
<script>
    import messageItem from "./messageItem"
    import messageInput from "./messageInput"
    import {mapGetters} from "vuex"

    export default {
        components: {
            "message-item": messageItem,
            "message-input": messageInput,
        },
        computed: {
            ...mapGetters(['messages', 'user', 'users', 'userName', 'userAvatar']),
        },
    }
</script>
