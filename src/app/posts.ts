export class Post {
    id: number;
    title: string;
    body: string;

    constructor(params){
        if(params.id) {
            this.id = params.id;
        }

        if(params.title) {
            this.title = params.title;
        }

        if(params.body) {
            this.body = params.body;
        }
    }
}