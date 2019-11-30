<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ uid }}</p>
  </div>
</template>
<script>
import { functions } from "~/plugins/firebase";

export default {
  data() {
    return {
      message: "",
      uid: null
    };
  },
  mounted() {
    this.hello();
  },
  methods: {
    async hello() {
      const hello = functions.httpsCallable("hello");
      const result = await hello({ name: "takeshi" });
      this.message = result.data.message;
      this.uid = result.data.uid;
    }
  }
};
</script>
