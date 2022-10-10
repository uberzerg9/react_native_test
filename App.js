import react, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function App() {

  const [posts, setPosts] = useState([])

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error=>alert(error))
  }

  useEffect(() => {
    getData();
  }, [])


  const rightSwipeActions = () => {
    return (
        <View
          style={styles.deleteButton}
        >
          <Text style={{
            textAlign: 'center',
            width: '100%',
            color: '#fff'
          }}>
            X
          </Text>
        </View>
    );
  };

  const swipeFromRightOpen = () => {
    return true;
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text>Blogs list:</Text>
        <View style={styles.postsWrapper}>
          {posts.map(post => {
              return (
                <Swipeable
                  key={post.id}
                  renderRightActions={rightSwipeActions}
                  onSwipeableRightOpen={swipeFromRightOpen}
                >
                  <View style={styles.post}>
                    <Text style={styles.title}>{post.title}</Text>
                    <View style={styles.separator}></View>
                    <Text numberOfLines={2} style={styles.content}>{post.body}</Text>
                  </View>
                </Swipeable>
              )
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    paddingTop: 75,
    paddingLeft: 15,
    paddingRight: 15
  },
  postsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 35
  },
  post: {
    borderWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 25,
    backgroundColor: '#fff'
  },
  title: {
    paddingBottom: 5,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontWeight: '600',
    width: 25,
    height: 25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }
});
