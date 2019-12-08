<template>
  <section class="container">
    <v-row v-for="(user, index) in users" :key="index">
      <v-col>
        <p>{{ user.data.familyName }} {{ user.data.firstName }}</p>
      </v-col>
      <v-col>
        <v-select
          v-model="users[index].data.groupId"
          :items="groups"
          item-text="groupName"
          item-value="groupId"
        ></v-select>
      </v-col>
      <v-col>
        <v-btn @click="updateUser(index)">更新</v-btn>
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
      groups: [],
      users: []
    };
  },
  created() {
    this.getGroups();
    this.getUsers();
  },
  methods: {
    async getGroups() {
      const snapShot = await db.collection("groups").get();
      this.groups = snapShot.docs.map(doc => {
        const obj = { groupId: doc.id, groupName: doc.data().name };
        return obj;
      });
    },
    async getUsers() {
      const snapShot = await db.collection("users").get();
      this.users = snapShot.docs.map(doc => {
        const obj = { uid: doc.id, data: doc.data() };
        return obj;
      });
    },
    updateUser(index) {
      db.collection("users")
        .doc(this.users[index].uid)
        .set(
          {
            groupId: this.groups[index].groupId,
            groupName: this.groups[index].groupName
          },
          { merge: true }
        );
    }
  }
};
</script>
