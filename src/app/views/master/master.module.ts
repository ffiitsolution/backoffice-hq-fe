import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscountComponent } from './discount/discount.component';
import { GlobalComponent } from './global/global.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { OutletComponent } from './outlet/outlet.component';
import { MenuComponent } from './menu/menu.component';
import { PriceComponent } from './price/price.component';
import { LevelComponent } from './level/level.component';
import { DonateComponent } from './donate/donate.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { ItemComponent } from './item/item.component';
import { MenuSetComponent } from './menu-set/menu-set.component';
import { ModifierComponent } from './modifier/modifier.component';
import { MpcsComponent } from './mpcs/mpcs.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ColorComponent } from './color/color.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    DiscountComponent,
    GlobalComponent,
    OutletComponent,
    MenuComponent,
    PriceComponent,
    LevelComponent,
    DonateComponent,
    GroupItemComponent,
    ItemComponent,
    MenuSetComponent,
    ModifierComponent,
    MpcsComponent,
    PaymentMethodComponent,
    ColorComponent,
    RecipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CoreModule
  ],
  providers: [

  ]
})
export class MasterModule { }
