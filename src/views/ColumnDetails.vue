<template>
    <div id="column-details">
        <van-nav-bar fixed left-arrow @click-left="$router.go('-1')" placeholder title="作家专栏" />
        <van-row type="flex" align="top" class="details">
            <van-image round lazy-load :src="details.avatar" class="img" />
            <div class="right">
                <p class="title">{{ details.name }}</p>
                <p class="text">文章数&nbsp;{{ details.experience }}&nbsp;浏览量&nbsp;{{ details.read_cnt }}</p>
                <p class="introduce van-multi-ellipsis--l2">作者简介：{{ details.description || '暂无'}}</p>
            </div>
        </van-row>
        <p class="title">最新文章</p>
        <List
            v-if="listData.length !== 0 || !finished"
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list"
        >
            <router-link v-for="item in listData" :key="item.id" :to="'/column-news/' + item.id">
                <van-row type="flex" align="top" class="item">
                    <div class="left">
                        <p class="title van-multi-ellipsis--l2">{{ item.title }}</p>
                        <p class="time">{{ format(item.inputtime * 1000, 'YYYY-MM-dd HH:mm') }}</p>
                    </div>
                    <van-image lazy-load :src="item.thumb" class="img" />
                </van-row>
            </router-link>
        </List>
    </div>
</template>

<script>
import { List } from 'vant'
import { format } from '../utils/index'

export default {
    name: 'column-details',
    components: {
        List
    },
    data () {
        return {
            id: this.$route.params.id,
            details: {},
            isLoading: false,
            finished: false,
            pageIndex: 0,
            pageSize: 10,
            listData: []
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        async onLoad () {
            this.pageIndex++
            const listData = await this.getList(this.pageIndex)
            if (listData.news_data.length === 0) this.finished = true
            else {
                this.details = { ...listData }
                delete this.details.news_data
                this.listData.push.apply(this.listData, listData.news_data)
            }
            // console.log(this.listData)
            this.isLoading = false
        },
        async getList (pageIndex) {
            return await this.$api.get('https://www.bitcoin86.com/api_v2/index.php/api/author/author_detail', {
                uid: this.id,
                p: pageIndex
            })
        },
        format (date, fmt) {
            return format(new Date(date), fmt)
        }
    }
}
</script>
<style lang="scss" scoped>
#column-details {
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
    > .title {
        position: relative;
        padding-left: 30px;
        margin-bottom: 34px;
        font-size: 34px;
        color: #333;
        font-weight: 700;
        &::after {
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 6px;
            height: 80%;
            margin: auto;
            background: #1077ec;
        }
    }
    .list {
        .item {
            margin-bottom: 50px;
        }
        .left {
            flex: 1;
            width: 300px;
            .title {
                margin-bottom: 30px;
                font-size: 38px;
            }
        }
        .img {
            width: 250px;
            margin-left: 10px;
            border-radius: 6px;
            overflow: hidden;
        }
    }
}
</style>
