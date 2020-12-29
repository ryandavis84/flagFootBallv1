import { IPlayer } from 'app/shared/model/player.model';
import { ICoach } from 'app/shared/model/coach.model';

export interface IEmergencyContact {
  id?: number;
  firstName?: string;
  lastName?: string;
  id?: IPlayer;
  id?: ICoach;
}

export class EmergencyContact implements IEmergencyContact {
  constructor(public id?: number, public firstName?: string, public lastName?: string, public id?: IPlayer, public id?: ICoach) {}
}
