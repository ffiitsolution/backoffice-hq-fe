import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Back Office HO'
  },
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Master',
    url: '/master',
    icon: 'fa fa-database',
    children: [
      {
        name: 'Dashboard',
        url: '/master/dashboard',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Discount',
        url: '/master/discount',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Global',
        url: '/master/global',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Outlet',
        url: '/master/outlet',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Menu',
        url: '/master/menu',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Price',
        url: '/master/price',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Level',
        url: '/master/level',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Donate',
        url: '/master/donate',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Group Item',
        url: '/master/group-item',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Item',
        url: '/master/item',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Menu Set',
        url: '/master/menu-set',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Modifier',
        url: '/master/modifier',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'MPCS',
        url: '/master/mpcs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Payment Method',
        url: '/master/payment-method',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Color',
        url: '/master/color',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Recipe',
        url: '/master/recipe',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Transaction',
    url: '/transaction',
    icon: 'fa fa-exchange',
    children: [
      {
        name: 'Dashboard',
        url: '/transaction/dashboard',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Kirim Data Master',
        url: '/transaction/send-master-data',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Terima Data Transaksi',
        url: '/transaction/receive-transaction-data',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Report',
    url: '/report',
    icon: 'fa fa-file-pdf-o',
    children: [
      {
        name: 'Report HQ',
        url: '/report/hq',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Report Log',
        url: '/report/log',
        icon: 'nav-icon-bullet'
      },
    ]
  }
];
