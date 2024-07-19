import {createApi} from "unsplash-js";
import * as nodeFetch from "node-fetch";
import "whatwg-fetch";
import {User} from "./story";
import axios from "axios";
import {Random} from "unsplash-js/dist/methods/photos/types";

type ResponsePost = {
  id: number;
  title: string;
  body: string;
  tags: string[];
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

async function fetchPostsFromDummyApi() {
  const responseFromDummyPosts = await axios.get<ResponseDataFromDummyPosts>(
    "https://dummyjson.com/posts",
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

export async function fetchPosts() {
  const photosCount = 5;
  const photos = await fetchRandomPhotos(photosCount);
  const responsePosts = await fetchPostsFromDummyApi();
  const posts: Post[] = [];
  for (let i = 0; i < 30; i++) {
    const post = responsePosts[i];
    const photoUrl = photos[i % photosCount].urls.regular;
    const user: User = await fetchUserById(post.userId);
    const formattedPost = formatPost(user, photoUrl, post);
    posts.push(formattedPost);
  }
  return posts;
}
