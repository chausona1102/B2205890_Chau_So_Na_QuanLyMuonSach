<template>
    <div class="container-fluid">
        <div class="row d-flex" style="height: 100vh;">
            <div class="col-2 bg-danger text-white p-3 d-flex flex-column justify-content-between"
                style="position: fixed; left: 0; top: 0; height: 100vh; width: 16.666%;">

                <AdminSidebar />

            </div>

            <div class="col-10 p-3" style="margin-left: 16.666%; overflow-y: auto;">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import AdminSidebar from "@/components/AdminSidebar.vue";

export default {
    components: { AdminSidebar },
};
</script>

<style scoped></style>
