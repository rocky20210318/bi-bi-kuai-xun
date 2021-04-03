<template>
    <div id="news-flash">
        <pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" id="pull-refresh">
            <list
                v-if="listData.length !== 0 || !finished"
                v-model="isLoading"
                :finished="finished"
                finished-text=""
                @load="onLoad"
                class="list"
            >
                <ul v-for="(item, listDataIndex) in listData" :key="item.year + item.monthDay">
                    <li :ref="item.year + item.monthDay">
                        <Sticky v-if="ifLoad" :container="item.container" offset-top="60px  ">
                            <div class="year-month-day">
                                <span class="year">{{ item.year }}</span>
                                <span class="month-day">{{ item.monthDay }}</span>
                            </div>
                        </Sticky>
                        <ol class="listData">
                            <li v-for="(list, listIdex) in item.list" :key="list.id" class="item">
                                <div @click="jump(listDataIndex, listIdex)">
                                    <p class="time">{{ list.time }}</p>
                                    <p class="title">{{ list.title }}</p>
                                </div>
                            </li>
                        </ol>
                    </li>
                </ul>
            </list>
        </pull-refresh>
    </div>
</template>

<script>
import { Sticky, List, PullRefresh } from 'vant'
import { format } from '../../utils/index'

export default {
    name: 'news-flash',
    props: {
        ifLoad: {
            type: Boolean,
            default: true
        },
        ifRefresh: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Sticky,
        List,
        PullRefresh
    },
    data () {
        return {
            isLoading: false,
            isRefreshLoading: !this.ifRefresh,
            finished: !this.ifLoad,
            pageIndex: 0,
            listData: []
        }
    },
    computed: {
    },
    async created () {
        this.onLoad()
    },
    mounted () {
    },
    methods: {
        async onLoad () {
            this.pageIndex++
            const listData = await this.getList(this.pageIndex)
            if (listData.length === 0) this.finished = true
            else this.addlistData(listData)
            this.isLoading = false
        },
        async onRefresh () {
            this.pageIndex = 1
            this.finished = false
            const listData = await this.getList(this.pageIndex)
            this.listData = []
            this.addlistData(listData)
            if (listData.length === 0) this.finished = true
            this.isRefreshLoading = false
        },
        async getList (pageIndex) {
            const listData = await this.$api.get('https://www.bitcoin86.com/api_v2/index.php/api/news/lives_list', {
                p: pageIndex
            })
            return listData
        },
        addlistData (listData) {
            listData.forEach(e => {
                // console.log(new Date(e.inputtime * 1000))
                const date = new Date(e.inputtime * 1000)
                e.year = format(date, 'YYYY年')
                e.monthDay = format(date, 'MM月dd日')
                e.time = format(date, 'HH:mm')
                const lastListData = this.listData[this.listData.length - 1]
                if (lastListData && lastListData.monthDay === e.monthDay) lastListData.list.push(e)
                else {
                    this.listData.push({
                        year: e.year,
                        monthDay: e.monthDay,
                        list: [e],
                        container: e.year + e.monthDay
                    })
                }
            })
            // console.log(this.listData)
        },
        jump (listDataIndex, listIndex) {
            const activeNewsDetails = this.listData[listDataIndex].list[listIndex]
            const previousNewsDetails = this.listData[listDataIndex].list[listIndex - 1]
            const nextNewsDetails = this.listData[listDataIndex].list[listIndex + 1]
            localStorage.setItem('activeNewsDetails', JSON.stringify(activeNewsDetails))
            localStorage.setItem('previousNewsDetails', JSON.stringify(previousNewsDetails) || '')
            localStorage.setItem('nextNewsDetails', JSON.stringify(nextNewsDetails) || '')
            // console.log(activeData)
            this.$router.push('/news-details')
        }
    }
}
</script>
<style lang="scss" scoped>
#news-flash {
    .year-month-day {
        display: inline-block;
        margin-left: 24px;
        margin-bottom: 20px;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 2px 4px rgb(127 149 188 / 20%);
        font-size: 32px;
        .year {
            padding: 4px 8px;
            color: #1077ec;
        }
        .month-day {
            background: #1077ec;
            padding: 4px 8px;
            color: #fff;
        }
    }
    .listData {
        padding: 0 24px;
        .item {
            position: relative;
            padding: 20px 0 20px 30px;
            font-size: 32px;
            color: #333;
            line-height: 1.5;
            .time {
                position: relative;
                font-size: 28px;
                color: #666;
                // margin-bottom: 10px;
                &::after {
                    position: absolute;
                    top: 0.2rem;
                    left: -33px;
                    z-index: 2;
                    width: 0.1rem;
                    height: 0.1rem;
                    transform: translateY(-50%);
                    border-radius: 50%;
                    background: #808595;
                    content: '';
                }
            }
            &::after {
                position: absolute;
                top: 0.4rem;
                left: 0;
                width: 0.02rem;
                height: 100%;
                border-left: 1px dotted #cccccc;
                content: '';
            }
        }
    }
}
</style>
