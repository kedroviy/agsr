import {FC, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';

import {Color} from '../../styles/colors';
import {PressableButton} from './pressable-button';

type CommentProps = {
  text: string;
  onEdit: (newText: string) => void;
  onDelete: () => void;
};

const {width} = Dimensions.get('window');

export const Comment: FC<CommentProps> = ({text, onEdit, onDelete}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>(text);

  const handleSave = () => {
    onEdit(currentText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentText(text);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={currentText}
            onChangeText={setCurrentText}
            multiline
          />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
      <View style={styles.controls}>
        {isEditing ? (
          <>
            <PressableButton
              title="Сохранить"
              styleProps={styles.buttonSave}
              textStyleProps={styles.buttonText}
              onPress={handleSave}
            />
            <PressableButton
              title="Отменить"
              styleProps={styles.buttonCancel}
              textStyleProps={styles.buttonText}
              onPress={handleCancel}
            />
          </>
        ) : (
          <>
            <PressableButton
              title="Редактировать"
              styleProps={styles.buttonEdit}
              textStyleProps={styles.buttonText}
              onPress={() => setIsEditing(true)}
            />
            <PressableButton
              title="Удалить"
              styleProps={styles.buttonDelete}
              textStyleProps={styles.buttonText}
              onPress={onDelete}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    backgroundColor: Color.WHITE,
    borderRadius: 5,
    padding: 5,
    marginVertical: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    color: Color.BLACK,
  },
  buttonText: {
    color: Color.WHITE,
  },
  input: {
    color: Color.BLACK,
    borderColor: Color.SLIGHTLY_LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    maxHeight: 100,
  },
  buttonSave: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    height: 38,
    backgroundColor: Color.GREEN,
    borderRadius: 5,
  },
  buttonCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    height: 38,
    backgroundColor: Color.GRAY_BROWN,
    borderRadius: 5,
  },
  buttonEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    height: 38,
    backgroundColor: Color.DESCRIPTION_GREY,
    borderRadius: 5,
  },
  buttonDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
    height: 38,
    backgroundColor: Color.RED,
    borderRadius: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 40,
    gap: 8,
  },
});
