<template>
    <div class="form-group mt-3 mb-0">
        <textarea class="form-control" rows="3" placeholder="Type your message here..." @keyup.enter="sendChatMessage(message)" v-model="message"></textarea>
    </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    computed: {
        message: {
            get: function () {
                return this.currentMessageText
            },
            set: function (value) {
                this.setCurrentMessageText(value)
            }
        },
        ...mapGetters(['currentMessageText'])
    },
    methods: {
        async sendChatMessage(message){
          let result = await this.sendMessage({message})
            if(result){
                this.message = '';
            }
        },
        ...mapActions(['sendMessage']),
        ...mapMutations(['setCurrentMessageText'])
    }
}
</script>
