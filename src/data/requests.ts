import { ItemModel, PostModel } from "@data/models";

const POST_INFO_URL = '/data/PostInfo.json';

let postInfoCache: Promise<PostModel[]> | null = null;

async function fetchPostInfo(): Promise<PostModel[]> {
    if (!postInfoCache) {
        postInfoCache = (async () => {
            const response = await fetch(POST_INFO_URL);
            if (!response.ok) {
                throw new Error(`Failed to load PostInfo.json: ${response.status}`);
            }
            const contentType = response.headers.get('content-type') ?? '';
            if (!contentType.includes('application/json')) {
                throw new Error(`Unexpected content-type for PostInfo.json: ${contentType}`);
            }
            return (await response.json()) as PostModel[];
        })().catch((err) => {
            postInfoCache = null;
            throw err;
        });
    }
    return postInfoCache;
}

async function fetchMarkdown(fileName: string): Promise<string> {
    const response = await fetch(`/data/posts/${encodeURIComponent(fileName)}.md`);
    if (!response.ok) {
        throw new Error(`Failed to load post ${fileName}: ${response.status}`);
    }
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('text/html')) {
        throw new Error(`Post ${fileName} not found (received HTML fallback)`);
    }
    return response.text();
}

export async function getPost(): Promise<PostModel[]> {
    try {
        return await fetchPostInfo();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPostByName(fileName: string): Promise<ItemModel | undefined> {
    if (!fileName) return undefined;
    try {
        const file = await fetchPostInfo();
        const postInfo = file.find(post => post.fileName === fileName);
        if (!postInfo) return undefined;

        if (postInfo.isExternal) {
            return { postInfo, content: '' };
        }

        const content = await fetchMarkdown(postInfo.fileName);
        return { postInfo, content };
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function getPostById(id: number): Promise<ItemModel | undefined> {
    if (!Number.isFinite(id)) return undefined;
    try {
        const file = await fetchPostInfo();
        const postInfo = file.find(post => post.id === id);
        if (!postInfo) return undefined;

        if (postInfo.isExternal) {
            return { postInfo, content: '' };
        }

        const content = await fetchMarkdown(postInfo.fileName);
        return { postInfo, content };
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
