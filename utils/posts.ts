import {createApi} from "unsplash-js";
import * as nodeFetch from "node-fetch";
import "whatwg-fetch";
import {User} from "./story";
import axios from "axios";
import {Random} from "unsplash-js/dist/methods/photos/types";

type ResponsePost = {
  id: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

type ResponseDataFromDummyPosts = {
  posts: ResponsePost[];
  total: number;
  skip: number;
  limit: number;
};

export type Post = {
  id: number;
  user: {
    name: string;
    city: string;
    country: string;
    image: string;
  };
  postImage: string;
  likes: number;
  comments: number;
  saves: number;
};

const unsplash = createApi({
  accessKey: "VI35Ha47TBxrkG3uR9n76cYf6cQyS7fVlNKAgy99Kq4",
  fetch: nodeFetch.default as unknown as typeof fetch,
});

async function fetchRandomPhotos(photosCount: number) {
  const response = await unsplash.photos.getRandom({
    count: photosCount,
    orientation: "squarish",
  });
  const photos = response.response as Random[];
  return photos;
}

async function fetchFilteredPostsFromDummyApi(
  limit: string,
  skip: string,
  select: string[],
) {
  const itemsToSelect = select.join(",");
  const responseFromDummyPosts = await axios.get<ResponseDataFromDummyPosts>(
    `https://dummyjson.com/posts?limit=${limit}&skip=${skip}&select=${itemsToSelect}`,
  );
  return responseFromDummyPosts.data.posts;
}

async function fetchUserById(userId: number) {
  const responseSingleUser = await axios.get(
    `https://dummyjson.com/users/${userId}`,
  );
  return responseSingleUser.data;
}

function formatPost(user: User, photoUrl: string, post: ResponsePost) {
  return {
    id: post.id,
    user: {
      name: user.firstName + " " + user.lastName,
      city: user.address.city,
      country: user.address.country,
      image: user.image,
    },
    postImage: photoUrl,
    likes: post.reactions.likes,
    comments: post.reactions.dislikes,
    saves: post.views,
  };
}

export async function fetchFlteredPosts(limit: number, skip: number) {
  const photos = await fetchRandomPhotos(limit);
  const itemsToSelecFromDummyApi = ["id", "reactions", "views", "userId"];
  const responsePosts = await fetchFilteredPostsFromDummyApi(
    limit.toString(),
    skip.toString(),
    itemsToSelecFromDummyApi,
  );
  const posts: Post[] = [];
  for (let i = 0; i < limit; i++) {
    const post = responsePosts[i];
    const photoUrl = photos[i].urls.regular;
    const user: User = await fetchUserById(post.userId);
    const formattedPost = formatPost(user, photoUrl, post);
    posts.push(formattedPost);
  }
  return posts;
}
