<template>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
        <div class="users-container">
            <user-search-field></user-search-field>
            <ul class="users">
                <user-item></user-item>
                <user-item></user-item>
                <user-item></user-item>
                <user-item></user-item>
                <user-item></user-item>
                <user-item></user-item>
            </ul>
        </div>
    </div>
</template>

<script>
import userItem from "./userItem"
import userSearchField from "./userSearchField"

    export default {
        components: {
            "user-item": userItem,
            "user-search-field": userSearchField,
        }
    }
</script>
