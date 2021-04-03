<template>
    <div id="apply">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="申请专栏" />
        <div class="text">
            <p>*申请成为专栏作家即可发布文章。</p>
            <p>*申请提交后两个工作日内，系统将向您发送审核结果。若审核通过，您即可发布相关文章。</p>
            <p>*专栏仅接受数字货币相关内容，禁止发布任何泛时政治及违反中华人民共和国法律法规内容。如有违规本司有权封禁账号，删除相关文章。</p>
        </div>
        <form>
            <p class="title">专栏名称</p>
            <div class="textarea"><field v-model="val1" type="textarea" rows="1" placeholder="" /></div>
            <p class="title">专栏简介</p>
            <div class="textarea"><field v-model="val2" type="textarea" rows="1" placeholder="" /></div>
            <p class="title">个人简介</p>
            <div class="textarea"><field v-model="val3" type="textarea" rows="4" placeholder="希望的到您比较详细的简介，让我们对您的经历有更多了解" /></div>
            <p class="title">代表作品</p>
            <div class="textarea"><field v-model="val4" type="textarea" rows="4" placeholder="希望您能提供您的更多作品，可以提高您申请的通过率" /></div>
        </form>
        <div class="button"><Button @click="feedback" :loading="loading" round block color="#1989fa">提交申请</Button></div>
    </div>
</template>

<script>
import { Field, Button } from 'vant'

export default {
    name: 'apply',
    components: {
        Field,
        Button
    },
    data () {
        return {
            val1: '',
            val2: '',
            val3: '',
            val4: '',
            loading: false
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        feedback () {
            if (!this.val1 || !this.val2 || !this.val3 || !this.val4) this.$toast('请填写申请')
            else {
                this.loading = true
                setTimeout(() => {
                    this.$toast('已提交到提交申请，两个工作日内向您发送审核结果')
                    this.loading = false
                }, 1500)
            }
        }
    }
}
</script>
<style lang="scss">
#apply {
    .van-field--min-height .van-field__control {
        min-height: auto;
    }
}
</style>
<style lang="scss" scoped>
#apply {
    padding: 30px;
    .text {
        font-size: 26px;
        color: #333;
        p {
            margin-bottom: 16px;
        }
    }
    .title {
        font-size: 34px;
    }
    .textarea {
        margin: 30px 0;
        box-sizing: border-box;
        box-shadow: 0px 2px 20px 0px rgba(50, 51, 94, 0.10);
        border: 1px solid #eee;
    }
    .button {
    // padding: 30px;
    }
}

</style>
