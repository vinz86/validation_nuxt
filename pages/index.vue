<script setup lang="ts">
import type {Ref} from "vue";
import Form1 from "~/components/Form1.vue";
import TestForm from "~/components/TestForm.vue";
const form1Data: Ref<any> = ref({})
const testForm: Ref<any> = ref({})
</script>

<template>
  <div>
<!--    <p><strong>Form1:</strong> {{form1Data}}</p>
    <div class="flex" style="margin-top: 30px">
      <form1 v-model="form1Data" />
    </div>-->
    <p><strong>TestForm:</strong></p>
    <div class="flex" style="margin-top: 30px">
      <TestForm v-model="testForm" />
    </div>
  </div>
</template>

<style scoped>

</style>