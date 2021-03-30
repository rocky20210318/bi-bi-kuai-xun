<template>
    <div id="novice-details">
        <van-nav-bar fixed left-arrow @click-left="$router.go('-1')" placeholder title="百科" />
        <h1 class="title">{{ details.question }}</h1>
        <van-row type="flex" align="center" class="time-browse">
            <span class="time">{{ format(details.created * 1000, 'YYYY-MM-dd') }}</span>
            <van-icon class="icon" name="eye-o" />
            <span class="browse">123</span>
        </van-row>
        <div id="html" v-html="details.answer" />
    </div>
</template>

<script>
import { format } from '../utils/index'

export default {
    name: 'novice-details',
    components: {
    },
    data () {
        return {
            details: JSON.parse(localStorage.getItem('noviceDetails'))
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
            return format(new Date(date), fmt)
        }
    }
}
</script>
<style lang="scss">
#novice-details {
    #html {
        p {
            padding-top: 20px;
            font-size: 28px;
            line-height: 1.5;
            color: #555;
        }
        img {
            width: 100%;
            height: auto;
            margin: 20px 0;
        }
        h1 {
            font-size: 32px;
        }
    }
}
</style>
<style lang="scss" scoped>
#novice-details {
    min-height: 100%;
    padding: 0 34px;
    background: #fff;
    h1 {
        padding: 34px 0;
        font-size: 40px;
        font-weight: 500px;
        color: #333;
    }
    .time-browse {
        // margin-bottom: 34px;
        font-size: 24p;
        color: #808595;
    }
}
</style>
