<template>
    <div id="home">
        <van-row type="flex" justify="space-between" align="center" class="log-title">
            <img class="logo" src="../assets/logo.png" alt="">
            <p class="title">币币快讯</p>
        </van-row>
        <div class="banner"><img src="../assets/banner-1.png" alt=""></div>
        <div v-if="details" class="header">
            <van-row type="flex" justify="space-between" align="center" class="top">
                <div><img :src="details.logo" class="img"></div>
                <p class="title">{{ details.currency + ' ' + details.fullname }}</p>
            </van-row>
            <van-row type="flex" justify="space-between" align="center" class="">
                <div class="left">
                    <p class="price">￥{{ (Number(details.price)).toFixed(2) }}</p>
                    <p :class="['chg', details.change >0 ? 'green' : 'red']">{{ details.change > 0 ? '+' : '' }}{{ (details.chg * 100).toFixed(2) }}%</p>
                </div>
                <div class="right">
                    <p class="high">24H最高￥{{ (Number(details.high)).toFixed(2) }}</p>
                    <p class="low">24H最低￥{{ (Number(details.low)).toFixed(2) }}</p>
                </div>
            </van-row>
        </div>
        <van-row type="flex" justify="space-between" align="center" class="quotation-list">
            <router-link v-show="index !== 0" v-for="(item, index) in listData" :key="item.currency" to="" class="item">
                <p class="title">{{ item.currency + '/' + item.fullname_zh }}</p>
                <p :class="['perc', details.change >0 ? 'green' : 'red']">￥{{ (Number(item.price)).toFixed(2) }}</p>
                <p :class="['up-down', details.change >0 ? 'green' : 'red']">{{ item.change > 0 ? '+' : '' }}{{ (item.chg * 100).toFixed(2) }}%</p>
            </router-link>
        </van-row>
        <div class="banner"><router-link to="/novice"><img src="../assets/banner-2.png" alt=""></router-link></div>
        <NewsFlash :ifLoad="false" :ifRefresh="false" />
        <basic-footer />
    </div>
</template>

<script>
import NewsFlash from '../components/news-flash'

export default {
    name: 'home',
    components: {
        NewsFlash
    },
    data () {
        return {
            listData: []
        }
    },
    computed: {
        details () {
            return this.listData[0]
        }
    },
    async created () {
        // this.details = await this.getDetails(this.unitText)
        this.listData = await this.getList()
    },
    mounted () {
    },
    methods: {
        async getDetails (type) {
            return await this.$api.get('https://www.ibtctrade.com/api/coindata/currencys_market_poll', {
                currency: 'btc',
                unit: 'CNY'
            })
        },
        async getList () {
            return await this.$api.get('https://www.ibtcchina.com/api/market/currency_list?', {
                size: 4,
                p: 1,
                unit: 'CNY'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#home {
    .log-title {
        padding: 20px 20px;
        .logo {
            width: 48px;
        }
        .title {
            flex: 1;
            margin-left: 10px;
            font-size: 36px;
            line-height: 1;
        }
    }
    .banner {
        padding: 0 20px;
        img {
            width: 100%;
        }
    }
    .quotation-list {
        padding: 20px 20px;
        .item {
            padding: 20px 0;
            width: 32%;
            box-shadow: 0 6px 16px rgb(0 0 0 / 8%);
            background: #fff;
            border-radius: 10px;
            text-align: center;
            line-height: 1.8;
            font-size: 26px;
            color: #333;
            .title {
                font-size: 26px;
                font-weight: 500;
            }
            .perc {
                font-size: 36px;
                font-weight: 500;
            }
            .up-down {
                font-size: 24px;
            }
            .red {
                color: #E53535;
            }
            .green {
                color: #1CAA3C;
            }
        }
    }
    .header {
        // margin-top: 0.5rem;
        box-shadow: 0 0.04rem 0.12rem rgb(0 0 0 / 8%);
        border-radius: 10px;
        padding: 34px 30px;
        margin: 20px 20px 0;
        // height: 200px;
        background: #fff;
        .top {
            line-height: 1;
            .img {
                width: 40px;
            }
            .title {
                flex: 1;
                margin-left: 10px;
                font-size: 28px;
                font-weight: 500;
            }
            .unit {
                font-size: 30px;
                color: #888;
            }
        }
        .price {
            font-size: 44px;
            font-weight: 700;
            color: #333;
        }
        .chg {
            font-size: 24px;
            &.red {
                color: #E53535;
            }
            &.green {
                color: #1CAA3C;
            }
        }
        .right {
            line-height: 1.7;
            font-size: 28px;
            color: #888;
        }
    }
}
</style>
