<template>
    <div id="news">
        <van-nav-bar fixed left-arrow @click-left="$router.push('home')" placeholder title="快讯" />
        <NewsFlash />
    </div>
</template>

<script>
import NewsFlash from '../components/news-flash'

export default {
    name: 'news',
    components: {
        NewsFlash
    },
    data () {
        return {
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
#news {

}
</style>
