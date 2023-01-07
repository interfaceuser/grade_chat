import {createStore} from 'vuex';
import {
    ApiGetUserProfile,
    ApiLoginUser,
    ApiLogout,
    ApiRegisterUser,
    ApiRenewChat,
    ApiSaveUserProfile,
    ApiSendMessage
} from './api'
import Swal from 'sweetalert2'
import router from './router'
import eventBus from "./eventBus"

const max_message_list_size = 10;

const store = createStore({
    state() {
        return {
            user_data: {
                id: null,
                name: '',
                avatar_file: null,
                avatar_path: '',
                email: '',
            },
            users: {},
            messages: [],
            last_message_id: 0,
            renew_chat_interval_id: null,
            search_user_string: '',
            currentMessageText: '',
        }
    },
    mutations: {
        setUser(state, user_data) {
            state.user_data = user_data;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setMessages(state, messages) {
            let current_len = state.messages.length;
            let new_len = messages.length;
            let delta = current_len + new_len - max_message_list_size;
            let current_messages = state.messages;
            if (delta > 0) {
                delta = Math.abs(delta);
                current_messages = current_messages.slice(delta, current_len);
            }
            state.messages = current_messages.concat(messages);
        },
        setLastMessageId(state, id) {
            state.last_message_id = id
        },
        setAvatarFileValue(state, file) {
            state.user_data.avatar_file = file
        },
        clearAvatarFileValue(state) {
            state.user_data.avatar_file = null
        },
        setChatRenewIntervalId(state, interval_id) {
            state.renew_chat_interval_id = interval_id
        },
        clearChatRenewIntervalId(state) {
            state.renew_chat_interval_id = null
        },
        clearState(state) {
            state.messages = []
            state.users = {}
            state.user_data = {
                id: null,
                name: '',
                avatarFile: null,
                avatarPath: '',
                email: '',
            }
            state.last_message_id = 0
        },
        setUserData(state, data) {
            state.user_data.id = data.userId
            state.user_data.name = data.userName
            state.user_data.email = data.userEmail
            state.user_data.avatar_path = data.userAvatar
        },
        setSearchUserString(state, string) {
            state.search_user_string = string
        },
        setToUser(state, userId) {
            state.to_user = userId
        },
        clearToUser(state) {
            state.to_user = null
        },
        addLinkToUser(state, username){
            let toUserSearchResult = state.currentMessageText.match(/@"[^\s]+"/);
            if(toUserSearchResult){
                if(toUserSearchResult.length){
                    state.currentMessageText = state.currentMessageText.substring(toUserSearchResult.index + toUserSearchResult[0].length + 1)
                }
            }
            state.currentMessageText = '@"' + username + '" ' + state.currentMessageText
        },
        setCurrentMessageText(state, message){
            state.currentMessageText = message
        },
    },
    actions: {
        async registerUser({state, commit}, data) {
            let result = await ApiRegisterUser(data)
            console.log(result)
            if (result.error == false) {
                await Swal.fire({
                    toast: true,
                    position: 'top',
                    timer: 2000,
                    timerProgressBar: true,
                    title: 'Регистрация успешна. Логиним в чат...',
                    icon: 'success',
                    showConfirmButton: false,
                })
                commit('clearState')
                commit('setUserData', result.data)
                router.push({name: 'chat'})
            } else {
                await Swal.fire({
                    toast: true,
                    position: 'top',
                    title: result.errors.join("<br>"),
                    icon: 'error',
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    closeOnClickOutside: true,
                })
            }
        },
        async loginUser({state, commit, dispatch}, data) {
            let result = await ApiLoginUser(data)
            if (result.error == false) {
                await Swal.fire({
                    toast: true,
                    position: 'top',
                    timer: 2000,
                    timerProgressBar: true,
                    title: 'Вход успешен. Заходим в чат...',
                    icon: 'success',
                    showConfirmButton: false,
                })
                commit("clearState")
                commit('setUserData', result.data)
                router.push({name: 'chat'})
            } else {
                await Swal.fire({
                    toast: true,
                    position: 'top',
                    timer: 2000,
                    timerProgressBar: true,
                    title: result.errors.join("<br>"),
                    icon: 'error',
                    showConfirmButton: false,
                })
            }

        },
        async logout({commit}) {
            commit("clearState")
            ApiLogout({})
        },
        profile() {
            router.push({name: 'profile'})
        },
        chat() {
            router.push({name: "chat"})
        },
        async saveUserProfile({state, dispatch, commit}) {
            let result = await ApiSaveUserProfile({name: state.user_data.name, avatar: state.user_data.avatar_file})
            if (result.error == false) {
                commit('clearAvatarFileValue')
                dispatch('getUserProfile')
                await Swal.fire({
                    toast: true,
                    position: 'top',
                    timer: 2000,
                    timerProgressBar: true,
                    title: 'Сохранено успешно.',
                    icon: 'success',
                    showConfirmButton: false,
                })
            }else{
                await Swal.fire({
                    toast: true,
                    position: 'top',
                    timer: 2000,
                    timerProgressBar: true,
                    title: result.errors.join("<br>"),
                    icon: 'error',
                    showConfirmButton: false,
                })
            }
        },
        async sendMessage({state, commit, dispatch, getters}, data) {
            data.from_user_id = state.user_data.id
            let toUserSearchResult = data.message.match(/@"[^\s]+"/);
            if(toUserSearchResult){
                if(toUserSearchResult.length){
                    let toUserName = toUserSearchResult[0].substring(2, toUserSearchResult[0].length - 1);
                    let toUserId = getters.userIdByName(toUserName)
                    if(toUserId){
                        data.to_user_id = toUserId
                    }
                    data.message = data.message.substring(toUserSearchResult.index + toUserSearchResult[0].length + 1)
                }
            }

            let result = await ApiSendMessage(data)
            dispatch('renewChat')
            return result
        },
        async getUserProfile({state, commit}) {
            let result = await ApiGetUserProfile()
            if (!result) {
                router.push({name: 'user.login'})
            }
            return result
            commit('setUserData', result)
        },
        async renewChat({state, commit}) {
            let data = {
                last_message_id: state.last_message_id
            }
            let result = await ApiRenewChat(data)
            if (result != null) {
                if (result.messages) {
                    commit('setMessages', result.messages)
                }
                if (result.users) {
                    commit('setUsers', result.users)
                }
                if (result.last_message_id) {
                    commit('setLastMessageId', result.last_message_id)
                }
                return true
            }
            return false

        },
        initChatRenew({commit, state, dispatch}) {
            if (state.renew_chat_interval_id == null) {
                let interval_id = setInterval(function () {
                    dispatch('renewChat')
                }, 5000)
                commit('setChatRenewIntervalId', interval_id)
            }
        },
        removeChatRenew({commit, state}) {
            if (state.renew_chat_interval_id != null) {
                clearInterval(state.renew_chat_interval_id)
                commit('clearChatRenewIntervalId')
            }
        }
    },
    getters: {
        messages(state) {
            return state.messages
        },
        user(state) {
            return state.user_data
        },
        users(state) {
            return state.users
        },
        userName: state => user_id => {
            if (state.users[user_id] !== undefined) {
                return state.users[user_id].name
            } else {
                return ''
            }
        },
        userAvatar: state => user_id => {
            if (state.users[user_id] !== undefined) {
                return state.users[user_id].avatar
            } else {
                return null
            }
        },
        searchUserString(state) {
            return state.search_user_string
        },
        currentMessageText(state){
            return state.currentMessageText
        },
        userIdByName: state => userName => {
            for(var key in state.users){
                if(state.users[key].name == userName){
                    return key
                }
            }
            return null
        },
    }
});

export default store;
