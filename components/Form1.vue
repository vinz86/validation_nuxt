
<script setup>
import { ref } from 'vue';
import {
  generateRules,
  validateForm,
  validateFormField,
  getErrors,
  hasError // Make sure to import hasError
} from "~/Utils/validation";

const formData = {
  stringField: '',
  numericField: '',
  emailField: '',
  urlField: '',
  phoneField: '',
  requiredField: '',
  password: '',
  confirmedPassword: '',
  minField: '',
  maxField: '',
  betweenField: '',
  regexField: '',
  sizeField: null,
  oneOfField: '',
  notOneOfField: '',
  extensionField: null,
  integerField: '',
  isField: '',
  isNotField: '',
  lengthField: '',
  maxValueField: '',
  minValueField: '',
  mimeField: null
};

const errors = ref({});

const handleImageChange = (event) => {
  const file = event.target.files[0];
  formData.imageField = file;
};

const handleSizeChange = (event) => {
  const file = event.target.files[0];
  formData.sizeField = file;
};

const handleExtensionChange = (event) => {
  const file = event.target.files[0];
  formData.extensionField = file;
};

const handleMimeChange = (event) => {
  const file = event.target.files[0];
  formData.mimeField = file;
};

const validateAllFields = () => {
  const rules = {
    stringField: generateRules({ string: true }),
    numericField: generateRules({ number: true }),
    emailField: generateRules({ email: true }),
    urlField: generateRules({ url: true }),
    phoneField: generateRules({ phone: true }),
    requiredField: generateRules({ required: true }),
    imageField: generateRules({ image: true }),
    confirmedPassword: generateRules({ confirmed: 'password' }),
    minField: generateRules({ min: 5 }),
    maxField: generateRules({ max: 10 }),
    betweenField: generateRules({ between: [5, 10] }),
    regexField: generateRules({ regex: /^[a-zA-Z0-9]+$/ }),
    sizeField: generateRules({ size: 1024 }), // 1 KB
    oneOfField: generateRules({ one_of: ['option1', 'option2', 'option3'] }),
    notOneOfField: generateRules({ not_one_of: ['option1', 'option2', 'option3'] }),
    extensionField: generateRules({ ext: ['.jpg', '.png', '.gif'] }),
    integerField: generateRules({ integer: true }),
    isField: generateRules({ is: 'example' }),
    isNotField: generateRules({ is_not: 'example' }),
    lengthField: generateRules({ length: 5 }),
    maxValueField: generateRules({ max_value: 10 }),
    minValueField: generateRules({ min_value: 5 }),
    mimeField: generateRules({ mimes: ['image/jpeg', 'image/png'] })
  };

  errors.value = {};
  for (const field in formData) {
    validateFormField(field, formData, rules);
    if (hasError(field)) {
      errors.value[field] = getErrors()[field];
    }
  }
};

const isFormValid = ref(false);

const validateFormAndSetValidity = () => {
  const rules = {
    stringField: generateRules({ string: true }),
    numericField: generateRules({ number: true }),
    emailField: generateRules({ email: true }),
    urlField: generateRules({ url: true }),
    phoneField: generateRules({ phone: true }),
    requiredField: generateRules({ required: true }),
    imageField: generateRules({ image: true }),
    confirmedPassword: generateRules({ confirmed: 'password' }),
    minField: generateRules({ min: 5 }),
    maxField: generateRules({ max: 10 }),
    betweenField: generateRules({ between: [5, 10] }),
    regexField: generateRules({ regex: /^[a-zA-Z0-9]+$/ }),
    sizeField: generateRules({ size: 1024 }), // 1 KB
    oneOfField: generateRules({ one_of: ['option1', 'option2', 'option3'] }),
    notOneOfField: generateRules({ not_one_of: ['option1', 'option2', 'option3'] }),
    extensionField: generateRules({ ext: ['.jpg', '.png', '.gif'] }),
    integerField: generateRules({ integer: true }),
    isField: generateRules({ is: 'example' }),
    isNotField: generateRules({ is_not: 'example' }),
    lengthField: generateRules({ length: 5 }),
    maxValueField: generateRules({ max_value: 10 }),
    minValueField: generateRules({ min_value: 5 }),
    mimeField: generateRules({ mimes: ['image/jpeg', 'image/png'] })
  };

  isFormValid.value = validateForm(formData, rules);
};

