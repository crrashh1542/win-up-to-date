export interface RepoInfo {
    version: string
    build: number
    hash: string
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
