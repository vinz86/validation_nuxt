<template>
  <div>
    <InputText v-model="formData.nome" name="nome" :class="{'p-invalid': $v.formData.nome.$error}" placeholder="Inserisci il nome" />
    <InlineMessage severity="error" v-if="$v.formData.nome.$error">
      <span>{{ $v.formData.nome.$errors[0] }}</span>
    </InlineMessage>

    <InputNumber v-model="formData.anni" name="anni" :class="{'p-invalid': $v.formData.anni.$error}" placeholder="Inserisci l'età" />
    <ErrorMessage name="anni" />

    <InputText v-model="formData.email" name="email" :class="{'p-invalid': $v.formData.email.$error}" placeholder="Inserisci l'email" />
    <ErrorMessage name="email" />

    <InputText v-model="formData.url" name="url" :class="{'p-invalid': $v.formData.url.$error}" placeholder="Inserisci l'URL" />
    <ErrorMessage name="url" />
    <!-- Altri input -->
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { defineModel } from 'vue';

const { formData, handleSubmit, meta, errors } = useForm();

defineModel(formData);

</script>
