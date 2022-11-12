<template>
    <div class="container">

        <!-- Page header start -->
        <div class="page-title">
            <div class="row gutters">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h5 class="title">Chat App</h5>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
            </div>
        </div>
        <!-- Page header end -->

        <!-- Content wrapper start -->
        <div class="content-wrapper">

            <!-- Row start -->
            <div class="row gutters">

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                    <div class="card m-0">

                        <!-- Row start -->
                        <div class="row no-gutters">
                            <user-list></user-list>
                            <message-list></message-list>
                        </div>
                        <!-- Row end -->
                    </div>

                </div>

            </div>
            <!-- Row end -->

        </div>
        <!-- Content wrapper end -->

    </div>
</template>

<script>
import userList from "./components/userList";
import messageList from "./components/messageList";

export default {
    components: {
        'user-list': userList,
        'message-list': messageList,
    }
}
</script>
