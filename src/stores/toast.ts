import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastIntent = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top' | 'top-end' | 'top-start' | 'bottom' | 'bottom-end' | 'bottom-start'

export interface ToastOptions {
    title: string
    body?: string
    intent?: ToastIntent
    position?: ToastPosition
    /** 持续时间(ms)，默认 4000 */
    duration?: number
}

interface ToastItem extends Required<Omit<ToastOptions, 'duration'>> {
    id: number
    duration: number
}

let nextId = 0

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<ToastItem[]>([])

    function show(options: ToastOptions) {
        const id = nextId++
        const item: ToastItem = {
            id,
            title: options.title,
            body: options.body ?? '',
            intent: options.intent ?? 'info',
            position: options.position ?? 'top-end',
            duration: options.duration ?? 4000,
        }
        // top 位置配合 column-reverse，unshift 使新 toast 出现在视觉底部（队尾）
        // bottom 位置 push 到数组末尾，即视觉底部（队尾）
        if (item.position.startsWith('top')) {
            toasts.value.unshift(item)
        } else {
            toasts.value.push(item)
        }

        // 自动关闭
        setTimeout(() => dismiss(id), item.duration)
    }

    function dismiss(id: number) {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return { toasts, show, dismiss }
})
