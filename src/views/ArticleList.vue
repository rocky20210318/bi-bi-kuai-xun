<template>
    <div id="article-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder :title="title" />
        <Empty description="暂无相关文章" />
    </div>
</template>

<script>
import { Empty } from 'vant'

export default {
    name: 'articleList',
    components: {
        Empty
    },
    data () {
        return {
            title: this.$route.query.title
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
<style lang="scss">
#article-list {
}
</style>
<style lang="scss" scoped>
#article-list {

}
</style>
