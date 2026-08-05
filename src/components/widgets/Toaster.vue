<!--
    Toaster 容器
    参考：
    - https://github.com/microsoft/fluentui/blob/@fluentui/react-components_v9.74.2/packages/react-components/react-toast/library/src/components
    - https://github.com/microsoft/fluentui/blob/@fluentui/react-components_v9.74.2/packages/react-components/react-motion-components-preview/library/src/components/Collapse/Collapse.ts
-->
<script setup lang="ts">
import { computed } from 'vue'

import { useToastStore } from '@/stores/toast'
import Toast from './Toast.vue'

defineOptions({ name: 'WidgetToaster' })

const store = useToastStore()
const positions = ['top', 'top-end', 'top-start', 'bottom', 'bottom-end', 'bottom-start'] as const
const grouped = computed(() => {
    const map: Record<string, typeof store.toasts> = {}
    for (const pos of positions) {
        map[pos] = store.toasts.filter((t) => t.position === pos)
    }
    return map
})

// 进入：先展开高度（布局变化，已有 toast 被 move transition 推移），再淡入
function onEnter(el: Element, done: () => void) {
    const htmlEl = el as HTMLElement
    const height = htmlEl.scrollHeight
    htmlEl.style.overflow = 'hidden'
    htmlEl.style.maxHeight = '0'
    htmlEl.style.opacity = '0'
    requestAnimationFrame(() => {
        const expand = htmlEl.animate([{ maxHeight: '0px' }, { maxHeight: height + 'px' }], {
            duration: 200,
            easing: 'cubic-bezier(0.33, 0, 0.67, 1)',
            fill: 'forwards',
        })
        expand.onfinish = () => {
            htmlEl.animate([{ opacity: '0' }, { opacity: '1' }], {
                duration: 400,
                easing: 'cubic-bezier(0.33, 0, 0.67, 1)',
                fill: 'forwards',
            }).onfinish = () => {
                htmlEl.style.removeProperty('overflow')
                htmlEl.style.removeProperty('max-height')
                htmlEl.style.removeProperty('opacity')
                done()
            }
        }
    })
}

// 退出：先淡出，再收起高度
function onLeave(el: Element, done: () => void) {
    const htmlEl = el as HTMLElement
    const height = htmlEl.scrollHeight
    htmlEl.style.overflow = 'hidden'
    htmlEl.animate([{ opacity: '1' }, { opacity: '0' }], {
        duration: 400,
        easing: 'cubic-bezier(0.33, 0, 0.67, 1)',
        fill: 'forwards',
    }).onfinish = () => {
        htmlEl.animate([{ maxHeight: height + 'px' }, { maxHeight: '0px' }], {
            duration: 200,
            easing: 'cubic-bezier(0.33, 0, 0.67, 1)',
            fill: 'forwards',
        }).onfinish = done
    }
}
</script>

<template>
    <Teleport to="body">
        <div v-for="pos in positions" :key="pos" :class="['toaster', `pos-${pos}`]">
            <TransitionGroup name="toast" :css="false" @enter="onEnter" @leave="onLeave">
                <Toast
                    v-for="toast in grouped[pos]"
                    :key="toast.id"
                    :title="toast.title"
                    :body="toast.body"
                    :intent="toast.intent"
                />
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style lang="less" scoped>
.toaster {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    pointer-events: none;

    > * {
        pointer-events: auto;
    }
}

// 位置
.pos-top {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}
.pos-top-end {
    top: 0;
    right: 0;
}
.pos-top-start {
    top: 0;
    left: 0;
}
.pos-bottom {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.pos-bottom-end {
    bottom: 0;
    right: 0;
}
.pos-bottom-start {
    bottom: 0;
    left: 0;
}

// 已有 toast 被推开时的位移动画（Vue FLIP 自动添加 .toast-move）
.toast-move {
    transition: transform 200ms cubic-bezier(0.33, 0, 0.67, 1);
}
</style>
