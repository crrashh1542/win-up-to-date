/**
 * debounce --- wait ms内重复调用只执行最后一次。
 *
 * 泛型说明：
 * - A extends unknown[]：函数参数元组，由传入的 fn 自动推导（如 (q: string) => void 会得到 [q: string]），
 *   因此返回的函数保留 fn 的原始参数签名，且无需显式写 any。
 * - fn 的返回类型写 unknown（而非具体类型），这样 fn 无论返回什么（void、Promise 等）都能通过，
 *   而防抖后我们也不需要这个返回值。
 */
export default function debounce<A extends unknown[]>(fn: (...args: A) => unknown, wait: number) {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (...args: A) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => fn(...args), wait)
    }
}
