const baseTitle = 'Windows Up-to-Date'
let overrideTitle: string | null = null

const formatTitle = (title?: string | null) => {
    if (title) {
        return `${title} / ${baseTitle}`
    }
    return baseTitle
}

const setTitle = (title?: string | null) => {
    overrideTitle = title || null
    document.title = formatTitle(overrideTitle)
}

const clearTitle = () => {
    overrideTitle = null
}

const applyRouteTitle = (title?: string | null) => {
    if (overrideTitle) {
        return
    }
    document.title = formatTitle(title)
}

export { applyRouteTitle, clearTitle, setTitle }
