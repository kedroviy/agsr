import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Color} from '../styles/colors';
import {PostType} from '../shared/types/common-types';

export enum AppRoutes {
  POSTS = 'posts',
  POST_DETAILS = 'postDetails',
}

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerShown: true,
  headerStyle: {
    backgroundColor: Color.EXTRA_LIGHT_GRAY,
  },
  headerTintColor: Color.GRAY_BROWN,
  contentStyle: {
    backgroundColor: Color.EXTRA_LIGHT_GRAY,
  },
};

export const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const withoutHeader: NativeStackNavigationOptions = {
  headerShown: false,
};

export const withHeader: NativeStackNavigationOptions = {
  headerShown: true,
};

const animationConfig = {
  animation: 'spring',
  config: {
    stiffness: 1380,
    damping: 100,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.05,
    restSpeedThreshold: 0.05,
    useNativeDriver: true,
  },
};

export const animationOptions: any = {
  transitionSpec: {
    open: animationConfig,
    close: animationConfig,
  },
};

export type RootStackParamList = {
  posts: undefined;
  postDetails: PostType;
};

export type RootNavigatorParamList = {
  root: undefined;
};
