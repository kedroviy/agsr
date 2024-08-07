import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {AppDispatch} from '../../redux/configure-store';
import {useEffect} from 'react';
import {
  createPostRedux,
  deletePostRedux,
  fetchPostsRedux,
  updatePostRedux,
} from '../../redux/feedSlice';
import {PostCard} from '../../shared/ui/post-card';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {PostType} from '../../shared/types/common-types';
import {AppRoutes} from '../../navigation/constants';
import {PressableButton} from '../../shared/ui/pressable-button';
import {Color} from '../../styles/colors';
import {useErrorHandler} from '../../shared/hooks';

const windowWidth = Dimensions.get('window').width;

export const FeedScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {posts, loading, error} = useSelector((state: any) => state.feedSlice);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const displayError = useErrorHandler(error);
  const reversedPosts = [...posts].reverse();

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPostsRedux());
    }
  }, [dispatch]);

  const handleCardPress = (post: PostType) => {
    navigation.navigate(AppRoutes.POST_DETAILS, post);
  };

  const handleAddPost = async () => {
    const newPost: PostType = {
      userId: 1,
      id: Date.now(),
      title: 'New Post Title',
      body: 'New Post Body',
    };

    try {
      await dispatch(createPostRedux(newPost)).unwrap();
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const handleDeletePost = (postId: number) => {
    dispatch(deletePostRedux(postId));
  };

  const handleSavePost = (post: PostType, title: string, body: string) => {
    const updatedPost = {...post, title, body};
    dispatch(updatePostRedux(updatedPost));
  };

  return (
    <View style={[styles.container, {width: windowWidth}]}>
      {loading && <ActivityIndicator />}
      {displayError && (
        <Text style={styles.errorText}>Error: {displayError}</Text>
      )}
      {!loading && !error && (
        <>
          <FlatList
            data={reversedPosts}
            keyExtractor={item => item.id}
            maxToRenderPerBatch={4}
            renderItem={({item}) => (
              <PostCard
                post={item}
                onPress={() => handleCardPress(item)}
                onHandleDelete={handleDeletePost}
                onHandleSave={handleSavePost}
              />
            )}
          />
          <PressableButton
            title="+"
            onPress={handleAddPost}
            styleProps={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.SYSTEM_GREY,
              padding: 10,
              width: 74,
              height: 74,
              gap: 10,
              borderRadius: 45,
            }}
            textStyleProps={styles.editButtonText}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth - 32,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: Color.INPUT_GREY,
    padding: 10,
    width: 328,
    height: 44,
    gap: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: Color.WHITE,
    fontSize: 23,
    textAlign: 'left',
  },
  errorText: {
    color: Color.RED,
    fontSize: 16,
    textAlign: 'center',
    margin: 16,
  },
});
