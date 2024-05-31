export interface PostModel{
    id: number;
    title: string;
    fileName: string;
    date: string;
    tags: string[];
    description: string;
    isExternal: boolean;
    url: string;
}
export interface ItemModel{
    postInfo: PostModel;
    content: string;
}