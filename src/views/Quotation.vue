<template>
    <div id="quotation">
        <h1 class="title">热门币种</h1>
        <van-row type="flex" justify="space-between" align="center" class="hot">
            <router-link class="item" to="/quotation/2548?title=BTC">
                <van-image round lazy-load src="https://www.ibtcchina.com/static/images/currency/btc.png" class="img" />
                <p class="title">比特币</p>
                <p class="text">Bitcoin · BTC</p>
            </router-link>
            <router-link round class="item" to="/quotation/2706?title=LTC">
                <van-image lazy-load src="https://www.ibtcchina.com/static/images/currency/ltc.png" class="img" />
                <p class="title">莱特币</p>
                <p class="text">Litecoin · LTC</p>
            </router-link>
            <router-link class="item" to="/quotation/2549?title=ETH">
                <van-image round lazy-load src="https://www.ibtcchina.com/static/images/currency/eth.png" class="img" />
                <p class="title">以太坊</p>
                <p class="text">Ethereum · ETH</p>
            </router-link>
        </van-row>
        <h1 class="title">市值排行榜</h1>
        <List
            v-if="listData.length !== 0 || !finished"
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list"
        >
            <van-row class="title">
                <van-col span="2">#</van-col>
                <van-col span="10">币种</van-col>
                <van-col span="6">最新价格</van-col>
                <van-col span="6">市值</van-col>
            </van-row>
            <van-row type="flex" align="center" v-for="(item, index) in listData" :key="item.currency" class="item" @click="jump(item)">
                <van-col span="2" class="index">{{ index + 1}}</van-col>
                <van-col span="10">
                    <van-row type="flex" align="center" class="title-img">
                        <van-image round lazy-load :src="item.imageUrl" class="img" />
                        <div>
                            <p class="title">{{ item.name }}</p>
                            <p class="text">{{ item.cnName }}</p>
                        </div>
                    </van-row>
                </van-col>
                <van-col span="6" :class="['price', item.change >0 ? 'green' : 'red']">￥{{ (Number(item.price)).toFixed(2) }}</van-col>
                <van-col span="6" class="market">{{ addChineseUnit(item.marketCapRate, 2) }}万亿</van-col>
            </van-row>
        </List>
        <basic-footer />
    </div>
</template>

<script>
import { List } from 'vant'
import { addChineseUnit } from '../utils/index'

export default {
    name: 'quotation',
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
        async getList (pageIndex, pageSize) {
            const list = await this.$api.get('https://pc.sosob.com/newIndex/market/price/list', {
                size: pageSize,
                start: pageIndex,
                unit: 'CNY'
            })
            return list.list
        },
        jump (item) {
            this.$router.push('/quotation/' + item.pairId + '?title=' + item.name)
        },
        addChineseUnit (number, decimalDigit) {
            return addChineseUnit()(number, decimalDigit)
        }
    }
}
</script>
<style lang="scss" scoped>
#quotation {
    > div {
        padding: 0 30px;
    }
    > .title {
        padding: 34px 30px 34px;
        background: #fff;
        font-size: 28px;
        font-weight: 500;
    }
    .hot {
        margin-bottom: 34px;
        padding-bottom: 40px;
        background: #fff;
        .item {
            width: 220px;
            padding: 40px 0;
            text-align: center;
            border-radius: 8px;
            &:nth-child(1) {
                background: rgba(255,131,57,0.15);
            }
            &:nth-child(2) {
                background: rgba(52,93,157,0.15);
            }
            &:nth-child(3) {
                background: rgba(98,126,234,0.15);
            }
            .img {
                width: 100px;
                margin-bottom: 16px;
            }
            .title {
                font-size: 28px;
                color: #333;
                font-weight: 500;
            }
            .text {
                font-size: 24px;
                color: #9aa5b5;
            }
        }
    }
    .list {
        background: #fff;
        color: #333;
        .index {
            font-size: 30px;
        }
        >.title {
            margin-bottom: 30px;
            font-size: 24px;
            color: #9aa5b5;
            .van-col--6 {
                text-align: right;
            }
        }
        .item {
            margin-bottom: 20px;
            .title {
                font-size: 30px;
                color: #333;
                font-weight: 500;
            }
            .text {
                font-size: 24px;
                color: #9aa5b5;
            }
            .img {
                width: 46px;
                margin-right: 16px;
            }
            .price {
                font-size: 28px;
                font-weight: 700;
                text-align: right;
                &.red {
                    color: #E53535;
                }
                &.green {
                    color: #1CAA3C;
                }
            }
            .market {
                font-size: 28px;
                text-align: right;
            }
        }
    }
}
</style>
