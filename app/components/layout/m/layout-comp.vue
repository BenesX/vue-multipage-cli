<template lang="html">
    <div class="container" :class="{'animate-show': isShowSidenav, 'active': isShowControlBar}" @click="closeSidenav">
        <div class="pagehead home">
            <div class="title">
                <h2><slot name="headTitle"></slot></h2>
            </div>
            <div class="report-change-box" @click.stop="openSidenav">
                <div class="report-name">
                    <span>{{ reportName.substr(0, 1) }}</span>
                    <i class="icon icon-transfer-s"></i>
                </div>
                <div class="mask blue"></div>
            </div>
        </div>

        <!-- 主内容 -->
        <slot name="content"></slot>
        <!-- 主内容 end-->

        <!-- 侧边 -->
        <div class="side-nav" :class="{'animate-show': isShowSidenav}">
            <div class="content">
                <dl>
                    <dt>切换数据</dt>
                    <!-- 已完成样本 -->
                    <dd v-for="(item, index) in genomesList" @click="switchReport(item)">
                        <a :class="{'color-blue': item.unique_id === masterId}">
                            {{ item.name }}
                        </a>
                        <span
                            class="badge pull-right"
                            v-if="item.unique_id === masterId">
                            当前
                        </span>
                    </dd>
                    <!-- 已完成样本 end-->
                    <!-- 进度 样本 -->
                    <dd v-for="(item, index) in processSamplesList">
                        <a :href="'progress/detail/' + item.barcode">
                            {{ item.name }}
                        </a>
                    </dd>
                    <!-- 进度 样本 -->
                </dl>
                <dl>
        			<dt>添加数据</dt>
        			<dd>
        				<a href="start/">绑定检测套件</a>
        			</dd>
        			<dd>
        				<a href="account/openid/_23andme/">导入 23andMe 数据</a>
        			</dd>
        			<dd>
        				<a>导入全基因组数据</a>
        			</dd>
        		</dl>
                <i class="icon icon-right"></i>
            </div>
            <div class="bg"></div>
        </div>
        <!-- 侧边 end-->

        <!-- 底部bar -->
        <div class="controlbar" v-if="isShowControlBar">
            <ul>
                <li v-for="(tab, index) in controlbar" :class="{'active': currentTab == tab.app}">
                    <a :href="tab.url">
                        <i class="icon" :class="['icon', tab.icon]"></i>
                        <span>{{ tab.desc }}</span>
                    </a>
                </li>
                <!-- <li>
                    <a href="/account2/">
                        <i class="icon icon-user"></i>
                        <span>我</span>
                        <span class="badge red noti-count hide" style="display: inline;">6</span>
                    </a>
                </li> -->
            </ul>
        </div>
        <!-- 底部bar end-->
    </div>
</template>

