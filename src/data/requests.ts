
import {PostModel} from "@data/models";


export async function getPost(): Promise<PostModel[] > {
    try {
        return await fetch('/data/PostInfo.json').then(response => response.json());
    } catch (error) {
        return [];
    }
}
export async function getPostByName(fileName:string): Promise<PostModel | undefined> {

    try{
        const file:PostModel[] =  await fetch('/data/PostInfo.json').then(response => response.json());
        return file.find(post => post.fileName === fileName);
    }
    catch (error) {
        return undefined;
    }

}