</script>
<template>
  <div>
    <!-- String Field -->
    <input type="text" v-model="formData.stringField" placeholder="String Field">
    <div v-if="hasError('stringField')">Error: {{ getErrors()['stringField'] }}</div>

    <!-- Numeric Field -->
    <input type="text" v-model="formData.numericField" placeholder="Numeric Field">
    <div v-if="hasError('numericField')">Error: {{ getErrors()['numericField'] }}</div>

    <!-- Email Field -->
    <input type="text" v-model="formData.emailField" placeholder="Email Field">
    <div v-if="hasError('emailField')">Error: {{ getErrors()['emailField'] }}</div>

    <!-- URL Field -->
    <input type="text" v-model="formData.urlField" placeholder="URL Field">
    <div v-if="hasError('urlField')">Error: {{ getErrors()['urlField'] }}</div>

    <!-- Phone Field -->
    <input type="text" v-model="formData.phoneField" placeholder="Phone Field">
    <div v-if="hasError('phoneField')">Error: {{ getErrors()['phoneField'] }}</div>

    <!-- Required Field -->
    <input type="text" v-model="formData.requiredField" placeholder="Required Field">
    <div v-if="hasError('requiredField')">Error: {{ getErrors()['requiredField'] }}</div>

    <!-- Image Field -->
    <input type="file" @change="handleImageChange">
    <div v-if="hasError('imageField')">Error: {{ getErrors()['imageField'] }}</div>

    <!-- Confirmed Field -->
    <input type="password" v-model="formData.password" placeholder="Password">
    <input type="password" v-model="formData.confirmedPassword" placeholder="Confirm Password">
    <div v-if="hasError('confirmedPassword')">Error: {{ getErrors()['confirmedPassword'] }}</div>

    <!-- Min Field -->
    <input type="text" v-model="formData.minField" placeholder="Min Field">
    <div v-if="hasError('minField')">Error: {{ getErrors()['minField'] }}</div>

    <!-- Max Field -->
    <input type="text" v-model="formData.maxField" placeholder="Max Field">
    <div v-if="hasError('maxField')">Error: {{ getErrors()['maxField'] }}</div>

    <!-- Between Field -->
    <input type="text" v-model="formData.betweenField" placeholder="Between Field">
    <div v-if="hasError('betweenField')">Error: {{ getErrors()['betweenField'] }}</div>

    <!-- Regular Expression Field -->
    <input type="text" v-model="formData.regexField" placeholder="Regex Field">
    <div v-if="hasError('regexField')">Error: {{ getErrors()['regexField'] }}</div>

    <!-- Size Field -->
    <input type="file" @change="handleSizeChange">
    <div v-if="hasError('sizeField')">Error: {{ getErrors()['sizeField'] }}</div>

    <!-- One Of Field -->
    <select v-model="formData.oneOfField">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
    <div v-if="hasError('oneOfField')">Error: {{ getErrors()['oneOfField'] }}</div>

    <!-- Not One Of Field -->
    <select v-model="formData.notOneOfField">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
    <div v-if="hasError('notOneOfField')">Error: {{ getErrors()['notOneOfField'] }}</div>

    <!-- Extension Field -->
    <input type="file" @change="handleExtensionChange">
    <div v-if="hasError('extensionField')">Error: {{ getErrors()['extensionField'] }}</div>

    <!-- Integer Field -->
    <input type="text" v-model="formData.integerField" placeholder="Integer Field">
    <div v-if="hasError('integerField')">Error: {{ getErrors()['integerField'] }}</div>

    <!-- Is Field -->
    <input type="text" v-model="formData.isField" placeholder="Is Field">
    <div v-if="hasError('isField')">Error: {{ getErrors()['isField'] }}</div>

    <!-- Is Not Field -->
    <input type="text" v-model="formData.isNotField" placeholder="Is Not Field">
    <div v-if="hasError('isNotField')">Error: {{ getErrors()['isNotField'] }}</div>

    <!-- Length Field -->
    <input type="text" v-model="formData.lengthField" placeholder="Length Field">
    <div v-if="hasError('lengthField')">Error: {{ getErrors()['lengthField'] }}</div>

    <!-- Max Value Field -->
    <input type="text" v-model="formData.maxValueField" placeholder="Max Value Field">
    <div v-if="hasError('maxValueField')">Error: {{ getErrors()['maxValueField'] }}</div>

    <!-- Min Value Field -->
    <input type="text" v-model="formData.minValueField" placeholder="Min Value Field">
    <div v-if="hasError('minValueField')">Error: {{ getErrors()['minValueField'] }}</div>

    <!-- MIME Types Field -->
    <input type="file" @change="handleMimeChange">
    <div v-if="hasError('mimeField')">Error: {{ getErrors()['mimeField'] }}</div>

    <!-- Validate All Fields Button -->
    <button @click="validateAllFields">Validate All Fields</button>
    <div v-if="isFormValid">Form is valid!</div>
    <div v-else>Form is invalid!</div>
  </div>
</template>


<style>
/* Add your styles here */
</style>
