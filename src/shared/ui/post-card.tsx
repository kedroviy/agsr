import {FC, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {PostType} from '../types/common-types';
import {Color} from '../../styles/colors';
import {PressableButton} from './pressable-button';

export interface PostCardItemProps {
  post: PostType;
  onPress: () => void;
  onHandleDelete: (id: number) => void;
  onHandleSave: (post: PostType, title: string, body: string) => void;
}

const {width} = Dimensions.get('window');

export const PostCard: FC<PostCardItemProps> = ({
  post,
  onPress,
  onHandleDelete,
  onHandleSave,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);

  const handleEditPress = () => {
    if (isEditing) {
      onHandleSave(post, title, body);
    }
    setIsEditing(!isEditing);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.postItem}>
      <View style={styles.poster}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
            />
            <TextInput
              style={[styles.textInput, styles.bodyInput]}
              value={body}
              onChangeText={setBody}
              placeholder="Body"
              multiline
            />
          </>
        ) : (
          <>
            <Text style={[styles.text, {fontSize: 23, textAlign: 'left'}]}>
              {post.title}
            </Text>
            <View>
              <Text style={styles.text}>{post.body}</Text>
            </View>
          </>
        )}
      </View>
      <PressableButton
        title="x"
        styleProps={styles.buttonDelete}
        onPress={() => onHandleDelete(post.id)}
        textStyleProps={styles.buttonText}
      />
      <View style={styles.controls}>
        <PressableButton
          title={isEditing ? 'Save' : 'Edit'}
          styleProps={styles.editButton}
          onPress={handleEditPress}
          textStyleProps={styles.buttonText}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postItem: {
    width: width - 32,
    height: 'auto',
    backgroundColor: Color.WHITE,
    borderRadius: 5,
    marginVertical: 8,
    padding: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  poster: {
    borderRadius: 10,
  },
  controls: {
    width: '100%',
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  buttonDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 8,
    right: 8,
    borderRadius: 30,
    width: 40,
    height: 40,
    backgroundColor: Color.RED,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '20%',
    height: 40,
    backgroundColor: Color.GRAY_BROWN,
  },
  textInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: Color.MEDIUM_GRAY,
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  bodyInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  text: {
    color: Color.BLACK,
  },
  buttonText: {
    color: Color.WHITE,
  },
});
