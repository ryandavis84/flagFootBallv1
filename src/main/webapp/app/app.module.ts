import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { FlagFootBallv1SharedModule } from 'app/shared/shared.module';
import { FlagFootBallv1CoreModule } from 'app/core/core.module';
import { FlagFootBallv1AppRoutingModule } from './app-routing.module';
import { FlagFootBallv1HomeModule } from './home/home.module';
import { FlagFootBallv1EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    FlagFootBallv1SharedModule,
    FlagFootBallv1CoreModule,
    FlagFootBallv1HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    FlagFootBallv1EntityModule,
    FlagFootBallv1AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class FlagFootBallv1AppModule {}
