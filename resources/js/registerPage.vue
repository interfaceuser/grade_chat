<template>
    <section class=" text-center text-lg-start">
        <div class="card mb-3">
            <div class="row g-0 d-flex align-items-center">
                <div class="col-lg-8 offset-md-2">
                    <div class="card-body py-5 px-md-5">

                        <form>
                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <input type="email" id="email" class="form-control" />
                                <label class="form-label" for="email">Email address</label>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <input type="password" id="passwd" class="form-control" />
                                <label class="form-label" for="passwd">Password</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" id="passwdConfirm" class="form-control" />
                                <label class="form-label" for="passwdConfirm">Password confirm</label>
                            </div>


                            <!-- Submit button -->
                            <button type="button" class="btn btn-primary btn-block mb-4">Register</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>
