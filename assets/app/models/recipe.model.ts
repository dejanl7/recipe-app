export class RecipeModel {
    constructor(public title: string, public content: string, public categories?: Array<string>, public attachment?: string, public galleryImages?: Array<string>) {}
}