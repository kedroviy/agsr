import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppRoutes, RootStackParamList, defaultScreenOptions} from './constants';
import {FeedScreen} from '../pages/feed/FeedScreen';
import {PostDetails} from '../shared/ui/post-details';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation: React.FC = () => {
  return (
    <RootStack.Navigator
      initialRouteName={AppRoutes.POSTS}
      screenOptions={defaultScreenOptions}>
      <RootStack.Screen
        name={AppRoutes.POSTS}
        component={FeedScreen}
        key={AppRoutes.POSTS}
      />
      <RootStack.Screen
        name={AppRoutes.POST_DETAILS}
        component={PostDetails}
        key={AppRoutes.POST_DETAILS}
      />
    </RootStack.Navigator>
  );
};
