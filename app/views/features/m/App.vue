<template lang="html">
     <layout-comp>
         <template slot="content">
             <modal v-model="isShowModal">
                 <div slot="header">
                     header
                 </div>
                 <div slot="content">
                     content
                 </div>
                 <div slot="footer">
                     footer
                 </div>
             </modal>
             <div class="mod">
                 <h2 class="font-weight-bold" @click="showModal">谁与我的基因相似？</h2>
                 <!-- 基因关系 -->
                 <vue-lazy-comp>
                     <item-comp-skeleton class="margin-bottom-20" slot="skeleton"/>
                     <item-comp
                        class="margin-bottom-20"
                        :title="relationShip.title"
                        :desc="relationShip.desc"
                        :bgImg="relationShip.bgImg"
                        :badge="relationShip.badge"
                        isShowBtn="false">
                        <div class="content" slot="content">
                            <div>已找到<span class="color-blue"> {{ relationShipCount }} </span>，已添加<span class="color-blue"> {{ relationShipCountAdded }} </span>人</div>
                            <div v-if="relationShip.badge > 0" class="badge red">
                                {{ relationShip.badge }}
                            </div>
                        </div>
                     </item-comp>
                 </vue-lazy-comp>

                 <!-- 祖源探究 -->
                 <vue-lazy-comp>
                     <item-comp-skeleton class="margin-bottom-20" slot="skeleton"/>
                     <item-comp
                        class="margin-bottom-20"
                        :title="ancestry.title"
                        :desc="ancestry.desc"
                        :bgImg="ancestry.bgImg"
                        isShowBtn="false">
                         <div class="content" slot="content">
                             <div>已有<span class="color-blue"> {{ ancestry.found }} </span>人参与</div>
                         </div>
                     </item-comp>
                 </vue-lazy-comp>

                 <h2 class="font-weight-bold">参与前沿科学研究</h2>
                    <!-- 研究所 -->
                    <vue-lazy-comp>
                        <item2-comp-skeleton class="margin-bottom-20" slot="skeleton"/>
                        <item-comp
                            class="margin-bottom-20"
                            :title="lab.title"
                            :desc="lab.desc"
                            :bgImg="lab.bgImg"
                            :link="lab.link"
                            @refresh="getLabList">
                            <ul class="content-list" slot="content">
                                <li v-for="item in lab.dataList">
                                    <a :href="'/survey2/' + item.id">
                                        <span class="font-weight-bold">{{ item.title }}</span>
                                        <span v-if="item.survey_data_total === -1">进行中...</span>
                                        <span v-else>{{ item.survey_data_total }}人参与</span>
                                    </a>
                                </li>
                            </ul>
                        </item-comp>
                    </vue-lazy-comp>

                    <!-- 微解读 -->
                    <vue-lazy-comp>
                        <item2-comp-skeleton class="margin-bottom-20" slot="skeleton"/>
                        <item-comp
                            class="margin-bottom-20"
                            :title="crowdSource.title"
                            :desc="crowdSource.desc"
                            :bgImg="crowdSource.bgImg"
                            link="/crowdsourcing/"
                            @refresh="getCrowdSource">
                            <ul class="content-list" slot="content">
                                <li v-for="item in crowdSource.dataList">
                                    <a :href="'/crowdsourcing/details/' + item.id">
                                        <span class="font-weight-bold">{{ item.title }}</span>
                                        <span>{{ item.authorization_sum }}人参与</span>
                                    </a>
                                </li>
                            </ul>
                        </item-comp>
                    </vue-lazy-comp>

                    <!-- 第三方应用 -->
                    <vue-lazy-comp>
                        <item2-comp-skeleton slot="skeleton"/>
                        <item-comp
                            class="margin-bottom-20"
                            :title="third.title"
                            :desc="third.desc"
                            :bgImg="third.bgImg"
                            :link="third.link"
                            @refresh="getThirdData">
                            <ul class="content-list" slot="content">
                                <li v-for="item in third.dataList">
                                    <div class="media">
                                        <img :src="item.bgImg" alt="">
                                        <div class="media-desc">
                                            <h3 class="font-weight-bold">{{ item.title }}</h3>
                                            <p class="desc">{{ item.desc }}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </item-comp>
                    </vue-lazy-comp>


                 <h2 class="font-weight-bold">特色功能</h2>
                 <!-- 特色功能 -->
                 <template v-for="(item, index) in featureList">
                     <vue-lazy-comp>
                         <item-comp-skeleton slot="skeleton" :class="{'margin-bottom-20': index == 0}" isShowList="false"/>
                         <item-comp
                            :class="{'margin-bottom-20': index == 0}"
                            :bgImg="item.bgImg"
                            :title="item.title"
                            :desc="item.desc"
                            isShowBtn="false">
                         </item-comp>
                     </vue-lazy-comp>
                 </template>
             </div>
         </template>
     </layout-comp>
</template>

<script>
import { createRandomNumber } from '@/utils/index'
import LayoutComp from '@/components/layout/m/layout-comp'
import Modal from '@/components/modal/popup-comp'
import ItemComp from './item-comp'
import ItemCompSkeleton from './item-comp-skeleton'
import Item2CompSkeleton from './item2-comp-skeleton'
import Bg1 from '@/assets/img/feature-bg-1.jpg'
import Bg2 from '@/assets/img/feature-bg-2.jpg'
import Bg3 from '@/assets/img/feature-bg-3.jpg'
import Bg4 from '@/assets/img/feature-bg-4.jpg'
import Bg5 from '@/assets/img/feature-bg-5.jpg'
import Bg6 from '@/assets/img/feature-bg-6.jpg'
import Bg7 from '@/assets/img/feature-bg-7.jpg'
import th1 from '@/assets/img/third/apps-30.png'
import th2 from '@/assets/img/third/apps-21.png'
import th3 from '@/assets/img/third/apps-22.png'
import th4 from '@/assets/img/third/apps-26.png'
import th5 from '@/assets/img/third/apps-29.png'
import th6 from '@/assets/img/third/apps-23.png'
import th7 from '@/assets/img/third/apps-24.png'

