import react, {
  useEffect, 
  useState
} from 'react';

import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Modal, 
  Pressable, 
  TouchableWithoutFeedback, 
  TextInput
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

const axios = require('axios').default;

const PostDetails = (props) => {

  const postId = props.idPost;
  const [onePost, setOnePost] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

  const getOnePost = () => {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
          .then(response => setOnePost(response.data))
  }

  const getPostComments = () => {
      axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
          .then(response => setCommentsList(response.data))
  }

  useEffect(() => {
      getOnePost();
      getPostComments();
  }, []);

  return (
      <>
          <ScrollView style={styles.detailsWrapper}>
              <Text onPress={() => {
                  props.func();
              }} style={styles.backBtn}>Go back</Text>
              <Text style={styles.title}>Post details</Text>
              <View style={styles.postsWrapper}>
                  <View style={styles.postDetails}>
                      <Text style={styles.postTitle}>{onePost.id}. {onePost.title}</Text>
                      <View style={styles.separator}></View>
                      <Text style={styles.content}>{onePost.body}</Text>
                  </View>
              </View>
              <View style={styles.formWrapper}>
                <Text style={styles.title}>Send a comment:</Text>
                <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Your name"
                    maxLength={255}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Your comment"
                    maxLength={500}
                  />
                  <TouchableWithoutFeedback style={styles.sendButton} onPress={handleSubmit}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.commentsWrapper}>
                  <Text style={styles.title}>Comments: {commentsList.length}</Text>
                  {commentsList.map(comment => {
                  return(
                      <View style={styles.comment}>
                          <View>
                            <Text style={styles.commentName}>{comment.name}</Text>
                          </View>
                          <View style={styles.separator}></View>
                          <View>
                            <Text style={styles.commentBody}>{comment.body}</Text>
                          </View>
                      </View>
                  )
                  })}
              </View>
          </ScrollView>
      </>
  )
}

const App = () => {

  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [postId, setPostId] = useState(0);

  const getData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
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

  const toggleDetails = () => {
    setDetails(!details)
  }
  
  if (details) {
    return (
      <>
        <PostDetails idPost={postId} func={toggleDetails}/>
      </>
    )
  } else {
    return (
      <>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Blogs list:</Text>
          <View style={styles.postsWrapper}>
            {posts.map(post => {
                return (
                  <Swipeable
                    key={post.id}
                    renderRightActions={rightSwipeActions}
                    onSwipeableRightOpen={() => {
                      setPostId(post.id)
                    }}
                  >
                    <TouchableWithoutFeedback onPress={() => {
                        setPostId(post.id)
                        toggleDetails()
                      }}>
                      <View style={styles.post}>
                        <Text style={styles.postTitle}>{post.id}. {post.title}</Text>
                        <View style={styles.separator}></View>
                        <Text numberOfLines={2} style={styles.content}>{post.body}</Text>
                      </View>
                    </TouchableWithoutFeedback>
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
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginTop: 75,
    paddingLeft: 15,
    paddingRight: 15
  },
  detailsWrapper: {
    marginTop: 75,
    display: 'flex',
    paddingLeft: 15,
    paddingRight: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24
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
  postDetails: {
    width: '100%',
    marginBottom: 25,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  postTitle: {
    paddingBottom: 5,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 18,
    paddingBottom: 10
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
  },
  backBtn: {
    backgroundColor: 'black',
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    width: 80,
    textAlign: 'center',
    marginBottom: 25
  },
  comment: {
    marginTop: 15,
    marginBottom: 25
  },
  commentsWrapper: {
    paddingTop: 50
  },
  commentName: {
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 16
  },
  commentBody: {
    paddingTop: 5
  },
  textInput: {
    width: '100%',
    marginBottom: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    height: 30
  },
  sendButtonText: {
    backgroundColor: 'lightblue',
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    color: 'white'
  }
});
