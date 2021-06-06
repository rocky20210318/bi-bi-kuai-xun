<template>
    <div id="news-details">
        <van-nav-bar fixed left-arrow @click-left="$router.push('/news')" placeholder title="快讯详情" />
        <p class="title">{{ activeNewsDetails.title }}</p>
        <van-row type="flex" align="center" class="time-browse">
            <span class="time">{{ `${activeNewsDetails.year}${activeNewsDetails.monthDay}${activeNewsDetails.time}` }}</span>
            <van-icon class="icon" name="eye-o" />
            <span class="browse">{{ activeNewsDetails.hits }}</span>
        </van-row>
        <p class="description">{{ activeNewsDetails.content }}</p>
        <van-row type="flex" align="center" class="good-bad">
            <van-row type="flex" justify="space-between" align="center" class="good item"><span>利好</span><span>{{ activeNewsDetails.lihao }}</span></van-row>
            <van-row type="flex" justify="space-between" align="center" class="bad item">利空 {{ activeNewsDetails.likong }}</van-row>
        </van-row>
        <van-row type="flex" justify="space-between" align="center" class="previous-next">
            <router-link to="/news-details" v-if="previousNewsDetails" class="previous van-ellipsis">上一篇：{{ previousNewsDetails.title }}</router-link>
            <router-link to="/news-details" v-if="nextNewsDetails" class="next van-ellipsis">下一篇：{{ nextNewsDetails.title }}</router-link>
        </van-row>
    </div>
</template>

<script>
import { format } from '../utils/index'

export default {
    name: 'newsDetails',
    components: {
    },
    data () {
        return {
            id: this.$route.params.id,
            activeNewsDetails: JSON.parse(localStorage.getItem('activeNewsDetails')),
            previousNewsDetails: localStorage.getItem('previousNewsDetails') ? JSON.parse(localStorage.getItem('previousNewsDetails')) : null,
            nextNewsDetails: localStorage.getItem('nextNewsDetails') ? JSON.parse(localStorage.getItem('nextNewsDetails')) : null
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        format (date, fmt) {
            return format(date, fmt)
        }
    }
}
</script>
<style lang="scss" scoped>
#news-details {
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
    .good-bad {
        margin-bottom: 60px;
        .item {
            position: relative;
            min-width: 100px;
            padding: 8px 10px 8px 40px;
            border-radius: 4px;
            font-size: 26px;
            &::after {
                content: ' ';
                display: block;
                position: absolute;
                left: 10px;
                margin: auto;
                width: 0;
                height: 0;
            }
        }
        .good {
            margin-right: 40px;
            background: rgba(28, 170, 60, 0.05);
            color: #1caa3c;
            &::after {
                top: 14px;
                border-top: 16px solid #1caa3c;
                border-right: 8px solid transparent;
                border-bottom: 16px solid transparent;
                border-left: 8px solid transparent;
            }
        }
        .bad {
            background: rgba(229, 53, 53, 0.05);
            color: #e53535;
            &::after {
                bottom: 12px;
                border-top: 16px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 16px solid #e53535;
                border-left: 8px solid transparent;
            }
        }
    }
}
</style>
