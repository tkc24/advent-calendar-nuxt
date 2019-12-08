<template>
  <section class="container">
    <v-row>
      <v-col>
        <v-text-field v-model="groupName"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addGroup()">追加</v-btn>
      </v-col>
    </v-row>
    <v-row v-for="(group, index) in groups" :key="index">
      <v-col>
        <v-text-field v-model="groups[index].data.name"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="updateGroup(index)">更新</v-btn>
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
      groupName: "",
      groups: []
    };
  },
  created() {
    this.getGroups();
  },
  methods: {
    async getGroups() {
      const snapShot = await db.collection("groups").get();
      this.groups = snapShot.docs.map(doc => {
        const obj = { groupId: doc.id, data: doc.data() };
        return obj;
      });
    },
    addGroup() {
      db.collection("groups").add({
        name: this.groupName
      });
      this.groupName = "";
      this.getGroups();
    },
    async updateGroup(index) {
      const batch = db.batch();
      const groupRef = db.collection("groups").doc(this.groups[index].groupId);
      await batch.set(
        groupRef,
        { name: this.groups[index].data.name },
        { merge: true }
      );
      await db
        .collection("users")
        .where("groupId", "==", this.groups[index].groupId)
        .get()
        .then(async snapshot => {
          await snapshot.forEach(async doc => {
            await batch.set(
              doc.ref,
              {
                groupId: this.groups[index].groupId,
                groupName: this.groups[index].data.name
              },
              { merge: true }
            );
          });
        });

      batch.commit();
    }
  }
};
</script>
