import react, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

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

  return (
    <>
      <ScrollView style={styles.container}>
        <Text>Blogs list:</Text>
        <View style={styles.postsWrapper}>
          {posts.map(post => {
              return (
                <View key={post.id} style={styles.post}>
                  <Text style={styles.title}>{post.title}</Text>
                  <View style={styles.separator}></View>
                  <Text style={styles.content}>{post.body}</Text>
                </View>
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
    width: '70%',
    marginBottom: 25
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
  }
});
