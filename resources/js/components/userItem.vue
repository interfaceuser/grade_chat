<template>
    <li class="person" :data-chat="id">
        <div class="user">
            <img :src="avatar" :alt="id+name">
            <span class="status"></span>
        </div>
        <p class="name-time">
            <span class="name">{{ name }}</span>
            <span class="time">{{ last_activity }}</span>
        </p>
    </li>
</template>
<script>
export default {
    props: {
        id: '',
        avatar: '',
        name: '',
        last_activity: '',
    }
}
</script>
