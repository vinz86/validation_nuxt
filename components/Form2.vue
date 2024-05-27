<script setup lang="ts">
import {onMounted, ref} from 'vue';
import VValidate from '~/Utils/DSValidate/src/VValidate';

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
  emailField: '',
  urlField: '',
  phoneField: '',
  username: '',
  customField: '',
  isTestAsyncField: ''
});

const rules = {
  emailField: VV.generateRules({ email: true }),
  urlField: VV.generateRules({ url: true }),
  phoneField: VV.generateRules({ phone: true }),
  customField: VV.generateRules({ custom_validator: true }),
  username: VV.generateRules({ required: true }),
  isTestAsyncField: VV.generateRules({ required: true }),
};
const asyncRules = {
  username: VV.generateAsyncRules({ uniqueUsername: formData.value.username }),
  isTestAsyncField: VV.generateAsyncRules({ is_test_async: true })
};

const validateField = async (fieldName: string) => await VV.validateFormField(fieldName, formData.value);

const isFormValid = ref(false);

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  await VV.validateForm(formData.value)
  isFormValid.value = VV.getErrors() && Object.keys(VV.getErrors()).length === 0;
  if(isFormValid.value){
    // Il modulo è valido, procedi con l'invio
  } else {
    VV.setFocusToFirstInvalidField(); // Imposta il focus sul primo campo con errore
  }
};

onMounted(()=>{
  VV.setValidationRules(rules, asyncRules);
})

</script>

<template>
  <form @submit.prevent="handleSubmit">

    <!-- Email Field -->
    <div>
      <label for="emailField">Email Field:</label>
      <input type="text" id="emailField" v-model="formData.emailField" @keyup="validateField('emailField')" placeholder="Email Field">
      <label v-if="VV.hasError('emailField')" class="error">{{ VV.getError('emailField') }}</label>
    </div>

    <!-- URL Field -->
    <div>
      <label for="urlField">URL Field:</label>
      <input type="text" id="urlField" v-model="formData.urlField" @keyup="validateField('urlField')" placeholder="URL Field">
      <label v-if="VV.hasError('urlField')" class="error">{{ VV.getError('urlField') }}</label>
    </div>

    <!-- Phone Field -->
    <div>
      <label for="phoneField">Phone Field:</label>
      <input type="text" id="phoneField" v-model="formData.phoneField" @keyup="validateField('phoneField')" placeholder="Phone Field">
      <label v-if="VV.hasError('phoneField')" class="error">{{ VV.getError('phoneField') }}</label>
    </div>

    <!-- username -->
    <div>
      <label for="username">Username univoco:</label>
      <input type="text" id="username" v-model="formData.username" @keyup="validateField('username')" placeholder="Username univoco">
      <label v-if="VV.hasError('username')" class="error">{{ VV.getError('username') }}</label>
    </div>

    <!-- Custom Field -->
    <div>
      <label for="customField">Custom Field:</label>
      <input type="text" id="customField" v-model="formData.customField" @keyup="validateField('customField')" placeholder="Custom Field">
      <label v-if="VV.hasError('customField')" class="error">{{ VV.getError('customField') }}</label>
    </div>

    <!-- isTestAsyncField -->
    <div>
      <label for="isTestAsyncField">Test Async:</label>
      <input type="text" id="isTestAsyncField" v-model="formData.isTestAsyncField" @keyup="validateField('isTestAsyncField')" placeholder="Test Async">
      <label v-if="VV.hasError('isTestAsyncField')" class="error">{{ VV.getError('isTestAsyncField') }}</label>
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
