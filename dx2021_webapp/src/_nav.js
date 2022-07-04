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
    component: 'CNavGroup',
    name: '在庫詳細情報',
    icon: 'cil-speedometer',
    items: [
      {
        component: 'CNavItem',
        name: 'Camera 1',
        to: '/inference/camera-1',
        icon: 'cil-speedometer',
      },
    ],
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
    name: 'リアルタイム取得(Test)',
    to: '/Image/Latest',
    icon: 'cil-drop',
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
    to: '/Setting/device',
    icon: 'cil-puzzle',
  },
  {
    component: 'CNavItem',
    name: '推論区画',
    to: '/Setting/section',
    icon: 'cil-puzzle',
  },
]
