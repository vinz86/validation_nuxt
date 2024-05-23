<template>
  <form @submit.prevent="submitForm">
    <!-- Text Input -->
    <div>
      <label for="textInput">Text Input</label>
      <input type="text" id="textInput" v-model="formData.textInput" @blur="() => validate('textInput')" />
      <span v-if="errors.textInput">{{ errors.textInput }}</span>
    </div>

    <!-- Email Input -->
    <div>
      <label for="emailInput">Email Input</label>
      <input type="email" id="emailInput" v-model="formData.emailInput" @blur="() => validate('emailInput')" />
      <span v-if="errors.emailInput">{{ errors.emailInput }}</span>
    </div>

    <!-- URL Input -->
    <div>
      <label for="urlInput">URL Input</label>
      <input type="url" id="urlInput" v-model="formData.urlInput" @blur="() => validate('urlInput')" />
      <span v-if="errors.urlInput">{{ errors.urlInput }}</span>
    </div>option1

    <!-- Phone Input -->
    <div>
      <label for="phoneInput">Phone Input</label>
      <input type="tel" id="phoneInput" v-model="formData.phoneInput" @blur="() => validate('phoneInput')" />
      <span v-if="errors.phoneInput">{{ errors.phoneInput }}</span>
    </div>

    <!-- Number Input -->
    <div>
      <label for="numberInput">Number Input</label>
      <input type="number" id="numberInput" v-model="formData.numberInput" @blur="() => validate('numberInput')" />
      <span v-if="errors.numberInput">{{ errors.numberInput }}</span>
    </div>

    <!-- Select -->
    <div>
      <label for="selectInput">Select Input</label>
      <select id="selectInput" v-model="formData.selectInput" @change="() => validate('selectInput')">
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <span v-if="errors.selectInput">{{ errors.selectInput }}</span>
    </div>

    <!-- Checkbox -->
    <div>
      <label for="checkboxInput">Checkbox Input</label>
      <input type="checkbox" id="checkboxInput" v-model="formData.checkboxInput" @change="() => validate('checkboxInput')" />
      <span v-if="errors.checkboxInput">{{ errors.checkboxInput }}</span>
    </div>

    <!-- Radio Buttons -->
    <div>
      <label>Radio Input</label>
      <input type="radio" id="radio1" value="option1" v-model="formData.radioInput" @change="() => validate('radioInput')" />
      <label for="radio1">Option 1</label>
      <input type="radio" id="radio2" value="option2" v-model="formData.radioInput" @change="() => validate('radioInput')" />
      <label for="radio2">Option 2</label>
      <span v-if="errors.radioInput">{{ errors.radioInput }}</span>
    </div>

    <!-- File Input -->
    <div>
      <label for="fileInput">File Input</label>
      <input type="file" id="fileInput" @change="handleFileUpload" />
      <span v-if="errors.fileInput">{{ errors.fileInput }}</span>
    </div>

    <!-- Submit Button -->
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import {
  generateRules,
  validateForm,
  validateFormField,
  getErrors
} from '~/Utils/validation';

const formData = reactive({
  textInput: '',
  emailInput: '',
  urlInput: '',
  phoneInput: '',
  numberInput: '',
  selectInput: '',
  checkboxInput: false,
  radioInput: '',
  fileInput: null
});

const validationRules = {
  textInput: generateRules({ string: true, min: 3, required: true }),
  emailInput: generateRules({ email: true, required: true }),
  urlInput: generateRules({ url: true }),
  phoneInput: generateRules({ phone: true }),
  numberInput: generateRules({ number: true, required: true }),
  selectInput: generateRules({ one_of: ['option2'], required: true }),
  checkboxInput: generateRules({ is: true }),
  radioInput: generateRules({ one_of: ['option1'], required: true }),
  fileInput: generateRules({ image: true, size: 1024 })
};

const errors = reactive(getErrors());

const validate = (fieldName) => {
  validateFormField(fieldName, formData, validationRules);
};

const handleFileUpload = (event) => {
  formData.fileInput = event.target.files[0];
  validate('fileInput');
};

const submitForm = () => {
  if (validateForm(formData, validationRules)) {
    alert('Form is valid!');
    // Submit form data
  } else {
    alert('Form has errors.');
  }
};
</script>

<style scoped>
form div {
  margin-bottom: 1em;
}
span {
  color: red;
}
</style>
