<template>
  <section class="container">
    <v-row v-for="(user, index) in users" :key="index">
      <v-col>
        <p>{{ user.data.familyName }} {{ user.data.firstName }}</p>
      </v-col>
      <v-col>
        {{ user.data.point }}
      </v-col>
      <v-col>
        <v-btn @click="pointUp(index)">ポイントアップ</v-btn>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import firebase from "firebase";
const db = firebase.firestore();

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const snapShot = await db.collection("users").get();
      this.users = snapShot.docs.map(doc => {
        const obj = { uid: doc.id, data: doc.data() };
        return obj;
      });
    },
    async pointUp(index) {
      const userRef = await db.collection("users").doc(this.users[index].uid);
      db.runTransaction(t => {
        return t.get(userRef).then(doc => {
          const newPoint = (doc.data().point || 0) + 1;
          t.update(userRef, { point: newPoint });
        });
      }).then(result => {
        this.getUsers();
      });
    }
  }
};
</script>
