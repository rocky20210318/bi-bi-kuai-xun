<template>
    <div id="column-news">
        <van-nav-bar fixed left-arrow @click-left="$router.go('-1')" placeholder :title="author + '专栏'" />
        <p class="title">{{ details.title }}</p>
        <van-row type="flex" align="center" class="time-browse">
            <span class="time">{{ details.time }}</span>
            <van-icon class="icon" name="eye-o" />
            <span class="browse">{{ details.browse }}</span>
        </van-row>
        <div class="description" v-html="details.text" />
    </div>
</template>

<script>
import { format } from '../utils/index'
import AV from 'leancloud-storage'
// import newsList from '../utils/NewsList.json'
export default {
    name: 'columnNews',
    components: {
    },
    data () {
        return {
            id: this.$route.params.id + '',
            details: {},
            author: ''
        }
    },
    computed: {
    },
    async created () {
        this.getDetails()
    },
    mounted () {
    },
    methods: {
        getDetails () {
            // const details = newsList.filter(e => e.id === this.id)
            // this.details = details[0]
            // console.log(this.details)
            const details = new AV.Query('NewsDetails')
            details.equalTo('id', this.id)
            // const details = AV.Object.createWithoutData('NewsDetails', this.id)
            details.find().then(data => {
                data.forEach(e => {
                    this.details = {
                        ...e.attributes
                    }
                })
                console.log(data[0])
                // this.details = data[0]
            })
            console.log(this.listData)
        },
        format (date, fmt) {
            return format(new Date(date), fmt)
        }
    }
}
</script>
<style lang="scss">
#column-news {
    img {
        width: 100%;
    }
}
</style>
<style lang="scss" scoped>
#column-news {
    background: #f7f8f9;
    min-height: 100%;
    padding: 24px;
    line-height: 1;
    .title {
        margin-bottom: 40px;
        font-size: 42px;
        font-weight: 500;
        line-height: 1.2;
    }
    .time-browse {
        margin-bottom: 40px;
        font-size: 24px;
        color: #666;
        .icon {
            margin: 0 4px 0 30px;
        }
    }
    .description {
        margin-bottom: 10px;
        font-size: 32px;
        color: #333;
        line-height: 1.5;
    }
    .previous-next {
        a {
            width: 35%;
        }
    }
}
</style>
