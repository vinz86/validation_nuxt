// Form2.ts

<template>
  <div>
    <InputText v-model="formData.nome" :class="{'p-invalid': isInvalid('nome')}" @change="validateFormField('nome')" placeholder="Inserisci il nome" />
    <InlineMessage severity="error" v-if="hasError('nome')">
      <span>{{ errors.nome }}</span>
    </InlineMessage>
  </div>
</template>

<script setup lang="ts">
import { defineModel, ref } from 'vue';
import {errors, isInvalid, hasError, validateField} from '@/Utils/validation';
import type {ValidationRules} from "@/Utils/validation";

const formData = defineModel();

// Regole di validazione specifiche per Form2
const validationRules: ValidationRules = {
  nome: [
    {
      validator: (value: any) => typeof value === 'string' && value.length >= 3 && value.length <= 5,
      message: 'Il nome deve essere compreso tra 3 e 5 caratteri',
    },
    // Altre regole di validazione per il campo "nome"
  ],
  // Altre regole di validazione per gli altri campi
};

function validateFormField(fieldName: string): void {
  const value = formData.value[fieldName];
  const errorMessage = validateField(fieldName, value, validationRules); // Corretto
  errors.value[fieldName] = errorMessage || null;

}

</script>
