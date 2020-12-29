import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlagFootBallv1SharedModule } from 'app/shared/shared.module';
import { LeagueComponent } from './league.component';
import { LeagueDetailComponent } from './league-detail.component';
import { LeagueUpdateComponent } from './league-update.component';
import { LeagueDeleteDialogComponent } from './league-delete-dialog.component';
import { leagueRoute } from './league.route';

@NgModule({
  imports: [FlagFootBallv1SharedModule, RouterModule.forChild(leagueRoute)],
  declarations: [LeagueComponent, LeagueDetailComponent, LeagueUpdateComponent, LeagueDeleteDialogComponent],
  entryComponents: [LeagueDeleteDialogComponent],
})
export class FlagFootBallv1LeagueModule {}
