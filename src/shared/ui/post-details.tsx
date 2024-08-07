import {FC, useEffect, useLayoutEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

import {Color} from '../../styles/colors';
import {RootStackParamList} from '../../navigation/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AddComment} from './add-comment';
import {useDispatch, useSelector} from 'react-redux';
import {CommentType} from '../types/common-types';
import {Comment} from './comment';
import {
  createCommentRedux,
  deleteCommentRedux,
  fetchCommentsRedux,
  updateCommentRedux,
} from '../../redux/feedSlice';
import {AppDispatch} from '../../redux/configure-store';
import {useErrorHandler} from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'postDetails'>;

const {width} = Dimensions.get('window');

export const PostDetails: FC<Props> = ({route, navigation}) => {
  const {id, title, body} = route.params;
  const dispatch: AppDispatch = useDispatch();
  const {comments, error} = useSelector((state: any) => state.feedSlice);
  const displayError = useErrorHandler(error);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Post ID: ${id}`,
    });
  }, [navigation, id]);

  useEffect(() => {
    dispatch(fetchCommentsRedux(id));
  }, []);

  const handleAddComment = (text: string) => {
    const newComment: CommentType = {
      id: Date.now(),
      postId: id,
      text,
    };
    dispatch(createCommentRedux(newComment));
  };

  const handleEditComment = (
    commentId: number,
    postId: number,
    newText: string,
  ) => {
    dispatch(
      updateCommentRedux({
        commentId,
        postId: postId,
        text: newText,
      }),
    );
  };

  const handleDeleteComment = (commentId: number, postId: number) => {
    dispatch(deleteCommentRedux({commentId, postId}));
  };

  const postComments = comments[id] || [];

  return (
    <View style={styles.postItem}>
      <View style={styles.postContainer}>
        <Text
          style={[
            styles.text,
            {fontSize: 23, textAlign: 'left', paddingLeft: 4},
          ]}>
          {title}
        </Text>
        <View>
          <Text style={styles.text}>{body}</Text>
        </View>
      </View>
      <View style={styles.contentHeader}>
        <Text style={{textAlign: 'left'}}>Comments</Text>
      </View>
      <ScrollView style={styles.commentsList}>
        {displayError && (
          <Text style={styles.errorText}>Error: {displayError}</Text>
        )}
        {!displayError &&
          postComments.map((comment: CommentType) => (
            <Comment
              text={comment.text}
              key={comment.id}
              onEdit={(newText: string) =>
                handleEditComment(comment.id, comment.postId, newText)
              }
              onDelete={() => handleDeleteComment(comment.id, comment.postId)}
            />
          ))}
      </ScrollView>
      <AddComment
        styleProps={styles.textAreaContainer}
        postId={id}
        onAddComment={handleAddComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    alignItems: 'center',
    flex: 1,
  },
  postContainer: {
    backgroundColor: Color.WHITE,
    width: width - 32,
    borderRadius: 5,
    marginVertical: 8,
    padding: 8,

    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  commentsList: {
    flex: 0.2,
  },
  contentHeader: {
    width: width - 32,
    paddingVertical: 5,
    borderBottomColor: Color.SLIGHTLY_LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  text: {
    color: Color.BLACK,
  },
  textAreaContainer: {
    position: 'absolute',
    bottom: 10,
    flex: 0.2,
    width: width - 32,
    marginVertical: 8,
  },
  errorText: {
    color: Color.RED,
    textAlign: 'center',
  },
});