<script>
export default {
    props: {
        isShowControlBar: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            isShowSidenav: false,
            controlbar: [],
            isLogin: window.templetData.isLogin || false,
            masterId: window.templetData.masterId || '',
            currentTab: window.templetData.currentTab || '',
            genomesList: window.templetData.genomesList || {},
            processSamplesList: window.templetData.processSamplesList || {},
            reportName: window.templetData.reportName,
            notifyTimer: null,
            Controlbar_Map: [
                {
                    url: 'home/',
                    app: 'home',
                    icon: 'icon-report-2',
                    desc: '报告'
                },
                {
                    url: 'lab/',
                    app: 'lab',
                    icon: 'icon-research-4',
                    desc: '研究所'
                },
                {
                    url: 'crowdsourcing/',
                    app: 'crowdsourcing',
                    icon: 'icon-app',
                    desc: '应用'
                },
                {
                    url: 'explore/',
                    app: 'explore',
                    icon: 'icon-topic',
                    desc: '社区'
                },
                {
                    url: 'account2/',
                    app: 'account2',
                    icon: 'icon-user',
                    desc: '我'
                }
            ],
            Controlbar_UnLogin_Map: [
                {
                    url: '',
                    app: 'site',
                    icon: 'icon-wegene-2',
                    desc: 'WeGene'
                },
                {
                    url: 'demo2/male/',
                    app: 'demo2',
                    icon: 'icon-report-2',
                    desc: '示例报告'
                },
                {
                    url: 'shop/',
                    app: 'demo2',
                    icon: 'icon-cart',
                    desc: '购买'
                },
                {
                    url: 'explore/',
                    app: 'demo2',
                    icon: 'icon-topic',
                    desc: '社区'
                },
                {
                    url: 'account/login/',
                    app: 'demo2',
                    icon: 'icon-user',
                    desc: '我'
                },
            ]
        }
    },
    created () {
        this.controlbar = this.isLogin
            ? this.Controlbar_Map
            : this.Controlbar_UnLogin_Map
        if (this.isShowControlBar) {
            this.getNotify()
            this.notifyTimer = setTimeout(this.getNotify, 4000)
        }
        const genomesList = JSON.parse(this.genomesList)
        const processSamplesList = JSON.parse(this.processSamplesList)
        this.genomesList = []
        this.processSamplesList = []
        Object.keys(genomesList).forEach((item, index) => {
            this.genomesList.push(genomesList[item])
        })
        Object.keys(processSamplesList).forEach((item, index) => {
            this.processSamplesList.push({
                barcode: processSamplesList[item].barcode,
                name: processSamplesList[item].name
            })
        })
    },
    methods: {
        openSidenav () {
            this.isShowSidenav = !this.isShowSidenav
        },
        closeSidenav () {
            this.isShowSidenav = false
        },
        async switchReport (item) {
            const res = await this.$api.IndexService.switchReport(item.unique_id, window.location.href, {loading: true})
            res.errno === 1 ? window.location.reload() : ''
        },
        async getNotify () {
            const res = await this.$api.IndexService.getNotify()
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    position: relative;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    transition: left .4s ease-in-out;
    &.active {
        padding-bottom: 50px;
    }
    .animate-show {
        right: -255px;
    }
}
.pagehead {
    position: relative;
    width: 100%;
    // height: 90px;
    padding: 0 20px;
    overflow: hidden;
    color: #fff;
    // border-bottom: 1px solid #ECEFF1;
    &.home {
        height: auto;
        color: #666;
        // background: #fff;
        h2 {
            margin: 0;
            padding: 17px 30px 16px 0;
            line-height: 36px;
            font-size: 20px;
            color: #27374e;
            font-weight: 400;
        }
    }
    .title {
        width: 100%;
    }
}
.report-change-box {
    position: absolute;
    right: 0;
    top: 10px;
    width: 50px;
    height: 24px;
    padding-left: 12px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 50px 0 0 50px;
    color: #fff;
    .report-name {
        position: relative;
        z-index: 2;
        min-height: 24px;
        span {
            float: left;
            line-height: 24px;
            color: #fff;
        }
        i {
            position: relative;
            top: 1px;
            font-size: 20px;
        }
    }
    .mask {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .1;
        border-radius: 50px 0 0 50px;
        &.blue {
            background: #4fb1f7;
            opacity: 1;
        }
    }
}
.side-nav {
    position: fixed;
    top: 0;
    right: -255px;
    height: 100%;
    z-index: 999;
    width: 255px;
    padding: 20px;
    background: #F4F7F9;
    border-left: 1px solid #ECEFF1;
    transition: right .4s ease-in-out;
    .content {
        position: relative;
        z-index: 2;
        max-height: 100%;
        padding-bottom: 50px;
        overflow-y: scroll;
    }
    .bg {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    dl {
        padding-bottom: 10px;
        font-size: 16px;
        border-bottom: 1px solid #ECEFF1;
        dt {
            height: 50px;
            line-height: 50px;
            color: #27374D;
            font-weight: 400;
        }
        dd {
            height: 50px;
            line-height: 50px;
        }
        a {
            display: inline-block;
            max-width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #666;
        }
        .badge {
            margin-top: 15px;
        }
    }
    .icon-right {
        display: block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        background: #fff;
        border-radius: 50%;
        font-size: 24px;
        text-align: center;
    }
    &.animate-show {
        right: 0;
        .bg {
            display: block;
        }
    }
}
</style>
