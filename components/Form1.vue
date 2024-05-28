<script setup lang="ts">
import { ref } from 'vue';
import VValidate from 'v-validate';

const extraMessages = {
  is_test_async: 'Questo campo deve avere il valore "async"',
  custom_validator: 'Questo campo deve avere il valore "customValue"'
};

const customValidators = {
  custom_validator: () => (value: any) => value === 'customValue'
};

const customAsyncValidators = {
  is_test_async: async (value: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        console.log('resolve is_test_async', value === 'async')
        resolve(value === 'async');
      }, 1000);
    });
  },
};

const VV = new VValidate({
  lang: 'it',
  extraMessages: extraMessages,
  customValidators: customValidators,
  customAsyncValidators: customAsyncValidators
});

// Esempio di utilizzo callback
VV.setCallbacks({
  onValidateStart: (fieldName: string) => console.log(`onValidateStart: Inizio validazione campo: ${fieldName}`),
  onValidateEnd: (fieldName: string) => console.log(`onValidateEnd: Fine validazione campo: ${fieldName}`),
  onFieldValid: (fieldName: string) => console.log(`onFieldValid: Campo valido: ${fieldName}`),
  onFieldInvalid: (fieldName: string, message: string) => console.log(`onFieldInvalid: Campo non valido: ${fieldName}. Messaggio: ${message}`)
});


const formData = ref({
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
  imageField: null,
  mimeField: null,
  username: '',
  customField: '',
  isTestAsyncField: ''
});

const errors = ref<{ [key: string]: string | null }>({});

const handleImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  formData.value.imageField = file;
  validateField('imageField');
};

const handleSizeChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  formData.value.sizeField = file;
  validateField('sizeField');
};

const handleExtensionChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  formData.value.extensionField = file;
  validateField('extensionField');
};

const handleMimeChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  formData.value.mimeField = file;
  validateField('mimeField');
};

const rules = {
  stringField: VV.generateRules({ string: true }),
  numericField: VV.generateRules({ number: true }),
  emailField: VV.generateRules({ email: true }),
  urlField: VV.generateRules({ url: true }),
  phoneField: VV.generateRules({ phone: true }),
  requiredField: VV.generateRules({ required: true }),
  imageField: VV.generateRules({ image: true }),
  confirmedPassword: VV.generateRules({ confirmed: 'password' }),
  minField: VV.generateRules({ min: 5 }),
  maxField: VV.generateRules({ max: 10 }),
  betweenField: VV.generateRules({ between: [5, 10] }),
  regexField: VV.generateRules({ regex: /^[a-zA-Z0-9]+$/ }),
  sizeField: VV.generateRules({ size: 1024 }), // 1 KB
  oneOfField: VV.generateRules({ one_of: ['option1', 'option2', 'option3'] }),
  notOneOfField: VV.generateRules({ not_one_of: ['option1', 'option2', 'option3'] }),
  extensionField: VV.generateRules({ ext: ['.jpg', '.png', '.gif'] }),
  integerField: VV.generateRules({ integer: true }),
  isField: VV.generateRules({ is: 'example' }),
  isNotField: VV.generateRules({ is_not: 'example' }),
  lengthField: VV.generateRules({ length: 5 }),
  maxValueField: VV.generateRules({ max_value: 10 }),
  minValueField: VV.generateRules({ min_value: 5 }),
  mimeField: VV.generateRules({ mimes: ['image/jpeg', 'image/png'] }),
  customField: VV.generateRules({ custom_validator: true }),
  username: VV.generateRules({ required: true }),
  isTestAsyncField: VV.generateRules({ required: true }),
};
const asyncRules = {
  username: VV.generateAsyncRules({ uniqueUsername: formData.value.username }),
  isTestAsyncField: VV.generateAsyncRules({ is_test_async: true })
};

const validateAllFields = async () => {
  errors.value = {};
  for (const field in formData.value) {
    await VV.validateFormFieldWithRules(field, formData.value, rules, asyncRules);
    if (VV.hasError(field)) {
      errors.value[field] = VV.getErrors()[field];
    }
  }
};

/*const validateField = async (fieldName: string) => {
  await VV.validateFormFieldWithRules(fieldName, formData.value, rules);
  if (VV.hasError(fieldName)) {
    errors.value[fieldName] = VV.getErrors()[fieldName];
  } else {
    errors.value[fieldName] = null;
  }
};*/
const validateField = async (fieldName: string) => {
  await VV.validateFormFieldWithRules(fieldName, formData.value, rules, asyncRules);
  if (VV.hasError(fieldName)) {
    errors.value[fieldName] = VV.getErrors()[fieldName];
  } else {
    errors.value[fieldName] = null;
  }
  console.log(`Stato degli errori dopo la validazione del campo ${fieldName}:`, errors.value);
};

