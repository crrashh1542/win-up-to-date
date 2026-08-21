export interface RepoInfo {
    version: string
    build: number
    hash: string
    isCi: boolean
    isBeta: boolean
    repo: string
    repoName: string
    buildTag: string
}

export interface AboutMenu {
    name: string
    icon: string
    value: string
    link?: string
}
