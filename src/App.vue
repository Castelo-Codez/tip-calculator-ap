<script setup>
import parent from "./assets/components/parent.vue";
import {onMounted} from "vue";
onMounted(() => {
    let $targetObj = {
        bill: null,
        percentage: null,
        nmberOfPeople: null,
    };
    window.localStorage.setItem("target-obj", JSON.stringify($targetObj));
});
</script>
<template>
    <parent />
</template>
