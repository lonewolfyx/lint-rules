export interface INavigationItem {
    title: string
    target: string
    website: string
    rules: string
    icon: string
}

export interface INavigation {
    [key: string]: {
        label: string
        items: INavigationItem[]
    }
}
