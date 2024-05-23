<script setup lang="ts">
import type {Ref} from "vue";
import Form2 from "~/components/Form2.vue";
import Form1 from "~/components/Form1.vue";
const form1Data: Ref<any> = ref({})
const form2Data: Ref<any> = ref({})
</script>

<template>
  <div>
<!--<p><strong>Form1:</strong> {{form1Data}}</p>
    <p><strong>Form2:</strong> {{form2Data}}</p>-->
    <div class="flex" style="margin-top: 30px">
      <form1 v-model="form1Data" />
    </div>
<!--    <div class="flex">
      <Form2 v-model="form2Data" />
    </div>-->
  </div>
</template>

<style scoped>

</style>