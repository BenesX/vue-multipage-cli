<template lang="html">
    <div>
        <div class="item">
            <div class="item-bg">
                <div v-seat="27">
                    <img :src="bgImg" alt="">
                </div>
                <div class="desc">
                    <h3 class="font-weight-bold">{{ title }}</h3>
                    <p>{{ desc }}</p>
                </div>
            </div>
            <div class="item-list">
                <slot name="content"></slot>
                <div class="item-switch-bar" v-if="isShowBtn != 'false'">
                    <div @click="rotate">
                        <i class="icon icon-redo" :class="{active: isRotateRedo}"></i>
                        <span>换一换</span>
                    </div>
                    <span><a :href="link">查看全部</a></span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'desc', 'bgImg', 'badge', 'isShowBtn', 'link'],
    data () {
        return {
            isRotateRedo: false
        }
    },
    methods: {
        rotate () {
            this.isRotateRedo = true
            this.$emit('refresh')
            setTimeout(() => {
                this.isRotateRedo = false
            }, 800)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../style/mixins.less';
@import '../../../style/variables.less';

.item {
    border-radius: 4px;
    overflow: hidden;
    background: #FFF;
}
.item-bg {
    position: relative;
    img {
        width: 100%;
    }
    .desc {
        position: absolute;
        top: 20px;
        left: 19px;
        color: #fff;
        h3 {
            font-size: 18px;
            margin-bottom: 2px;
        }
        p {
            margin-bottom: 0;
        }
    }
}
.item-list {
    margin: 0 20px;
}
.item-switch-bar {
    .flex();
    padding: 15px 0;
    color: @blue;
    i {
        font-size: 20px;
        transition: transform .8s;
        transform-origin: center center;
        &.active {
            animation: rotate .8s forwards;
        }
    }
    div:first-child {
        .flex();
        span {
            padding-left: 8px;
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
