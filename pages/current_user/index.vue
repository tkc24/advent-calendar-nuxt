<template>
  <section class="container">
    <v-row>
      <v-col>
        <v-text-field v-model="familyName" placeholder="姓"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="firstName" placeholder="名"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="updateUser">更新</v-btn>
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
      uid: "",
      firstName: "",
      familyName: ""
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.uid = user.uid;
      this.getUser();
    });
  },
  methods: {
    async getUser() {
      const userRef = db.collection("users").doc(this.uid);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        this.firstName = userDoc.data().firstName;
        this.familyName = userDoc.data().familyName;
      }
    },
    updateUser() {
      console.log(this.uid);
      db.collection("users")
        .doc(this.uid)
        .set({
          firstName: this.firstName,
          familyName: this.familyName
        });
    }
  }
};
</script>
