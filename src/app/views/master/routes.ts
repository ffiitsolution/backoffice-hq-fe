import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscountComponent } from './discount/discount.component';
import { GlobalComponent } from './global/global.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ColorComponent } from './color/color.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { MpcsComponent } from './mpcs/mpcs.component';
import { ModifierComponent } from './modifier/modifier.component';
import { MenuSetComponent } from './menu-set/menu-set.component';
import { ItemComponent } from './item/item.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { DonateComponent } from './donate/donate.component';
import { LevelComponent } from './level/level.component';
import { PriceComponent } from './price/price.component';
import { MenuComponent } from './menu/menu.component';
import { OutletComponent } from './outlet/outlet.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'discount',
    component: DiscountComponent,
    data: {
      title: 'Discount'
    }
  },
  {
    path: 'global',
    component: GlobalComponent,
    data: {
      title: 'Global'
    }
  },
  {
    path: 'outlet',
    component: OutletComponent,
    data: {
      title: 'Outlet'
    }
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      title: 'Menu'
    }
  },
  {
    path: 'price',
    component: PriceComponent,
    data: {
      title: 'Price'
    }
  },
  {
    path: 'level',
    component: LevelComponent,
    data: {
      title: 'Level'
    }
  },
  {
    path: 'donate',
    component: DonateComponent,
    data: {
      title: 'Donate'
    }
  },
  {
    path: 'group-item',
    component: GroupItemComponent,
    data: {
      title: 'Group Item'
    }
  },
  {
    path: 'item',
    component: ItemComponent,
    data: {
      title: 'Item'
    }
  },
  {
    path: 'menu-set',
    component: MenuSetComponent,
    data: {
      title: 'Menu Set'
    }
  },
  {
    path: 'modifier',
    component: ModifierComponent,
    data: {
      title: 'Modifier'
    }
  },
  {
    path: 'mpcs',
    component: MpcsComponent,
    data: {
      title: 'Mpcs'
    }
  },
  {
    path: 'payment-method',
    component: PaymentMethodComponent,
    data: {
      title: 'Payment Method'
    }
  },
  {
    path: 'color',
    component: ColorComponent,
    data: {
      title: 'Color'
    }
  },
  {
    path: 'recipe',
    component: RecipeComponent,
    data: {
      title: 'Recipe'
    }
  }
];