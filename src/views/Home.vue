<template>
  <div class="home">
    <div class="pageOne">
      <Welcome />
      <GoogleMaps 
        class="map" 
        :showInput="false" 
        :data="state.mapData"
        :showInfo="true"
      />
    </div>
    <div class="pageTwo">
      <h1>About</h1>
      <About />
    </div>
    <div class="pageThree">
      <h1>Who we are</h1>
      <Team />
    </div>
    <div class="pageFour">
      <h1>Want to Contribute?</h1>
      <AddCollection />
    </div>
    <div class="pageFive">
      <h1>Leave a comment</h1>
      <AddComment @addComment.passive="setComment" />
    </div>
    <div class="pageSix">
      <h4>Comments: </h4>
      <Comment 
        v-for="comment in filteredList" 
        :key="comment.id"
        :id="comment.id"
        :comment="comment" 
        @reply="addReply"
      />
      <p v-if="state.comments.length == 0">
        No comments have been posted yet
      </p>
    </div>
    <div class="pageSeven">
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from '@/components/GoogleMaps/GoogleMaps.vue'
import Welcome from '@/components/Layout/Welcome.vue'
import About from '@/components/Layout/About.vue'
import Team from '@/components/Layout/Team.vue'
import AddCollection from '@/components/Layout/AddCollection.vue'
import Footer from '@/components/Layout/Footer.vue'
import AddComment from '@/components/Comment/AddComment'
import Comment from '@/components/Layout/Comment'
import { onMounted, reactive, computed } from '@vue/composition-api'
import db from '@/utils/firebase'
import * as firebase from 'firebase/app';

export default {
  name: 'Home',
  components: {
    GoogleMaps,
    Welcome,
    About,
    AddCollection,
    Footer,
    Team,
    AddComment,
    Comment
  },
  setup() {
    const state = reactive({
      mapData: [],
      docId: '',
      comments: [
        // {
        //   id: 2,
        //   name: 'Test',
        //   date: '09/10/2020',
        //   content: 'This is a test comment',
        //   replies: [
        //     {
        //       id: 1,
        //       name: 'Test2',
        //       date: '09/10/2020',
        //       content: 'This is a comment reply',
        //     }
        //   ]
        // }
      ]
    })

    const filteredList = computed(() => state.comments.slice().reverse())

    function setComment(data) {
      data.id = state.comments.length + 1
      state.comments.push(data)

      db.collection('comments').add(data).then((ref) => {
        db.collection('comments').doc(ref.id).update({ docId: ref.id })
      })
    }
    
    function addReply(data) {
        for(let i in state.comments) {
          if(data.parentId == state.comments[i].docId) {
            data.id = state.comments[i].replies.length + 1
            state.comments[i].replies.unshift(data)
            const doc = db.collection('comments').doc(state.comments[i].docId)
            doc.update({
              replies: firebase.firestore.FieldValue.arrayUnion(data)
            })
          }
        }
    }
    onMounted(() => {
      db.collection('businesses').get().then(item => {
        item.forEach(doc => {
          let data = doc.data()
          state.mapData.push({ position: data })
        })
      })
      db.collection('comments').get().then(item => {
        item.forEach(doc => {
          state.docId = doc.id
          let data = doc.data()
          state.comments.push(data)
        })
      })
    })
    return {
      state,
      setComment,
      addReply,
      filteredList
    }
  }
}
</script>

<style scoped lang="scss">
.pageOne{
  display: flex;
  width: 100%;
  height: 100%
}
.pageTwo{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.pageThree{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.pageFour{
  width: 100%;
  height: 100%;
}
.pageFive{
  margin-top: 5%;
  width: 100%;
  height: 100%;
}
.pageSix{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  width: 100%;
  height: 100%;
}
.pageSeven {
  display: flex;
  width: 100%;
  height: 100%;
}
h1{
  font-weight: 200;
}
.map{
  height: 100vh;
  width: 50%;
}

@media only screen and (max-width: 1000px) {

  .pageOne{
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    .map{
      width: 100%
    }
  }
  
}
</style>


