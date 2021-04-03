<template>
    <div id="my">
        <UserInfo :user-id="userId" />
        <van-row type="flex" justify="space-between" align="center" class="list">
            <router-link to="/article-list?title=待审核" class="item">
                <div><img src="../assets/not-reviewed.png" alt=""></div>
                <p class="title">待审核</p>
            </router-link>
            <router-link to="/article-list?title=已发布" class="item">
                <div><img src="../assets/reviewed.png" alt=""></div>
                <p class="title">已发布</p>
            </router-link>
            <router-link to="/article-list?title=待修改" class="item">
                <div><img src="../assets/improvement.png" alt=""></div>
                <p class="title">待修改</p>
            </router-link>
        </van-row>
        <div class="set">
            <Cell-group>
                <Cell title="问题反馈" to="/feedback" is-link />
                <!-- <Cell title="检查更新" @click="Update" is-link /> -->
                <Cell title="修改密码" to="/password-reset" is-link />
                <Cell title="用户协议" to="/agreement" is-link />
                <Cell title="隐私政策" to="/privacy" is-link />
            </Cell-group>
            <div class="button"><Button @click="logOut" round block>退出登陆</Button></div>
        </div>
        <!-- 底部导航 -->
        <basic-footer />
    </div>
</template>

<script>
import AV from 'leancloud-storage'
import UserInfo from '../components/user-Info'
import { Cell, CellGroup, Button } from 'vant'

export default {
    name: 'my',
    components: {
        UserInfo,
        Cell,
        CellGroup,
        Button
    },
    data () {
        return {
            userId: AV.User.current().id
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        async logOut () {
            await AV.User.logOut()
            this.$toast('已退出登陆')
            setTimeout(() => this.$router.push('/login'), 2 * 1000)
        }
    }
}
</script>
<style lang="scss">
#my {
    .set {
        .van-cell-group {
            background: transparent;
        }
        .van-cell--clickable {
                cursor: pointer;
                // box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.1);
                width: auto;
                margin: 0 34px 16px;
                box-sizing: border-box;
                border-radius: 8px;
        }
    }
}
</style>
<style lang="scss" scoped>
#my {
    padding-top: 34px;
    // background: #fff;
}
.list {
    margin-bottom: 30px;
    padding: 0 34px;
    font-size: 28px;
    text-align: center;
    color: #888;
    .item {
        width: 200px;
        padding: 30px 0 16px;
        border-radius: 10px;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
        background: #fff;
        img {
            width: 70px;
            margin-bottom: 8px;
        }
    }
}
.set {
    // padding: 0 34px;
}
.button {
    padding: 20px 34px;
}
</style>
