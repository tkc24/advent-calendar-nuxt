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
        <v-btn @click="insertUser">更新</v-btn>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import { functions } from "~/plugins/firebase";

export default {
  data() {
    return {
      firstName: "",
      familyName: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const getUser = functions.httpsCallable("getUser");
      const result = await getUser();
      if (result.data) {
        this.firstName = result.data.firstName;
        this.familyName = result.data.familyName;
      }
    },
    async insertUser() {
      const updateUser = functions.httpsCallable("updateUser");
      await updateUser({
        firstName: this.firstName,
        familyName: this.familyName
      });
    }
  }
};
</script>
