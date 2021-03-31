<template>
    <div id="column-list">
        <div class="header-box">
            <p class="'title">专栏作者</p>
            <p class="text">区块链行业最有思想的 KOL 聚集地，成为专栏作者，让更多人看到您的观点</p>
        </div>
        <List
            v-if="listData.length !== 0 || !finished"
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list"
        >
            <router-link v-for="item in listData" :key="item.id" :to="'/column-details/' + item.id">
                <van-row type="flex" align="top" class="item">
                    <van-image round lazy-load :src="item.avatar" class="img" />
                    <div class="right">
                        <p class="title">{{ item.name }}</p>
                        <p class="text">文章数&nbsp;{{ item.experience }}&nbsp;浏览量&nbsp;{{ item.read_cnt }}</p>
                        <p class="introduce van-multi-ellipsis--l2">作者简介：{{ item.description || '暂无'}}</p>
                    </div>
                </van-row>
            </router-link>
        </List>
        <basic-footer />
    </div>
</template>

<script>
import { List } from 'vant'
export default {
    name: 'column-list',
    components: {
        List
    },
    data () {
        return {
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
            if (listData.length === 0) this.finished = true
            else this.listData.push.apply(this.listData, listData)
            this.isLoading = false
        },
        async getList (pageIndex) {
            return await this.$api.get('https://www.bitcoin86.com/api_v2/index.php/api/author/author_list', {
                p: pageIndex
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#column-list {
    background: #fff;
    padding: 34px 34px 0;
    .header-box {
        height: 200px;
        border-radius: 10px;
        margin-bottom: 40px;
        background: #1077ec;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: #fff;
        text-align: center;
        line-height: 2;
        .text {
            padding: 0 70px;
            font-size: 24px;
            line-height: 1.5;
        }
    }
    .item {
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
            font-size: 32px;
            font-weight: 700;
            color: #333;
        }
        .text {
            margin-bottom: 12px;
        }
    }
}
</style>
