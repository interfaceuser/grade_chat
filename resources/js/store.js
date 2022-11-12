import {createStore} from 'vuex';

const maxMessageListSize = 100;

const store = createStore({
    state () {
        return {
            userData: {
                id: null,
                token: null,
                refreshToken: null,
                name: null,
                avatar: null
            },
            users: [
                {
                    id: null,
                    name: null,
                    avatar: null
                }
            ],
            messages: [
                {
                    id: null,
                    text: null,
                    time: null,
                    fromUser: null,
                    toUser: null,
                }
            ]
        }
    },
    mutations: {
        setUser(state, userData){
            state.userData = userData;
        },
        setUsers(state, users){
            state.users = users;
        },
        setMessages(state, messages){
            let currentLen = state.messages.length();
            let newLen = messages.length();
            let delta = currentLen + newLen - maxMessageListSize;
            let currentMessages = state.messages;
            if(delta > 0){
                delta = Math.abs(delta);
                currentMessages = currentMessages.slice(delta, currentLen);
            }
            state.messages = currentMessages.concat(messages);
        }

    },
    actions: {

    },
    getters: {

    }
});

export default store;
