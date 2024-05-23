<script setup>
import { ref } from 'vue';
import Validation, {getErrors, hasError, validateFormField} from "~/Utils/validation";

const model = ref('');
const validation = new Validation();

const props = defineProps({
  fieldName: { type: String, required: true },
  placeholder: { type: String, default: '' },
  fieldType: { type: String, required: true },
  validationRules: { type: Object, required: true },
});

function handleInput(event) {
  const value = event.target.value;
  model.value = value;
  validateFormField(props.fieldName, value, props.validationRules);
}

function formatErrorMessage(message) {
  return typeof message === 'object' ? Object.values(message)[0] : message;
}
</script>

<template>
  <div>
    <component
        :is="fieldType"
        v-model="model"
        :class="{ 'p-invalid': hasError(fieldName) }"
        @input="handleInput"
        :placeholder="placeholder"
    />
    <br>
    <InlineMessage severity="error" v-if="hasError(fieldName)">
      <span>{{ formatErrorMessage(getErrors(fieldName)) }}</span>
    </InlineMessage>
  </div>
</template>