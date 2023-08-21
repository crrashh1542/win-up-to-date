<script>
import Catalog from './widgets/Catalog.vue'
import Card from './widgets/Card.vue';

export default {
    name: 'MainContainer',
    components: { Catalog, Card }
}
</script>

<template>
    <div class="container">

        <!-- Block 1: 11 Can -->
        <div class="block">
            <catalog>
                <span class="icon-win11"></span>Windows 11 Canary
            </catalog>

            <card class="color-amber">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">Gallium / Germanium (24H1)</div>
                    </div>
                </div>
            </card>

            <card class="color-amber">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">rs_prerelease</div>
                    </div>
                </div>
            </card>

            <card class="color-amber">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">25931.1000</div>
                    </div>
                </div>
            </card>
        </div>

        <!-- Block 2: 11 Dev -->
        <div class="block">
            <catalog>
                <span class="icon-win11"></span>Windows 11 Dev
            </catalog>

            <card class="color-cyan">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">Nickel (22H2)</div>
                    </div>
                </div>
            </card>

            <card class="color-cyan">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">ni_prerelease</div>
                    </div>
                </div>
            </card>

            <card class="color-cyan">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">23526.1000</div>
                    </div>
                </div>
            </card>
        </div>

        <!-- Block 3: 11 Beta -->
        <div class="block">
            <catalog>
                <span class="icon-win11"></span>Windows 11 Beta
            </catalog>

            <card class="color-green">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">Nickel (23H2)</div>
                    </div>
                </div>
            </card>

            <card class="color-green">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">ni_release_svc_betaflt_prod1</div>
                    </div>
                </div>
            </card>

            <card class="color-green">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">22631.2199</div>
                    </div>
                </div>
            </card>
        </div>

        <!-- Block 4: 11 RP -->
        <div class="block">
            <catalog>
                <span class="icon-win11"></span>Windows 11 RP
            </catalog>

            <card class="color-yellow">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">Nickel (23H2)</div>
                    </div>
                </div>
            </card>

            <card class="color-yellow">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">ni_release_svc_betaflt_prod1</div>
                    </div>
                </div>
            </card>

            <card class="color-yellow">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">22621.2213</div>
                    </div>
                </div>
            </card>
        </div>
        
        <!-- Block 5: 10 RP -->
        <div class="block">
            <catalog>
                <span class="icon-win10"></span>Windows 10 RP
            </catalog>

            <card class="color-yellow">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">Vibranium (22H2)</div>
                    </div>
                </div>
            </card>

            <card class="color-yellow">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">vb_release_svc_prod2</div>
                    </div>
                </div>
            </card>

            <card class="color-yellow">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">19045.3391</div>
                    </div>
                </div>
            </card>
        </div>

        <!-- Block 6: 11正式 -->
        <div class="block">
            <catalog>
                <span class="icon-win11"></span>Windows 11 正式版
            </catalog>

            <card class="color-theme">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">Nickel (22H2)</div>
                    </div>
                </div>
            </card>

            <card class="color-theme">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">ni_release_svc_prod1</div>
                    </div>
                </div>
            </card>

            <card class="color-theme">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">22621.21??</div>
                    </div>
                </div>
            </card>
        </div>

        <!-- Block 7: 10正式 -->
        <div class="block">
            <catalog>
                <span class="icon-win10"></span>Windows 10 正式版
            </catalog>

            <card class="color-theme">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-codebase vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">开发代号周期</div>
                        <div class="value">Vibranium (22H2)</div>
                    </div>
                </div>
            </card>

            <card class="color-theme">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-branch vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">当前分支</div>
                        <div class="value">vb_release_svc_prod2</div>
                    </div>
                </div>
            </card>

            <card class="color-theme">
                <div class="content flex flex-row flex-nowrap">
                    <div class="icon icon-flight vertical-middle"></div>
                    <div class="info flex flex-col">
                        <div class="title">最新可用版本</div>
                        <div class="value">19045.3324</div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import url('../assets/styles/global.less');

.container {
    margin: var(--container-margin);
    padding: @wu-layout-nav-height 0 0;

    .block {
        margin: 15px 0;

        span {
            margin-right: .75em;
        }
    }
}

/* 不同设备适配 -------- BEGIN */
@media screen and (max-width: 800px) { /* <=800px */
   .container { --container-margin: 0 20px; }
}
@media screen and (min-width: 800px) { /* <=1024px && >800px */
   .container { --container-margin: 0 20px; }
}

@media screen and (min-width: 1024px) { /* >1024px && <=1366px */
   .container { --container-margin: 0 10%; }
}

@media screen and (min-width: 1366px) { /* >1366px */
   .container { --container-margin: 0 15%; }
}
/* 不同设备适配 -------- END */
</style>