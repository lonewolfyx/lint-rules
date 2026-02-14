import type { TLinter } from '#shared/types/lint'

export interface INavigationItem {
    title: string
    target: TLinter
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
