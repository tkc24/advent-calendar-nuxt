<template>
  <section class="container">
    <v-row>
      <v-col>
        <v-text-field v-model="messageText"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addMessage">投稿</v-btn>
      </v-col>
    </v-row>
    <v-row v-for="(message, key, index) in messages" :key="index">
      <v-col>
        <p>
          {{ message.messageText }}
        </p>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      messages: [],
      messageText: ""
    };
  },
  mounted() {
    this.initMessages();
  },
  methods: {
    initMessages() {
      firebase
        .database()
        .ref("messages")
        .on("child_added", snapshot => {
          this.messages.unshift(snapshot.val());
        });
    },
    addMessage() {
      firebase
        .database()
        .ref("messages")
        .push({ messageText: this.messageText });
      this.messageText = "";
    }
  }
};
</script>
