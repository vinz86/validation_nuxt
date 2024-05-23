Documentazione di Utilizzo di Validation

Documentazione di Utilizzo di Validation
========================================

Descrizione
-----------

La classe `Validation` fornisce un sistema per validare i campi di un modulo secondo criteri specifici.

Utilizzo
--------

### Importazione

Per utilizzare la classe `Validation` in un modulo Vue, è necessario importarla come segue:

    <script setup>
    import Validation, { generateRules, validateForm, validateFormField } from '~/path/to/Validation';
    </script>


### Creazione di un'istanza

È possibile creare un'istanza della classe `Validation` nel componente Vue:

    <script setup>
    const validationInstance = new Validation();
    </script>


### Definizione delle Regole di Validazione

È possibile definire le regole di validazione per ciascun campo del modulo utilizzando il metodo `generateRules`:

    <script setup>
    const rules = {
      username: generateRules({ required: true, min: 3, max: 20 }),
      email: generateRules({ required: true, email: true }),
      password: generateRules({ required: true, min: 6 }),
      confirmPassword: generateRules({ required: true, confirmed: 'password' })
    };
    </script>


### Validazione del Modulo

È possibile eseguire la validazione del modulo chiamando il metodo `validateForm`:

    <script setup>
    const handleSubmit = () => {
      const isValid = validateForm(formData, rules);
      if (isValid) {
        // Invia il modulo
      } else {
        // Gestisci gli errori di validazione
      }
    };
    </script>


### Visualizzazione degli Errori di Validazione

Per visualizzare gli errori di validazione, è possibile utilizzare il metodo `getErrors`:

    <script setup>
    const errors = getErrors();
    </script>


Esempio Completo
----------------

    <template>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="formData.username">
        <span v-if="errors.username">{{ errors.username }}</span>
    
        <input type="email" v-model="formData.email">
        <span v-if="errors.email">{{ errors.email }}</span>
    
        <input type="password" v-model="formData.password">
        <span v-if="errors.password">{{ errors.password }}</span>
    
        <input type="password" v-model="formData.confirmPassword">
        <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
    
        <button type="submit">Invia</button>
      </form>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import Validation, { generateRules, validateForm, getErrors } from '~/path/to/Validation';
    
    const validationInstance = new Validation();
    
    const formData = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    const rules = {
      username: generateRules({ required: true, min: 3, max: 20 }),
      email: generateRules({ required: true, email: true }),
      password: generateRules({ required: true, min: 6 }),
      confirmPassword: generateRules({ required: true, confirmed: 'password' })
    };
    
    const handleSubmit = () => {
      const isValid = validateForm(formData.value, rules);
      if (isValid) {
        // Invia il modulo
      } else {
        // Gestisci gli errori di validazione
      }
    };
    
    const errors = getErrors();
    </script>


## Lista di validatori
*   **string**
    *   **Descrizione:** Verifica se il valore è una stringa.
    *   **Esempio di utilizzo:**  
        `generateRules({ string: true })`
*   **number**
    *   **Descrizione:** Verifica se il valore è un numero.
    *   **Esempio di utilizzo:**  
        `generateRules({ number: true })`
*   **email**
    *   **Descrizione:** Verifica se il valore è un indirizzo email valido.
    *   **Esempio di utilizzo:**  
        `generateRules({ email: true })`
*   **url**
    *   **Descrizione:** Verifica se il valore è un URL valido.
    *   **Esempio di utilizzo:**  
        `generateRules({ url: true })`
*   **phone**
    *   **Descrizione:** Verifica se il valore è un numero di telefono valido.
    *   **Esempio di utilizzo:**  
        `generateRules({ phone: true })`
*   **required**
    *   **Descrizione:** Verifica se il valore è presente.
    *   **Esempio di utilizzo:**  
        `generateRules({ required: true })`
*   **image**
    *   **Descrizione:** Verifica se il valore è un'immagine.
    *   **Esempio di utilizzo:**  
        `generateRules({ image: true })`
*   **regex**
    *   **Descrizione:** Verifica se il valore soddisfa un determinato pattern regolare.
    *   **Esempio di utilizzo:**  
        `generateRules({ regex: /pattern/ })`
*   **size**
    *   **Descrizione:** Verifica se la dimensione del file è inferiore a una soglia specificata (in KB).
    *   **Esempio di utilizzo:**  
        `generateRules({ size: 1024 })`
*   **confirmed**
    *   **Descrizione:** Verifica se il valore corrisponde al valore di un altro campo conferma.
    *   **Esempio di utilizzo:**  
        `generateRules({ confirmed: 'campoConferma' })`
*   **min**
    *   **Descrizione:** Verifica se il valore ha una lunghezza minima specificata.
    *   **Esempio di utilizzo:**  
        `generateRules({ min: 5 })`
*   **max**
    *   **Descrizione:** Verifica se il valore ha una lunghezza massima specificata.
    *   **Esempio di utilizzo:**  
        `generateRules({ max: 10 })`
*   **between**
    *   **Descrizione:** Verifica se il valore ha una lunghezza compresa tra due valori specificati.
    *   **Esempio di utilizzo:**  
        `generateRules({ between: [5, 10] })`
*   **one\_of**
    *   **Descrizione:** Verifica se il valore è incluso in un elenco di valori consentiti.
    *   **Esempio di utilizzo:**  
        `generateRules({ one_of: ['valore1', 'valore2', 'valore3'] })`
*   **not\_one\_of**
    *   **Descrizione:** Verifica se il valore non è incluso in un elenco di valori non consentiti.
    *   **Esempio di utilizzo:**  
        `generateRules({ not_one_of: ['valore1', 'valore2', 'valore3'] })`
*   **ext**
    *   **Descrizione:** Verifica se l'estensione del file è inclusa in un elenco di estensioni consentite.
    *   **Esempio di utilizzo:**  
        `generateRules({ ext: ['.jpg', '.png', '.gif'] })`
*   **integer**
    *   **Descrizione:** Verifica se il valore è un numero intero.
    *   **Esempio di utilizzo:**  
        `generateRules({ integer: true })`
*   **is**
    *   **Descrizione:** Verifica se il valore è uguale a un valore specificato.
    *   **Esempio di utilizzo:**  
        `generateRules({ is: 'valoreConfronto' })`
*   **is\_not**
    *   **Descrizione:** Verifica se il valore non è uguale a un valore specificato.
    *   **Esempio di utilizzo:**  
        `generateRules({ is_not: 'valoreConfronto' })`
*   **length**
    *   **Descrizione:** Verifica se la lunghezza del valore è uguale a una lunghezza specificata.
    *   **Esempio di utilizzo:**  
        `generateRules({ length: 5 })`
*   **max\_value**
    *   **Descrizione:** Verifica se il valore è minore o uguale a un valore massimo specificato.
    *   **Esempio di utilizzo:**  
        `generateRules({ max_value: 10 })`
*   **min\_value**
    *   **Descrizione:** Verifica se il valore è maggiore o uguale a un valore minimo specificato.
    *   **Esempio di utilizzo:**  
        `generateRules({ min_value: 5 })`
*   **mimes**
    *   **Descrizione:** Verifica se il tipo di file è incluso in un elenco di tipi MIME consentiti.
    *   **Esempio di utilizzo:**  
        `generateRules({ mimes: ['image/jpeg', 'image/png'] })`