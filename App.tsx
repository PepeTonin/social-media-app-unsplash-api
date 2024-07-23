import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faInbox} from "@fortawesome/free-solid-svg-icons/faInbox";
import {NavigationContainer} from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import {fetchStories, Story} from "./utils/story";
import {fetchFlteredPosts, Post} from "./utils/posts";

import {LoadingTimeLine} from "./components/LoadingTimeLine/LoadingTimeLine";
import {NoItemsMessage} from "./components/NoItemsMessage/NoItemsMessage";
import {StoryItem} from "./components/StoryItem/StoryItem";
import {PostItem} from "./components/PostItem/PostItem";
import {Button} from "./components/Button/Button";
import {Title} from "./components/Title/Title";
import {LoadingStories} from "./components/LoadingStories/LoadingStories";

export default function App() {
  const [activateBadge, setActivateBadge] = useState(true);
  const [badgeText, setBadgeText] = useState(1);

  const storiesPageSize = 6;
  const [stories, setStories] = useState<Story[]>([]);
  const [isFetchingStories, setIsFetchingStories] = useState(true);
  const [isLoadingMoreStories, setIsLoadingMoreStories] = useState(false);
  const [storiesCurrentPage, setStoriesCurrentPage] = useState(1);
  const [storiesRenderedData, setRenderedStories] = useState<Story[]>([]);

  const postsPageSize = 3;
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  const [postsCurrentPage, setPostsCurrentPage] = useState(1);
  const [postsRenderedData, setRenderedPosts] = useState<Post[]>([]);

  function handleDeactivateBadge() {
    setActivateBadge(false);
    setBadgeText(0);
  }

  function handleStoriesInfiniteScroll() {
    if (isLoadingMoreStories) return;
    setIsLoadingMoreStories(true);
    const contentToAppend = pagination(
      stories,
      storiesCurrentPage,
      storiesPageSize,
    );
    if (contentToAppend.length > 0) {
      setStoriesCurrentPage(storiesCurrentPage + 1);
      setRenderedStories((prev) => [...prev, ...contentToAppend]);
    }
    setIsLoadingMoreStories(false);
  }

  function pagination(
    database: Story[],
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

  async function populateStories() {
    try {
      const fetchedStories = await fetchStories();
      setStories(fetchedStories);
      const paginatedStories = pagination(fetchedStories, 1, storiesPageSize);
      setRenderedStories(paginatedStories);
    } catch (error) {
      console.log("error while fetching stories: ", error);
    } finally {
      setIsFetchingStories(false);
    }
  }

  async function populatePosts() {
    if (isLoadingMorePosts) return;
    try {
      setIsLoadingMorePosts(true);
      const itemsToSkip = (postsCurrentPage - 1) * postsPageSize;
      const fetchedPosts = await fetchFlteredPosts(postsPageSize, itemsToSkip);
      setPostsCurrentPage(postsCurrentPage + 1);
      setRenderedPosts((prev) => [...prev, ...fetchedPosts]);
    } catch (error) {
      console.log("error while populating posts: ", error);
    } finally {
      setIsFetchingPosts(false);
      setIsLoadingMorePosts(false);
    }
  }

  useEffect(() => {
    populateStories();
    populatePosts();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <Title text="Let's Explore" />
          <Button
            onPress={handleDeactivateBadge}
            hasBadge={activateBadge}
            badgeText={badgeText.toString()}>
            <FontAwesomeIcon icon={faInbox} size={32} color="#898DAE" />
          </Button>
        </View>

        <View>
          {isFetchingStories ? (
            <LoadingStories />
          ) : stories.length > 0 ? (
            <FlatList
              onEndReachedThreshold={0.5}
              onEndReached={handleStoriesInfiniteScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesFlatList}
              data={storiesRenderedData}
              keyExtractor={(item) =>
                "story_" + item.id.toString() + Math.random().toString()
              }
              renderItem={(item) => (
                <StoryItem
                  onPress={(name) => console.log("pressed: ", name)}
                  name={item.item.firstName}
                  image={item.item.image}
                />
              )}
              ListFooterComponent={() => (
                <ActivityIndicator size={"small"} color={"#F35BAC"} />
              )}
              ListFooterComponentStyle={styles.storiesFooterFlatList}
            />
          ) : (
            <NoItemsMessage message="No stories available" />
          )}
        </View>

        <View style={styles.postsContainer}>
          {isFetchingPosts ? (
            <LoadingTimeLine style={{marginBottom: 20}} />
          ) : postsRenderedData.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              onEndReached={populatePosts}
              contentContainerStyle={styles.postsFlatList}
              data={postsRenderedData}
              keyExtractor={(item) =>
                "post_" + item.id.toString() + Math.random().toString()
              }
              renderItem={(item) => <PostItem post={item.item} />}
              ListFooterComponent={() => (
                <ActivityIndicator size={"large"} color={"#F35BAC"} />
              )}
              ListFooterComponentStyle={styles.postsFooterFlatList}
            />
          ) : (
            <NoItemsMessage message="No posts available" />
          )}
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  storiesFlatList: {
    gap: 20,
  },
  storiesFooterFlatList: {
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: "center",
  },
  postsContainer: {
    flex: 1,
  },
  postsFlatList: {
    gap: 30,
  },
  postsFooterFlatList: {
    paddingBottom: 40,
    paddingTop: 20,
  },
});
