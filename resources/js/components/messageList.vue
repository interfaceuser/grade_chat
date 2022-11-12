<template>
    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <div class="chat-container">
            <ul class="chat-box chatContainerScroll">
                <message-item my="true"></message-item>
                <message-item></message-item>
                <message-item my="true"></message-item>
                <message-item></message-item>
                <message-item></message-item>
                <message-item></message-item>
                <message-item></message-item>
            </ul>
            <message-input></message-input>
        </div>
    </div>
</template>
<script>
    import messageItem from "./messageItem"
    import messageInput from "./messageInput"

    export default {
        components: {
            "message-item": messageItem,
            "message-input": messageInput,
        }
    }
</script>
