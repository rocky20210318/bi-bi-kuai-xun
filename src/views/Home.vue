<template>
    <div id="home">
        <van-row type="flex" justify="space-between" align="center" class="log-title">
            <img class="logo" src="../assets/logo.png" alt="">
            <p class="title">币币快讯</p>
        </van-row>
        <div class="banner"><img src="../assets/banner-1.png" alt=""></div>
        <div v-if="details" class="header">
            <van-row type="flex" justify="space-between" align="center" class="top">
                <div><img :src="details.summary.logo" class="img"></div>
                <p class="title">{{ details.summary.currency + ' ' + details.summary.fullname }}</p>
                <p class="unit" @click="unitSwitch()">{{ unitText }}<van-icon size=".1rem" name="exchange" /></p>
            </van-row>
            <van-row type="flex" justify="space-between" align="center" class="">
                <div class="left">
                    <p class="price">{{ unit + (Number(details.price.price)).toFixed(2) }}</p>
                    <p :class="['chg', details.price.change >0 ? 'green' : 'red']">{{ details.price.change > 0 ? '+' : '' }}{{ (details.price.chg * 100).toFixed(2) }}%</p>
                </div>
                <div class="right">
                    <p class="high">24H最高{{ unit + (Number(details.price.high)).toFixed(2) }}</p>
                    <p class="low">24H最低{{ unit+ (Number(details.price.low)).toFixed(2) }}</p>
                </div>
            </van-row>
        </div>
        <van-row type="flex" justify="space-between" align="center" class="quotation-list">
            <router-link to="" class="item">
                <p class="title">213</p>
                <p class="perc">132</p>
                <p class="up-down">123</p>
            </router-link>
            <router-link to="" class="item">
                <p class="title">213</p>
                <p class="perc">132</p>
                <p class="up-down">123</p>
            </router-link>
            <router-link to="" class="item">
                <p class="title">213</p>
                <p class="perc">132</p>
                <p class="up-down">123</p>
            </router-link>
        </van-row>
        <div class="banner"><router-link to=""><img src="../assets/banner-2.png" alt=""></router-link></div>
        <basic-footer />
    </div>
</template>

<script>

export default {
    name: 'home',
    components: {
    },
    data () {
        return {
            details: null
        }
    },
    computed: {
    },
    async created () {
        this.details = await this.getDetails(this.unitText)
    },
    mounted () {
    },
    methods: {
        async getDetails (type) {
            return await this.$api.get('https://www.ibtctrade.com/api/coindata/currencys_market_poll', {
                currency: 'btc',
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
            text-align: center;
            line-height: 1.8;
            font-size: 26px;
            color: #333;
            .perc {
                font-size: 36px;
                font-weight: 500;
            }
            .up-down {
                font-size: 24px;
            }
            &.red {
                color: #E53535;
            }
            &.green {
                color: #1CAA3C;
            }
        }
    }
    .header {
        // margin-top: 0.5rem;
        box-shadow: 0 0.04rem 0.12rem rgb(0 0 0 / 8%);
        border-radius: 10px;
        padding: 34px 30px;
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
