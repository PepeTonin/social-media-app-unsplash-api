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
import {StoryItem} from "./components/StoryItem/StoryItem";
import {NoStoryGotten} from "./components/NoStoryGotten/NoStoryGotten";

export default function App() {
  const [activateBadge, setActivateBadge] = useState(false);
  const [badgeText, setBadgeText] = useState(0);

  const [stories, setStories] = useState<Story[]>([]);
  const [isFetchingStories, setIsFetchingStories] = useState(true);
  const [storiesCurrentPage, setStoriesCurrentPage] = useState(1);
  const [storiesRenderedData, setRenderedStories] = useState<Story[]>([]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [postsCurrentPage, setPostsCurrentPage] = useState(1);
  const [postsRenderedData, setRenderedPosts] = useState<Post[]>([]);

  const pageSize = 6;
  const [isLoadingMoreItems, setIsLoadingMoreItems] = useState(false);

  function handleActivateBadge() {
    setActivateBadge(true);
    setBadgeText((prev) => prev + 1);
  }

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
        pageSize,
      ) as Story[];
      setRenderedStories(paginatedStories);
    } catch (error) {
      console.log("error while fetching stories: ", error);
    } finally {
      setIsFetchingStories(false);
    }
  }

  function handleStoriesInfiniteScroll() {
    if (isLoadingMoreItems) return;
    setIsLoadingMoreItems(true);
    const contentToAppend = pagination(
      stories,
      storiesCurrentPage + 1,
      pageSize,
    ) as Story[];
    if (contentToAppend.length > 0) {
      setStoriesCurrentPage(storiesCurrentPage + 1);
      setRenderedStories((prev) => [...prev, ...contentToAppend]);
    }
    setIsLoadingMoreItems(false);
  }

  async function populatePosts() {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.log("error while fetching photos: ", error);
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
              onEndReached={handleStoriesInfiniteScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesFlatList}
              data={storiesRenderedData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(item) => (
                <StoryItem
                  onPress={(name) => console.log("pressed: ", name)}
                  name={item.item.firstName}
                  image={item.item.image}
                />
              )}
            />
          ) : (
            <NoStoryGotten />
          )}
        </View>
        <View style={styles.postsContainer}></View>
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
    marginTop: 20,
    marginBottom: 30,
  },
  storiesFlatList: {
    gap: 20,
  },
  postsContainer: {
    flex: 1,
  },
});
