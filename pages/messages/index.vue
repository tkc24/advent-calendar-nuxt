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
    <v-row v-for="(message, index) in messages">
      <v-col>
        <p>
          {{ message.value.messageText }}
        </p>
      </v-col>
      <v-col>
        <span>{{ message.value.like || 0 }}</span>
        <v-btn @click="like(index, message.key)">いいね！</v-btn>
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
          this.messages.unshift({ key: snapshot.key, value: snapshot.val() });
        });
    },
    addMessage() {
      firebase
        .database()
        .ref("messages")
        .push({ messageText: this.messageText, like: 0 });
      this.messageText = "";
    },
    async like(index, key) {
      const messageLikeRef = await firebase
        .database()
        .ref(`messages/${key}/like`);
      const newLikeCount = await messageLikeRef.transaction(function(
        currentValue
      ) {
        return (currentValue || 0) + 1;
      });
      this.messages[index].value.like = newLikeCount.snapshot;
    }
  }
};
</script>
