export default [
  {
    component: 'CNavTitle',
    name: '在庫管理',
  },
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: '不足在庫',
    to: '/404',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: '画像表示',
  },
  {
    component: 'CNavItem',
    name: '現在画像一覧',
    to: '/Image/now',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: '過去画像検索',
    to: '/Image/old',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: '設定',
  },
  {
    component: 'CNavItem',
    name: 'デバイス',
    to: '/404',
    icon: 'cil-puzzle',
  },
]
