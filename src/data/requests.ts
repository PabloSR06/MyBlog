
import {ItemModel, PostModel} from "@data/models";


export async function getPost(): Promise<PostModel[] > {
    try {
        return await fetch('/data/PostInfo.json').then(response => response.json());
    } catch (error) {
        return [];
    }
}
export async function getPostByName(fileName:string): Promise<ItemModel | undefined> {

    try{
        const itemModel:ItemModel = {} as ItemModel;
        const file:PostModel[] =  await fetch('/data/PostInfo.json').then(response => response.json());
        itemModel.postInfo =  <PostModel> file.find(post => post.fileName === fileName);

        const response = await fetch(`/data/posts/${fileName}.md`);

        itemModel.content = await response.text();

        return itemModel;
    }
    catch (error) {
        return undefined;
    }

}
export async function getPostById(id:number): Promise<ItemModel | undefined> {

    try{
        const itemModel:ItemModel = {} as ItemModel;
        const file:PostModel[] =  await fetch('/data/PostInfo.json').then(response => response.json());
        itemModel.postInfo =  <PostModel> file.find(post => post.id === id);

        const response = await fetch(`/data/posts/${itemModel.postInfo.fileName}.md`);

        itemModel.content = await response.text();

        return itemModel;
    }
    catch (error) {
        return undefined;
    }

}