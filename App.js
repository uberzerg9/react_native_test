import react, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const axios = require('axios').default;

export default function App() {

  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [postId, setPostId] = useState(0)

  const getData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_page=0&_limit=10`)
        .then(response => setPosts(response.data))
  }

  const deletePost = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {        
          let newPosts = posts.filter(post => post.id !== postId)
          setPosts(newPosts)
        })
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
          }}
          onPress={toggleModal}
          >
            X
          </Text>
        </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const showDetails = () => {
    return (
      <>

      </>
    )
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text onPress={toggleModal}>Blogs list:</Text>
        <View style={styles.postsWrapper}>
          {posts.map(post => {
              return (
                <Swipeable
                  key={post.id}
                  renderRightActions={rightSwipeActions}
                  onSwipeableRightOpen={() => {
                    setPostId(post.id)
                  }}
                  onPress={showDetails}
                >
                  <View style={styles.post}>
                    <Text style={styles.title}>{post.id}. {post.title}</Text>
                    <View style={styles.separator}></View>
                    <Text numberOfLines={2} style={styles.content}>{post.body}</Text>
                  </View>
                </Swipeable>
              )
          })}
        </View>
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Delete Post?</Text>
              <View style={styles.btnWrapper}>
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.buttonConfirm]}
                  onPress={(e) => {
                    setModalVisible(!modalVisible);
                    deletePost();
                  }}
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.buttonCancel]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginTop: 75,
    paddingLeft: 15,
    paddingRight: 15
  },
  postsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 35
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonConfirm: {
    backgroundColor: 'green',
    display: 'inline',
    marginRight: 5
  },
  buttonCancel: {
    backgroundColor: 'orange',
    display: 'inline',
    marginLeft: 5
  }
});
