<template lang="html">
    <div>
        <div class="item">
            <div class="item-bg"></div>
            <div class="item-content">
                <ul>
                    <li>
                        <span></span>
                        <span></span>
                    </li>
                    <li>
                        <span></span>
                        <span></span>
                    </li>
                    <li>
                        <span></span>
                        <span></span>
                    </li>
                    <li>
                        <span></span>
                        <span></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import '../../../style/mixins.less';

.item {
    border-radius: 4px;
    overflow: hidden;
    background: #FFF;
}
.item-bg {
    width: 100%;
    height: 90px;
    background: #E3E9EE;
}
.item-content {
    margin: 1px 22px;
    li {
        .flex();
        padding: 16px 0;
        border-bottom: 1px solid #ECEFF1;
        &:first-child {
            padding-top: 20px;
        }
        span:first-child {
            width: 84px;
            height: 22px;
            background: #E3E9EE;
        }
        span:last-child {
            width: 50px;
            height: 22px;
            background: #E3E9EE;
        }
    }
}
</style>
