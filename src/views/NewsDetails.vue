<template>
    <div id="news-details">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="快讯详情" />
        <p class="title">{{ activeNewsDetails.title }}</p>
        <p class="time-browse">
            <span class="time">123123</span>
            <span class="browse"><van-icon name="eye-o" />123</span>
        </p>
        <p class="description">{{ activeNewsDetails.description }}</p>
        <van-row type="flex" justify="space-between" align="center" class="">
            <router-link to="" v-if="previousNewsDetails" class="previous van-ellipsis">上一篇：{{ previousNewsDetails.title }}</router-link>
            <router-link to="" v-if="nextNewsDetails" class="next van-ellipsis">下一篇：{{ nextNewsDetails.title }}</router-link>
        </van-row>
    </div>
</template>

<script>

export default {
    name: 'newsDetails',
    components: {
    },
    data () {
        return {
            id: this.$route.params.id,
            activeNewsDetails: JSON.parse(localStorage.getItem('activeNewsDetails')),
            previousNewsDetails: localStorage.getItem('previousNewsDetails') ? JSON.parse(localStorage.getItem('previousNewsDetails')) : null,
            nextNewsDetails: localStorage.getItem('nextNewsDetails') ? JSON.parse(localStorage.getItem('nextNewsDetails')) : null
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
#news-details {
    height: 100%;
    .iframe {
        height: 100%;
    }
}
</style>
