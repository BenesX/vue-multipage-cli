<template lang="html">
    <div>
        <div class="item">
            <div class="item-bg">
            </div>
            <div class="item-list" v-if="isShowList != 'false'">
                <div class="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isShowList'],
}
</script>

<style lang="less" scoped>
.item {
    border-radius: 4px;
    overflow: hidden;
    background: #FFF;
}
.item-bg {
    width: 100%;
    padding-bottom: 27%;
    background: #E3E9EE;
}
.item-list {
    padding: 15px 20px;
    div {
        width: 158px;
        height: 22px;
        background: #E3E9EE;
    }
}
</style>
