<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a href="https://vuetifyjs.com" target="_blank"> documentation </a>.
          </p>
          <p>
            If you have questions, please join the official
            <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a href="https://nuxtjs.org/" target="_blank">
            Nuxt Documentation
          </a>
          <br />
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import { messaging } from "~/plugins/firebase";
const db = firebase.firestore();

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      try {
        await messaging.requestPermission();
        const currentToken = await messaging.getToken();
        if (currentToken) {
          this.updateUserFcmToken(user.uid, currentToken);
        }
      } catch (err) {
        console.log("not", err);
      }
      messaging.onTokenRefresh(async () => {
        try {
          await messaging.requestPermission();
          const currentToken = await messaging.getToken();
          if (currentToken) {
            this.updateUserFcmToken(user.uid, currentToken);
          }
        } catch (err) {
          console.log("not", err);
        }
      });
    });
    // messaging
    //   .requestPermission()
    //   .then(function() {
    //     // 通知許可
    //     messaging
    //       .getToken()
    //       .then(function(currentToken) {
    //         if (currentToken) {
    //           this.updateUserFcmToken(currentToken);
    //         }
    //       })
    //       .catch(function(err) {
    //         console.log("not", err);
    //       });
    //   })
    //   .catch(function(err) {
    //     console.log("not", err);
    //   });

    // messaging.onTokenRefresh(() => {
    //   messaging
    //     .getToken()
    //     .then(function(currentToken) {
    //       if (currentToken) {
    //         this.updateUserFcmToken(currentToken);
    //       }
    //     })
    //     .catch(err => {
    //       console.log("Unable to retrieve refreshed token ", err);
    //     });
    // });
    // });
  },
  methods: {
    async updateUserFcmToken(uid, token) {
      await db
        .collection("users")
        .doc(uid)
        .set(
          {
            fcmToken: token
          },
          { merge: true }
        );
    }
  }
};
</script>
