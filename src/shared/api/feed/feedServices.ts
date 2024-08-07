const BASE_URL = 'https://my-json-server.typicode.com/kedroviy/fake-server';

export const apiRequest = async (
  url: string,
  method: string,
  body?: any,
  headers: Record<string, string> = {
    'Content-type': 'application/json; charset=UTF-8',
  },
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Network request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

type ResourceType = 'posts' | 'commentsForPost' | 'comments';

const buildUrl = (
  resource: ResourceType,
  id?: number,
  postId?: number,
): string => {
  let baseUrl = BASE_URL;

  switch (resource) {
    case 'posts':
      baseUrl += '/posts';
      if (id) {
        baseUrl += `/${id}`;
      }
      break;
    case 'commentsForPost':
      if (postId !== undefined) {
        baseUrl += `/posts/${postId}/comments`;
        if (id) {
          baseUrl += `/${id}`;
        }
      } else {
        throw new Error('postId is required for commentsForPost');
      }
      break;
    case 'comments':
      baseUrl += '/comments';
      if (id) {
        baseUrl += `/${id}`;
      }
      break;
    default:
      throw new Error(`Unknown resource type: ${resource}`);
  }

  return baseUrl;
};

export const fetchResource = async (
  resource: ResourceType,
  id?: number,
  postId?: number,
): Promise<any> => {
  return apiRequest(buildUrl(resource, id, postId), 'GET');
};

export const createResource = async (
  resource: ResourceType,
  data: any,
  postId?: number,
): Promise<any> => {
  return apiRequest(buildUrl(resource, undefined, postId), 'POST', data);
};

export const updateResource = async (
  resource: ResourceType,
  id: number,
  data: any,
): Promise<any> => {
  return apiRequest(buildUrl(resource, id), 'PATCH', data);
};

export const deleteResource = async (
  resource: ResourceType,
  id: number,
): Promise<void> => {
  return apiRequest(buildUrl(resource, id), 'DELETE');
};

export const fetchPostsService = () => fetchResource('posts');

export const createPostService = (newPost: {
  title: string;
  body: string;
  userId: number;
}) => createResource('posts', newPost);

export const updatePostService = (
  postId: number,
  updatedFields: Partial<{title: string; body: string; userId: number}>,
) => updateResource('posts', postId, updatedFields);

export const deletePostService = (postId: number) =>
  deleteResource('posts', postId);

export const fetchCommentsService = (postId: number) =>
  fetchResource('commentsForPost', undefined, postId);

export const createCommentService = (
  postId: number,
  newComment: {text: string},
) => createResource('commentsForPost', newComment, postId);

export const updateCommentService = (
  id: number,
  updatedFields: {text: string},
) => updateResource('comments', id, updatedFields);

export const deleteCommentService = (commentId: number) =>
  deleteResource('comments', commentId);
