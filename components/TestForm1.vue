<script setup lang="ts">
import {ref} from 'vue';
import VValidate from 'v-validate';

const formData = ref({
  emailField: '',
  phoneField: '',
  username: '',
  customField: '',
  isTestAsyncField: ''
});


// Classe con i validatori aggiuntivi
const VV = new VValidate({
  lang: 'it',
  autoFocus: true
});

// Aggiunta dinamica di un nuovo validatore personalizzato
VV.addCustomValidator(
    'custom_validator_runtime',
    (value: any) => value === 'customValue',
    'Questo campo deve avere il valore "customValue"'
);

// Regole di validazione
const rules = {
  emailField: VV.generateRules({ email: true }),
  phoneField: VV.generateRules({ phone: true }),
  username: VV.generateRules({ required: true }),
  customFieldRuntime: VV.generateRules({ custom_validator_runtime: true }),
};

// Regole di validazione asincrone
const asyncRules = {
  username: VV.generateAsyncRules({ uniqueUsername: formData.value.username }),
};

/** Aggiungo le regole di validazione alla classe
 *
 * In questo modo posso chiamare i metodi:
 * validateField('fieldname', value)
 * validateFormField('fieldname', formDataObject)
 * validateForm(formDataObject)
 *
 * In alternativa è possibile chiamare i metodi:
 * validateFormFieldWithRules('fieldName', formData, rulesObject, asyncRulesObject)
 * validateFormWithRules(formData, rulesObject, asyncRulesObject)
 *
 */
VV.setValidationRules(rules, asyncRules);

// Esempio di utilizzo callback
VV.setCallbacks({
  onValidateStart: (fieldName: string) => console.log(`onValidateStart: Inizio validazione campo: ${fieldName}`),
  onValidateEnd: (fieldName: string) => console.log(`onValidateEnd: Fine validazione campo: ${fieldName}`),
  onFieldValid: (fieldName: string) => console.log(`onFieldValid: Campo valido: ${fieldName}`),
  onFieldInvalid: (fieldName: string, message: string) => console.log(`onFieldInvalid: Campo non valido: ${fieldName}. Messaggio: ${message}`)
});

/** Metodo di supporto per la validazione
 *
 * In alternativa si può validare il singolo campo in questo modo:
 * @keyup="VV.validateField('fieldName', formData.fieldName)"
 *
 * @param fieldName
 */
const validateField = async (fieldName: string) => await VV.validateFormField(fieldName, formData.value);

// Invio del form e validazione
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  // Validazione
  await VV.validateForm(formData.value)
  if(VV.isFormValid()){
    console.log("Form valido")
  } else {
    VV.setFocusToFirstInvalidField(); // Imposta il focus sul primo campo con errore
  }
};

</script>

<template>
  <form @submit.prevent="handleSubmit">

    <!-- Email Field -->
    <div class="field-container">
      <label for="emailField">Email Field:</label><br>
      <input type="text" id="emailField" v-model="formData.emailField" @keyup="VV.validateField('emailField', formData.emailField)" placeholder="Email Field"><br>
      <span v-if="VV.hasError('emailField')" class="error">{{ VV.getError('emailField') }}</span>
    </div>

    <!-- Phone Field -->
    <div class="field-container">
      <label for="phoneField">Phone Field:</label><br>
      <input type="text" id="phoneField" v-model="formData.phoneField" @keyup="validateField('phoneField')" placeholder="Phone Field"><br>
      <span v-if="VV.hasError('phoneField')" class="error">{{ VV.getError('phoneField') }}</span>
    </div>

    <!-- username -->
    <div class="field-container">
      <label for="username">Username univoco:</label><br>
      <input type="text" id="username" v-model="formData.username" @keyup="validateField('username')" placeholder="Username univoco"><br>
      <span v-if="VV.hasError('username')" class="error">{{ VV.getError('username') }}</span>
    </div>

    <!-- customFieldRuntime -->
    <div class="field-container">
      <label for="customFieldRuntime">customFieldRuntime:</label><br>
      <input type="text" id="customFieldRuntime" v-model="formData.customFieldRuntime" @keyup="validateField('customFieldRuntime')" placeholder="customFieldRuntime"><br>
      <span v-if="VV.hasError('customFieldRuntime')" class="error">{{ VV.getError('customFieldRuntime') }}</span>
    </div>
    customFieldRuntime
    <button type="submit">Valida form</button>
  </form>

  <div v-if="VV.isFormValid()">Form valido!</div>
  <div v-else>
    <p>Form non valido!</p>
    <ul>
      <template v-for="error in VV.getErrors()">
        <li class="error" v-if="error">{{error}}</li>
      </template>
    </ul>
  </div>

  {{VV.getValidators()}}
</template>

<style>
.field-container{
  float:left;
  width: 100%;
  margin-bottom: 15px;

}
label{font-weight: bold;}
.error {
  color: red;
  padding: 5px;
}
</style>