const isFormValid = ref(false);

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  await validateAllFields();
  isFormValid.value = Object.keys(errors.value).length === 0;
  if(isFormValid.value){
    // Il modulo è valido, procedi con l'invio
  } else {
    VV.setFocusToFirstInvalidField(); // Imposta il focus sul primo campo con errore
  }
};

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- isTestAsyncField -->
    <div>
      <label for="isTestAsyncField">Test Async:</label>
      <input type="text" id="isTestAsyncField" v-model="formData.isTestAsyncField" @keyup="validateField('isTestAsyncField')" placeholder="Test Async">
      <label v-if="errors.isTestAsyncField" class="error">{{ errors.isTestAsyncField }}</label>
    </div>

    <!-- Custom Field -->
    <div>
      <label for="customField">Custom Field:</label>
      <input type="text" id="customField" v-model="formData.customField" @keyup="validateField('customField')" placeholder="Custom Field">
      <label v-if="errors.customField" class="error">{{ errors.customField }}</label>
    </div>

    <!-- String Field -->
    <div>
      <label for="stringField">String Field:</label>
      <input type="text" id="stringField" v-model="formData.stringField" @keyup="validateField('stringField')" placeholder="String Field">
      <label v-if="errors.stringField" class="error">{{ errors.stringField }}</label>
    </div>

    <!-- Numeric Field -->
    <div>
      <label for="numericField">Numeric Field:</label>
      <input type="text" id="numericField" v-model="formData.numericField" @keyup="validateField('numericField')" placeholder="Numeric Field">
      <label v-if="errors.numericField" class="error">{{ errors.numericField }}</label>
    </div>

    <!-- Email Field -->
    <div>
      <label for="emailField">Email Field:</label>
      <input type="text" id="emailField" v-model="formData.emailField" @keyup="validateField('emailField')" placeholder="Email Field">
      <label v-if="errors.emailField" class="error">{{ errors.emailField }}</label>
    </div>

    <!-- URL Field -->
    <div>
      <label for="urlField">URL Field:</label>
      <input type="text" id="urlField" v-model="formData.urlField" @keyup="validateField('urlField')" placeholder="URL Field">
      <label v-if="errors.urlField" class="error">{{ errors.urlField }}</label>
    </div>

    <!-- Phone Field -->
    <div>
      <label for="phoneField">Phone Field:</label>
      <input type="text" id="phoneField" v-model="formData.phoneField" @keyup="validateField('phoneField')" placeholder="Phone Field">
      <label v-if="errors.phoneField" class="error">{{ errors.phoneField }}</label>
    </div>

    <!-- Required Field -->
    <div>
      <label for="requiredField">Required Field:</label>
      <input type="text" id="requiredField" v-model="formData.requiredField" @keyup="validateField('requiredField')" placeholder="Required Field">
      <label v-if="errors.requiredField" class="error">{{ errors.requiredField }}</label>
    </div>

    <!-- Image Field -->
    <div>
      <label>Image Field:</label>
      <input type="file" @change="handleImageChange">
      <label v-if="errors.imageField" class="error">{{ errors.imageField }}</label>
    </div>

    <!-- Confirmed Field -->
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="formData.password" @keyup="validateField('password')" placeholder="Password">
    </div>
    <div>
      <label for="confirmedPassword">Confirm Password:</label>
      <input type="password" id="confirmedPassword" v-model="formData.confirmedPassword" @keyup="validateField('confirmedPassword')" placeholder="Confirm Password">
      <label v-if="errors.confirmedPassword" class="error">{{ errors.confirmedPassword }}</label>
    </div>

    <!-- Min Field -->
    <div>
      <label for="minField">Min Field:</label>
      <input type="text" id="minField" v-model="formData.minField" @keyup="validateField('minField')" placeholder="Min Field">
      <label v-if="errors.minField" class="error">{{ errors.minField }}</label>
    </div>

    <!-- Max Field -->
    <div>
      <label for="maxField">Max Field:</label>
      <input type="text" id="maxField" v-model="formData.maxField" @keyup="validateField('maxField')" placeholder="Max Field">
      <label v-if="errors.maxField" class="error">{{ errors.maxField }}</label>
    </div>

    <!-- Between Field -->
    <div>
      <label for="betweenField">Between Field:</label>
      <input type="text" id="betweenField" v-model="formData.betweenField" @keyup="validateField('betweenField')" placeholder="Between Field">
      <label v-if="errors.betweenField" class="error">{{ errors.betweenField }}</label>
    </div>

    <!-- Regular Expression Field -->
    <div>
      <label for="regexField">Regex Field:</label>
      <input type="text" id="regexField" v-model="formData.regexField" @keyup="validateField('regexField')" placeholder="Regex Field">
      <label v-if="errors.regexField" class="error">{{ errors.regexField }}</label>
    </div>

    <!-- Size Field -->
    <div>
      <label>Size Field:</label>
      <input type="file" @change="handleSizeChange">
      <label v-if="errors.sizeField" class="error">{{ errors.sizeField }}</label>
    </div>

    <!-- One Of Field -->
    <div>
      <label for="oneOfField">One Of Field:</label>
      <select id="oneOfField" v-model="formData.oneOfField" @change="validateField('oneOfField')">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <label v-if="errors.oneOfField" class="error">{{ errors.oneOfField }}</label>
    </div>

    <!-- Not One Of Field -->
    <div>
      <label for="notOneOfField">Not One Of Field:</label>
      <select id="notOneOfField" v-model="formData.notOneOfField" @change="validateField('notOneOfField')">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <label v-if="errors.notOneOfField" class="error">{{ errors.notOneOfField }}</label>
    </div>

    <!-- Extension Field -->
    <div>
      <label>Extension Field:</label>
      <input type="file" @change="handleExtensionChange">
      <label v-if="errors.extensionField" class="error">{{ errors.extensionField }}</label>
    </div>

    <!-- Integer Field -->
    <div>
      <label for="integerField">Integer Field:</label>
      <input type="text" id="integerField" v-model="formData.integerField" @keyup="validateField('integerField')" placeholder="Integer Field">
      <label v-if="errors.integerField" class="error">{{ errors.integerField }}</label>
    </div>

    <!-- Is Field -->
    <div>
      <label for="isField">Is Field:</label>
      <input type="text" id="isField" v-model="formData.isField" @keyup="validateField('isField')" placeholder="Is Field">
      <label v-if="errors.isField" class="error">{{ errors.isField }}</label>
    </div>

    <!-- Is Not Field -->
    <div>
      <label for="isNotField">Is Not Field:</label>
      <input type="text" id="isNotField" v-model="formData.isNotField" @keyup="validateField('isNotField')" placeholder="Is Not Field">
      <label v-if="errors.isNotField" class="error">{{ errors.isNotField }}</label>
    </div>

    <!-- Length Field -->
    <div>
      <label for="lengthField">Length Field:</label>
      <input type="text" id="lengthField" v-model="formData.lengthField" @keyup="validateField('lengthField')" placeholder="Length Field">
      <label v-if="errors.lengthField" class="error">{{ errors.lengthField }}</label>
    </div>

    <!-- Max Value Field -->
    <div>
      <label for="maxValueField">Max Value Field:</label>
      <input type="text" id="maxValueField" v-model="formData.maxValueField" @keyup="validateField('maxValueField')" placeholder="Max Value Field">
      <label v-if="errors.maxValueField" class="error">{{ errors.maxValueField }}</label>
    </div>

    <!-- Min Value Field -->
    <div>
      <label for="minValueField">Min Value Field:</label>
      <input type="text" id="minValueField" v-model="formData.minValueField" @keyup="validateField('minValueField')" placeholder="Min Value Field">
      <label v-if="errors.minValueField" class="error">{{ errors.minValueField }}</label>
    </div>

    <!-- MIME Types Field -->
    <div>
      <label>MIME Types Field:</label>
      <input type="file" @change="handleMimeChange">
      <label v-if="errors.mimeField" class="error">{{ errors.mimeField }}</label>
    </div>

    <!-- username -->
    <div>
      <label for="username">Username univoco:</label>
      <input type="text" id="username" v-model="formData.username" @keyup="validateField('username')" placeholder="Username univoco">
      <label v-if="errors.username" class="error">{{ errors.username }}</label>
    </div>

    <button type="submit">Valida form</button>
  </form>

  <div v-if="isFormValid">Form valido!</div>
  <div v-else>Form non valido!</div>
</template>

<style>
.error {
  color: red;
}
</style>
