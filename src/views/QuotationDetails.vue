<template>
    <div id="quotation-details">
        <van-nav-bar fixed left-arrow @click-left="$router.go('-1')" placeholder :title="$route.query.title" />
        <div v-if="details" class="header">
            <van-row type="flex" justify="space-between" align="center" class="top">
                <div><img :src="details.summary.logo" class="img"></div>
                <p class="title">{{ details.summary.currency + ' ' + details.summary.fullname }}</p>
                <p class="unit">{{ unitText }}<van-icon size=".1rem" name="exchange" /></p>
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
        <van-row type="flex" justify="space-between" align="center" class="tab">
            <div v-for="item in typeList" :key="item.type" :class="['item', item.type ===  activeType ? 'active' : '']" @click="typeSwitch(item)">{{ item.text }}</div>
        </van-row>
        <div id="myChart" />
    </div>
</template>

<script>
import * as echarts from 'echarts'
import { format } from '../utils/index'

export default {
    name: 'quotationDetails',
    components: {
    },
    data () {
        return {
            details: null,
            id: this.$route.params.id,
            unitText: 'CNY',
            activeType: 'day',
            typeList: [
                {
                    text: '1分钟',
                    type: '1',
                    fmt: 'HH:mm'
                },
                {
                    text: '5分钟',
                    type: 3,
                    fmt: 'YYYY-MM-dd'
                },
                {
                    text: '15分钟',
                    type: 5,
                    fmt: 'YYYY-MM-dd'
                },
                {
                    text: '30分钟',
                    type: 6,
                    fmt: 'YYYY-MM-dd'
                },
                {
                    text: '1小时',
                    type: 7,
                    fmt: 'YYYY-MM-dd'
                }
            ],
            chartData: null,
            chart: null
        }
    },
    computed: {
        unit () {
            return this.unitText !== 'CNY' ? '$' : '￥'
        },
        option () {
            return {
                tooltip: {
                    trigger: 'axis',
                    formatter: `{b}<br/>${this.unit}{c}`
                },
                grid: {
                    show: false,
                    left: '0',
                    right: '1%',
                    top: '2%',
                    bottom: '8%',
                    backgroundColor: '#eee',
                    containLabel: false
                },
                xAxis: {
                    data: this.chartData.map(e => e.x),
                    nameLocation: 'center',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        inside: true
                    },
                    position: 'right'
                },
                series: {
                    type: 'line',
                    smooth: true,
                    data: this.chartData.map(e => {
                        return {
                            value: e.y
                        }
                    }),
                    labelLine: {
                        smooth: true
                    },
                    itemStyle: {
                        opacity: 0
                    },
                    lineStyle: {
                        color: '#1077ec',
                        width: 1
                    },
                    areaStyle: {
                        color: 'rgba(16, 119, 236, 0.3)'
                    }
                }
            }
        }
    },
    async created () {
        this.details = await this.getDetails(this.unitText)
        // console.log(this.typeList[0])
        await this.typeSwitch(this.typeList[0])
    },
    async mounted () {
        await this.typeSwitch(this.typeList[0])
    },
    methods: {
        async getDetails (type) {
            return await this.$api.get('https://www.ibtctrade.com/api/coindata/currencys_market_poll', {
                currency: this.$route.query.title,
                unit: type
            })
        },
        async unitSwitch () {
            this.unitText = this.unitText === 'CNY' ? 'USD' : 'CNY'
            this.details = await this.getDetails(this.unitText)
            this.setChart()
        },
        async getChart (type) {
            return await this.$api.get('https://pc.sosob.com/pair/market/kline', {
                pairId: this.id,
                type: type
            })
        },
        async typeSwitch (item) {
            this.activeType = item.type
            const data = await this.getChart(this.activeType)
            this.chartData = data.map(e => {
                return {
                    x: format(new Date(e[0] * 1000), item.fmt),
                    y: e[2].toFixed(2)
                }
            })
            this.setChart()
            // console.log(this.chartData)
        },
        setChart () {
            if (this.chart) {
                this.chart.clear()
                this.chart.setOption(this.option)
            } else {
                this.chart = echarts.init(
                    document.getElementById('myChart'),
                    null,
                    {
                        devicePixelRatio: 10,
                        locale: 'ZH'
                    })
                this.chart.setOption(this.option)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#quotation-details {
    padding: 34px 34px 0;
    background: #fff;
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
    .tab {
        margin: 40px 0;
        .item {
            padding: 4px 20px;
            // height: 0.24rem;
            // margin-right: 12px;
            // line-height: 0.24rem;
            text-align: center;
            font-size: 24px;
            background-color: #f2f6f8;
            color: #54748F;
            border-radius: 16px;
            cursor: pointer;
        }
        .active {
            color: #fff;
            background: #1077ec;
        }
    }
    #myChart {
        width: 100%;
        height: 700px;
    }
}
</style>
