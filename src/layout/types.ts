export interface IMenuItem {
    name: string// 菜单名称
    icon: string// 菜单图标
    path: string// 菜单路径
    children?: Array<IMenuItem>// 子菜单
}