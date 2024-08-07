import {FC, useState} from 'react';
import {Dimensions, StyleSheet, TextInput, View, ViewStyle} from 'react-native';

import {Color} from '../../styles/colors';
import {PressableButton} from './pressable-button';

type CommentProps = {
  styleProps: ViewStyle;
  postId: number;
  onAddComment: (text: string) => void;
};

const {width} = Dimensions.get('window');

export const AddComment: FC<CommentProps> = ({styleProps, onAddComment}) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim().length > 0) {
      onAddComment(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <View style={styleProps}>
      <TextInput
        style={styles.input}
        keyboardType="default"
        placeholder="Enter Description"
        placeholderTextColor={Color.SYSTEM_GREY}
        multiline={true}
        value={commentText}
        onChangeText={setCommentText}
      />
      <View style={styles.controls}>
        <PressableButton
          title="Отправить"
          styleProps={styles.button}
          textStyleProps={styles.text}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: 8,
  },
  input: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    maxHeight: 50,
    borderRadius: 5,
    borderColor: Color.SLIGHTLY_LIGHT_GRAY,
    backgroundColor: Color.NEW_LIGHT_GRAY,
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 47,
    borderRadius: 5,
    backgroundColor: Color.GREEN,
  },
  text: {
    fontSize: 12,
    color: Color.WHITE,
  },
  controls: {
    marginVertical: 5,
    alignItems: 'flex-end',
    width: '100%',
  },
});
