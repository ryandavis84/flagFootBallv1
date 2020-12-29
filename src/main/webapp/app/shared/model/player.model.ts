import { ITeam } from 'app/shared/model/team.model';

export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  grade?: number;
  age?: number;
  team?: ITeam;
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public dob?: string,
    public grade?: number,
    public age?: number,
    public team?: ITeam
  ) {}
}
