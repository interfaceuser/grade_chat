<template>
    <div class="chat-search-box">
        <div class="input-group">
            <input class="form-control" placeholder="Search" v-model="searchUserStringValue">
            <div class="input-group-btn">
                <i class="fa fa-search"></i>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
    export default {
        computed: {
            searchUserStringValue: {
                get: function(){
                    return this.searchUserString
                },
                set: function(value){
                    this.setSearchUserString(value)
                }
            },
            ...mapGetters(['searchUserString'])
        },
        methods: {
            ...mapMutations(['setSearchUserString'])
        }
    }
</script>
