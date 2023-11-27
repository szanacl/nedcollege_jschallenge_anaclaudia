import { ConfigClass } from "@/classes/ConfigClass";

let path = `${ConfigClass.getUrlApi().toString()}/blog`;

export default class BlogService {
    constructor(){

    }
    static getAll(){
        return fetch(path).then(response => {
            return response.json();
        })
    }
    static getId(id){
        return fetch(`${path}/${id}`).then(response => {
            return response.json();
        })
    }
    static addPost(formData){
        return fetch(path,{
                method: "POST",
                body: formData
            }
            ).then(response => {
            return response.json();
        })
    }
    static update(formData){
        return fetch(path,{
                method: "PUT",
                body: formData
            }
            ).then(response => {
            return response.json();
        })
    }
}