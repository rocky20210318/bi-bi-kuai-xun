<template>
    <div id="novice">
        <div class="header-box">
            <strong>新手学院</strong>
            <span>收录词条 717</span>
        </div>
        <div class="info-box">
            <h2>什么是比特币？</h2>
            <div class="info">
                <p>比特币的概念最初由中本聪在2008年11月首先提出来的，这是一个不需要政府等中心机构参与，而是所有人一起维护的点对点的电子现金系统。比特币总量是恒定的，共2100万枚。有“数字黄金”的美名。</p>
                <p>因为没有与现实世界中的实物进行交换，所以无法衡量其价值。此时的比特币是没有价格的，只是程序员和极客手中的玩具，而第一次被当做货币是在2010年5月。</p>
                <p>2010年5月18日，一位美国佛罗里达州昵称为Laszlo的用户在Talk上发帖，想用10000比特币买两份披萨。在Jercos的参与下，最终于5月21日，Laszlo用10000比特币换来两份披萨，这笔交易顺利达成。虽然这两份披萨总价值25美元，但这却是比特币历史上历史上第一次有记录的把比特币当做现实生活中的货币进行交易。</p>
                <p>如果按2017年12月的历史最高价计算，这10000比特币至少可以兑换13亿人民币，这大概是历史上最贵的披萨饼了。</p>
                </div>
        </div>
        <p class="title">十分钟看懂比特币</p>
        <iframe
            id="iframe"
            src="https://xbeibeix.com/api/bilibili/biliplayer/?url=https://www.bilibili.com/video/BV15z411v7ob?from=search&seid=7458450471742877854&danmaku=0"
            width="100%"
            height="210rem"
            frameborder="allowfullscreen"
            sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        />
        <!-- <p class="title">百科词库</p> -->
        <Tabs class="tabs" color="#1077ec" v-model="active" sticky>
            <Tab v-for="item in listData" :key="item.id" :title="item.title ">
                <ul class="box">
                    <li v-for="list in item.list" :key="list.id" class="item">
                        <div @click="jump(list)">
                            <p class="title">{{ list.question }}</p>
                            <p class="heat">热度 {{ list.pageviews }}</p>
                        </div>
                    </li>
                </ul>
            </Tab>
        </Tabs>
        <basic-footer />
    </div>
</template>

<script>
import { Tabs, Tab } from 'vant'

export default {
    name: 'novice',
    components: {
        Tab,
        Tabs
    },
    data () {
        return {
            active: 0,
            listData: [
                {
                    title: '名词解释',
                    id: 4,
                    list: []
                },
                {
                    title: '交易相关',
                    id: 1,
                    list: []
                },
                {
                    title: '钱包相关',
                    id: 2,
                    list: []
                },
                {
                    title: '挖矿相关',
                    id: 3,
                    list: []
                },
                {
                    title: '白皮书',
                    id: 5,
                    list: []
                }
            ]
        }
    },
    computed: {
    },
    created () {
        this.listData.map(async e => {
            e.list = await this.getList(e.id)
        })
        console.log(this.listData)
    },
    mounted () {
    },
    methods: {
        async getList (id) {
            const data = await this.$api.get('https://www.ibtcchina.com/api/college/faq_list', {
                category: id,
                p: 1
            })
            if (id === 1) data.shift()
            return data
        },
        jump (data) {
            localStorage.setItem('noviceDetails', JSON.stringify(data))
            this.$router.push('/novice-details')
        }
    }
}
</script>
<style lang="scss" scoped>
#novice {
    background: #f7f8f9;
    padding: 34px 34px 0;
    > .title {
        margin-bottom: 20px;
        font-size: 36px;
        font-weight: 500;
        color: #333;
    }
    .header-box {
        height: 180px;
        border-radius: 10px;
        margin-bottom: 40px;
        background: #1077ec;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: #fff;
        line-height: 2;
        span {
            font-size: 24px;
        }
    }
    .info-box {
        margin-bottom: 40px;
        padding: 34px;
        border-radius: 10px;
        box-shadow: 0 0.04rem 0.2rem rgb(0 0 0 / 20%);
        font-size: 24px;
        color: #808595;
        line-height: 1.6;
        font-weight: 500;
        h2 {
            margin-bottom: 10px;
            font-size: 36px;
            font-weight: 500;
            color: #333;
        }
        p {
            margin-bottom: 20px;
        }
    }
    #iframe {
        border-radius: 8px;
        margin-bottom: 40px;
        overflow: hidden;
    }
    .tabs {
        margin: 0 -34px;
    }
    .box {
        padding: 34px;
        background: #fff;
        .item {
            margin-bottom: 20px;
            // padding: 16px;
            // background: #f7f8f9;
            border-radius: 4px;
            margin-bottom: 20px;
            .title {
                margin-bottom: 10px;
                font-size: 28px;
                font-weight: 500;
                color: #333;
                line-height: 1.5;
            }
            .heat {
                font-size: 24px;
                color: #666;
            }
        }
    }
}
</style>
