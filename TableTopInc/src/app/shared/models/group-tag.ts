import { Tag } from './tag';

export class GroupTag {

    constructor(
         public tags: Tag[],
         public id: string,
         public title: string
    ) {}
}