export default {
    data () {
        return {
            isShowModal: false,
            relationShipCount: window.templetData.relationShipCount,
            relationShipCountAdded: window.templetData.relationShipCountAdded,
            relationShip: {
                title: '基因关系',
                desc: '为您寻找未知的"基因关系"',
                bgImg: Bg1,
                found: 15,
                add: 10,
                badge: 3
            },
            ancestry: {
                title: '祖源探究',
                desc: '比对人群祖源，找到你基因层的家乡',
                bgImg: Bg2,
                found: 233473
            },
            lab: {
                title: '研究所',
                desc: '一个特正经的人类研究中心',
                bgImg: Bg3,
                link: '/lab/',
                dataList: []
            },
            crowdSource: {
                title: '微解读',
                desc: '一个特正经的人类研究中心',
                bgImg: Bg4,
                link: '/getCrowdSource/',
                dataList: []
            },
            third: {
                title: '第三方应用',
                desc: 'WeGene 独家应用商城',
                bgImg: Bg5,
                link: '/third/',
                dataList: []
            },
            featureList: [
                {
                    title: '原始数据',
                    desc: '查询所有位点，并提供下载',
                    bgImg: Bg6
                },
                {
                    title: 'PDF报告',
                    desc: '千页报告一次提供，便捷阅读',
                    bgImg: Bg7
                }
            ],
            THIRDTOOL_MAP: {
                1: {
                    title: 'GeneU',
                    desc: 'GeneU 根据 WeGene 开放数据提供了祖源相关信息的查询。您可以将您的祖源信息与人群信息进行对比。',
                    bgImg: th1,
                },
                2: {
                    title: '基因疾病',
                    desc: 'GeneDisease 利用开放数据库数据为用户提供个人基因数据的疾病注释，是基因数据和人类基因疾病数据库的联结工具。',
                    bgImg: th2,
                },
                3: {
                    title: '啊呜减重',
                    desc: '啊呜计划为用户提供个性化营养和减重干预方案。通过结合WeGene的检测结果，啊呜计划为用户定制针对性的减重计划并由营养师1对1指导完成。',
                    bgImg: th3,
                },
                4: {
                    title: 'Rel GO',
                    desc: 'RelationshipGO 是一个基因关系比较的工具。使用 RelationshipGo，两位 WeGene 用户可以互相比较他们之间亲缘关系并分享。',
                    bgImg: th4
                },
                5: {
                    title: 'WeGene To 23andme',
                    desc: 'WeGene To 23andme 是一个简单的基因数据格式转化工具，可以帮助 WeGene 用户将其下载数据转化为 23andme 数据格式，以便于在更多场景下进行分析。',
                    bgImg: th5
                },
                6: {
                    title: 'SNPedia',
                    desc: 'SNPedia 是一个开放的 SNP 位点维基百科。他们提供的 Promethease 服务可供用户上传自己的基因组数据，并以百科中的内容分析用户的基因特征。',
                    bgImg: th6
                },
                7: {
                    title: 'GEDmatch',
                    desc: 'GEDmatch 是一个利用基因组信息进行家系及亲缘分析的网站。用户可以上传自己的基因组数据，与其他用户上传的数据进行比对，分析与他们的亲缘远近及发现未知的家系关系。',
                    bgImg: th7
                },
            }
        }
    },

    created () {
        this.getCrowdSource();
        this.getThirdData();
        this.getLabList();
    },
    methods: {
        async getCrowdSource () {
            const data = await this.$api.IndexService.getCrowdSource('random', 3);
            this.crowdSource.dataList = data.rsm.list;
        },
        getThirdData () {
            const randomArr = createRandomNumber(3, 7);
            this.third.dataList = [];
            randomArr.forEach(item => {
                this.third.dataList.push(this.THIRDTOOL_MAP[item])
            })
        },
        async getLabList () {
            const data = await this.$api.IndexService.getLabList(3);
            this.lab.dataList = data.rsm;
        },
        showModal () {
            this.isShowModal = !this.isShowModal;
        }
    },
    components: {
        LayoutComp, ItemComp, ItemCompSkeleton, Item2CompSkeleton, Modal
    }
}
</script>

<style lang="less" scoped="">
@import '../../../style/mixins.less';

.mod {
    background: none;
    border: none;
    h2 {
        &:first-child {
            margin-top: 0;
        }
        margin: 40px 0 20px;
        color: #27374D;
        font-size: 20px;
    }
}
.content {
    .flex();
    padding: 15px 0;
}
.content-list {
    li {
        a {
            .flex();
            color: #666666;
        }
        padding: 15px 0;
        border-bottom: 1px solid #ECEFF1;
        &:first-child {
            padding-top: 20px;
        }
        span:first-child {
            .one-row-hide();
        }
        span:last-child {
            width: 30%;
            color: #999999;
            text-align: right;
            flex-shrink: 0;
            font-size: 12px;
        }

        .media {
            .flex();
            img {
                margin-right: 15px;
                width: 50px;
                height: 50px;
                flex-shrink: 0;
            }
            .media-desc {
                .flex-col();
                width: 80%;
                h3, p {
                    margin-bottom: 0;
                }
                p {
                    .one-row-hide();
                    width: 100%;
                    color: #999999;
                    font-size: 12px;
                }
            }
        }
    }
}

</style>
