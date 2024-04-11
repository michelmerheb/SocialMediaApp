import React, {useState, useEffect, useCallback, useMemo  } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Platform, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { fetchPosts } from '../redux/slices/posts/postsSlice';
import { Picker } from '@react-native-picker/picker';

interface Post {
    id: string;
    title: string;
    content: string;
  }

export default function HomeScreen() {

    const posts = useSelector((state: RootState) => state.posts.posts);
    const loading = useSelector((state: RootState) => state.posts.loading);
    const error = useSelector((state: RootState) => state.posts.error);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [sortBy, setSortBy] = useState('title');


    const sortedPosts = useMemo(() => {
      switch (sortBy) {
        case 'title':
          return [...posts].sort((a, b) => a.title.localeCompare(b.title));
        case 'date':
          return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        default:
          return posts;
      }
    }, [posts, sortBy]);
    

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      dispatch(fetchPosts()).then(
        () => setRefreshing(false),
        () => setRefreshing(false)
      );
    }, [dispatch]);
    
    useEffect(() => {
      if (!refreshing) {
        dispatch(fetchPosts());
      }
      }, [dispatch, refreshing]);
    
      if (loading && !refreshing) {
        return (
          <View style={styles.centered}>
          <ActivityIndicator size="large" color="skyblue" />
        </View>
        )
      }
    
      if (error) {
        return <Text style={styles.errorText}>Error fetching posts: {error}</Text>;
      }
    
      if (posts.length === 0) {
        return <Text>No posts found.</Text>;
      }

    const renderPostItem = ({ item } : { item: Post }) => (
        <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
        </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortBy}
          onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Sort by: Title" value="title" />
          <Picker.Item label="Sort by: Date" value="date" />
        </Picker>
      </View>

      <FlatList
        data={sortedPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={Platform.OS === 'android' ? ['#9Bd35A', '#689F38'] : undefined}
            tintColor={Platform.OS === 'ios' ? '#0000ff' : undefined}
          />
        }
        
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginVertical: 10,
    width: screenWidth / 3,
    borderWidth: 1,
    borderColor: 'skyblue',
    backgroundColor: 'lightgrey',
    borderRadius: 25,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    marginBottom: 20,
    padding: 16,
    width: screenWidth - 32,
    borderRadius: 8,
    backgroundColor: 'skyblue',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  postContent: {
    fontSize: 15,
    color: 'white'
  },
  errorText: {
    color: 'black',
    fontSize: 20
  },
});

