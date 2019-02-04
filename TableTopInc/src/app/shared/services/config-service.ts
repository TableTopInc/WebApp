import {Injectable} from '@angular/core';


@Injectable({ providedIn: 'root'})
export class ConfigService {

public url = 'https://tabletop-api-dev.azurewebsites.net';

    constructor() {}
}
