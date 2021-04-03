<template>
    <div id="follow-list">
        <van-nav-bar fixed left-arrow @click-left="$router.go('-1')" placeholder :title="title" />
        <template>
            <van-row v-for="item in listData" :key="item.id" type="flex" align="top" class="details" @click="$router.push('/column-details/' + item.id)">
                <van-image round lazy-load :src="item.avatar" class="img" />
                <div class="right">
                    <p class="title">{{ item.name }}</p>
                    <p class="text">文章数&nbsp;{{ item.experience }}&nbsp;浏览量&nbsp;{{ item.read_cnt }}</p>
                    <p class="introduce van-multi-ellipsis--l2">作者简介：{{ item.description || '暂无'}}</p>
                </div>
            </van-row>
        </template>
        <Empty v-if="listData.length === 0"/>
    </div>
</template>

<script>
import { Empty } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'follow-list',
    components: {
        Empty
    },
    data () {
        return {
            title: this.$route.query.title,
            listData: []
        }
    },
    computed: {
    },
    async created () {
        if (this.title === '关注') this.getList()
    },
    mounted () {
    },
    methods: {
        getList () {
            const User = AV.Object.createWithoutData('_User', AV.User.current().id)
            console.log(User)
            User.fetch().then(data => {
                this.listData = data.get('watchList')
            })
            console.log(this.listData)
        }
    }
}
</script>
<style lang="scss" scoped>
#follow-list {
    min-height: 100%;
    background: #fff;
    padding: 34px 34px 0;
    .details {
        margin-bottom: 50px;
        padding: 34px;
        box-shadow: 0 6px 18px rgb(0 0 0 / 8%);
        border-radius: 6px;
        .img {
            width: 140px;
            height: 140px;
            margin-right: 30px;
        }
        .right {
            flex: 1 0;
            line-height: 1.5;
            font-size: 24px;
            color: #666;
        }
        .title {
            margin-bottom: 12px;
            font-size: 36px;
            font-weight: 700;
            color: #333;
        }
        .text {
            margin-bottom: 12px;
        }
    }
}
</style>
