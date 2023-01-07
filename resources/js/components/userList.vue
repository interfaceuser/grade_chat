<template>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <div class="users-container">
            <user-search-field></user-search-field>
            <ul class="users">
                <user-item
                v-for="user in filteredUsers"
                :key="user.id"
                :id = "user.id"
                :avatar="user.avatar"
                :name="user.name"
                :last_activity="user.last_activity"
                @dblclick="addLinkToUser(user.name)"
                ></user-item>
            </ul>
        </div>
    </div>
</template>

<script>
import userItem from "./userItem"
import userSearchField from "./userSearchField"
import {mapGetters, mapMutations} from 'vuex'

    export default {
        components: {
            "user-item": userItem,
            "user-search-field": userSearchField,
        },
        computed: {
            ...mapGetters(['users', 'searchUserString']),
            filteredUsers: function(){
                if(!this.searchUserString){
                    return this.users
                }
                let result = []
                for(let id in this.users){
                    let user = this.users[id]
                    if(user.name.indexOf(this.searchUserString) >= 0){
                        result.push(user)
                    }
                }
                return result
            }
        },
        methods: {
            ...mapMutations(['addLinkToUser'])
        },
    }
</script>
