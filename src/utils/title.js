const baseTitle = 'Windows Up-to-Date'
let overrideTitle = null

const formatTitle = title => {
    if (title) {
        return `${title} / ${baseTitle}`
    }
    return baseTitle
}

const setTitle = title => {
    overrideTitle = title || null
    document.title = formatTitle(overrideTitle)
}

const clearTitle = () => {
    overrideTitle = null
}

const applyRouteTitle = title => {
    if (overrideTitle) {
        return
    }
    document.title = formatTitle(title)
}

export { applyRouteTitle, clearTitle, setTitle }
