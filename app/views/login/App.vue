<template lang="html">
     <div class="container">
        <input type="text" name="form-control" form-control v-model="user_name">
        <input type="text" name="form-control" v-model="password">
        <a class="btn btn-primary btn-normal btn-block" @click="login">登录</a>
     </div>
</template>

<script>
export default {
    data () {
        return {
            user_name: '',
            password: '',
            net_auto_login: 1
        }
    },
    methods: {
        async login () {
            const res = await this.$api.UserService.login(this.user_name, this.password, this.net_auto_login, {loading: true})
            console.log(res)
        }
    }
}
</script>

<style lang="less" scoped="">
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        input {
            width: 300px;
            height: 50px;
            padding: 0 20px;
            margin-bottom: 10px;
            resize: none;
            box-shadow: none;
            border-color: #e6e6e6;
            border-radius: 2px;
            background-color: #fff;
            border: 1px solid #ccc;
            font-size: 14px;
            line-height: 1.42857143;
            color: #555;
            display: block;
        }
        .btn {
            width: 300px;
        }
    }
</style>
