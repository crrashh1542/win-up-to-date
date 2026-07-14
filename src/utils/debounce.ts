export default function debounce<T extends (...args: any[]) => void>(
    fn: T,
    wait: number
) {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => fn(...args), wait)
    }
}
