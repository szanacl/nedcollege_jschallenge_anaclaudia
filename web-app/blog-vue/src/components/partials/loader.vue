
<template>
    <div>
      <spinner :color="'#3B8070'" :size="'medium'"></spinner>
    </div>
</template>

<script>
    import Spinner from 'vue-spinner/src/ScaleLoader.vue';

export default {
    name: 'loader',
    components: { Spinner }
}
</script>

<style scoped></style>