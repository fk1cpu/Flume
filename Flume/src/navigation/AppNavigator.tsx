import React, { useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { PlayerScreen } from '../screens/PlayerScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { VideoItem } from '../data/mockData';
import { COLORS } from '../utils/theme';

export type RootStackParamList = {
  Main: undefined;
  Player: { video: VideoItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Main screen component with tab switching
const MainScreen = ({ 
  onVideoPress, 
}: { 
  onVideoPress: (item: VideoItem) => void;
}) => {
  const [selectedTab, setSelectedTab] = useState<'home' | 'library'>('home');

  return (
    <View style={styles.container}>
      {/* Screen Content */}
      <View style={styles.screenContent}>
        {selectedTab === 'home' ? (
          <HomeScreen onVideoPress={onVideoPress} />
        ) : (
          <LibraryScreen onVideoPress={onVideoPress} />
        )}
      </View>
      
      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setSelectedTab('home')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, selectedTab === 'home' && styles.tabTextActive]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          onPress={() => setSelectedTab('library')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, selectedTab === 'library' && styles.tabTextActive]}>
            Library
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AppNavigator = () => {
  const navigation = useNavigation();

  const handleVideoPress = useCallback((video: VideoItem) => {
    // @ts-ignore - navigation types will be set up properly in production
    navigation.navigate('Player', { video });
  }, [navigation]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Main">
          {(props: any) => <MainScreen {...props} onVideoPress={handleVideoPress} />}
        </Stack.Screen>
        
        <Stack.Screen 
          name="Player"
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 300,
            gestureEnabled: true,
            gestureDirection: 'vertical',
          }}
        >
          {(props: any) => <PlayerScreen {...props} route={props.route} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContent: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingBottom: 25,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.accent,
    fontWeight: '600',
  },
});

export default AppNavigator;
