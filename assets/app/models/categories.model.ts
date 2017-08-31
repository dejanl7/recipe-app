export class CategoryModel {
    constructor( public categoryName: string, public createdBy?: string, public dateCreated?: Date, public categoryRecipe?: Array<string> ) {}
}