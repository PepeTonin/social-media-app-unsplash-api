import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faInbox} from "@fortawesome/free-solid-svg-icons/faInbox";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {fetchStories, Story} from "./utils/story";
import {fetchPosts, Post} from "./utils/posts";

import {Title} from "./components/Title/Title";
import {Button} from "./components/Button/Button";
import {NoItemsMessage} from "./components/NoItemsMessage/NoItemsMessage";
import {StoryItem} from "./components/StoryItem/StoryItem";
import {PostItem} from "./components/PostItem/PostItem";

export default function App() {
  const [activateBadge, setActivateBadge] = useState(true);
  const [badgeText, setBadgeText] = useState(2);

  const storiesPageSize = 6;
  const [stories, setStories] = useState<Story[]>([]);
  const [isFetchingStories, setIsFetchingStories] = useState(true);
  const [isLoadingMoreStories, setIsLoadingMoreStories] = useState(false);
  const [storiesCurrentPage, setStoriesCurrentPage] = useState(1);
  const [storiesRenderedData, setRenderedStories] = useState<Story[]>([]);

  const postsPageSize = 3;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  const [postsCurrentPage, setPostsCurrentPage] = useState(1);
  const [postsRenderedData, setRenderedPosts] = useState<Post[]>([]);

  function handleDeactivateBadge() {
    setActivateBadge(false);
    setBadgeText(0);
  }

  async function populateStories() {
    try {
      const fetchedStories = await fetchStories();
      setStories(fetchedStories);
      const paginatedStories = pagination(
        fetchedStories,
        1,
        storiesPageSize,
      ) as Story[];
      setRenderedStories(paginatedStories);
    } catch (error) {
      console.log("error while fetching stories: ", error);
    } finally {
      setIsFetchingStories(false);
    }
  }

  async function populatePosts() {
    try {
      const fetchedPosts = await fetchPosts();
      if (!fetchedPosts) return;
      setPosts(fetchedPosts);
      const paginatedPosts = pagination(
        fetchedPosts,
        1,
        postsPageSize,
      ) as Post[];
      setRenderedPosts(paginatedPosts);
    } catch (error) {
      console.log("error while populating posts: ", error);
    } finally {
      setIsFetchingPosts(false);
    }
  }

  function pagination(
    database: Story[] | Post[],
    currentPage: number,
    pageSize: number,
  ) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  }

  function setPaginatedItems(
    isLoadingMoreItems: boolean,
    setIsLoadingMoreItems: (state: boolean) => void,
    database: Story[] | Post[],
    setRenderedItems: any,
    currentPage: number,
    setCurrentPage: (page: number) => void,
    pageSize: number,
  ) {
    if (isLoadingMoreItems) return;
    setIsLoadingMoreItems(true);
    const contentToAppend = pagination(database, currentPage + 1, pageSize) as
      | Story[]
      | Post[];
    if (contentToAppend.length > 0) {
      setCurrentPage(currentPage + 1);
      setRenderedItems((prev: Story[] | Post[]) => [
        ...prev,
        ...contentToAppend,
      ]);
    }
    setIsLoadingMoreItems(false);
  }

  function handleInfiniteScroll(type: "stories" | "posts") {
    switch (type) {
      case "stories":
        return setPaginatedItems(
          isLoadingMoreStories,
          setIsLoadingMoreStories,
          stories,
          setRenderedStories,
          storiesCurrentPage,
          setStoriesCurrentPage,
          storiesPageSize,
        );
      case "posts":
        return setPaginatedItems(
          isLoadingMorePosts,
          setIsLoadingMorePosts,
          posts,
          setRenderedPosts,
          postsCurrentPage,
          setPostsCurrentPage,
          postsPageSize,
        );
    }
  }

  useEffect(() => {
    populateStories();
    // populatePosts();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Title text="Let's Explore" />
          <Button
            onPress={handleDeactivateBadge}
            hasBadge={activateBadge}
            badgeText={badgeText.toString()}>
            <FontAwesomeIcon icon={faInbox} size={32} color="#898DAE" />
          </Button>
        </View>
        <View style={styles.storiesContainer}>
          {isFetchingStories ? (
            <ActivityIndicator size={"large"} color={"#F35BAC"} />
          ) : stories.length > 0 ? (
            <FlatList
              onEndReachedThreshold={0.5}
              onEndReached={() => handleInfiniteScroll("stories")}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesFlatList}
              data={storiesRenderedData}
              keyExtractor={(item) => "story_" + item.id.toString()}
              renderItem={(item) => (
                <StoryItem
                  onPress={(name) => console.log("pressed: ", name)}
                  name={item.item.firstName}
                  image={item.item.image}
                />
              )}
            />
          ) : (
            <NoItemsMessage message="No stories available" />
          )}
        </View>
        <View style={styles.postsContainer}>
          {isFetchingPosts ? (
            <ActivityIndicator size={"large"} color={"#F35BAC"} />
          ) : posts.length > 0 ? (
            <FlatList
              onEndReachedThreshold={0.5}
              onEndReached={() => handleInfiniteScroll("posts")}
              contentContainerStyle={styles.postsFlatList}
              data={postsRenderedData}
              keyExtractor={(item) => "post_" + item.id.toString()}
              renderItem={(item) => <PostItem post={item.item} />}
            />
          ) : (
            <NoItemsMessage message="No posts available" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  storiesContainer: {
    marginVertical: 20,
  },
  storiesFlatList: {
    gap: 20,
  },
  postsFlatList: {
    gap: 30,
  },
  postsContainer: {
    flex: 1,
  },
});
