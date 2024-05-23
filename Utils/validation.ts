interface ValidationRule {
    validator: (value: any, formData?: any) => boolean;
    message: string;
}

interface ValidationRules {
    [fieldName: string]: ValidationRule[];
}

type ValidatorFunction = (value: any, formData?: any) => boolean;

class Validation {
    private errors = reactive<{ [key: string]: string | null }>({});

    private messages: { [key: string]: any } = {
        string: 'Il valore deve essere una stringa',
        min: (length: number) => `Il valore deve avere almeno ${length} caratteri`,
        max: (length: number) => `Il valore deve avere al massimo ${length} caratteri`,
        between: (min: number, max: number) => `Il valore deve essere tra ${min} e ${max} caratteri`,
        number: 'Il valore deve essere numerico',
        email: 'Il valore deve essere un indirizzo email valido',
        url: 'Il valore deve essere un URL valido',
        phone: 'Il valore deve essere un numero di telefono valido',
        required: 'Questo campo è obbligatorio',
        image: 'Il file deve essere un\'immagine',
        regex: 'Il valore non soddisfa il formato richiesto',
        size: (maxSize: number) => `Il file deve essere più piccolo di ${maxSize} KB`,
        confirmed: 'Il valore non coincide con il campo di conferma',
        one_of: 'Il valore deve essere uno di quelli consentiti',
        not_one_of: 'Il valore non deve essere uno di quelli non consentiti',
        ext: (extensions: string[]) => `L'estensione del file deve essere una di queste: ${extensions.join(', ')}`,
        integer: 'Il valore deve essere un numero intero',
        is: (comparison: any) => `Il valore deve essere uguale a ${comparison}`,
        is_not: (comparison: any) => `Il valore non deve essere uguale a ${comparison}`,
        length: (len: number) => `La lunghezza deve essere ${len}`,
        max_value: (max: number) => `Il valore deve essere minore o uguale a ${max}`,
        min_value: (min: number) => `Il valore deve essere maggiore o uguale a ${min}`,
        mimes: (types: string[]) => `Il tipo di file deve essere uno di questi: ${types.join(', ')}`,
    };

    private validators: { [key: string]: any } = {
        string: () => (value: any) => typeof value === 'string',
        min: (length: number) => (value: any) => (typeof value === 'string' && value.length >= length),
        max: (length: number) => (value: any) => (typeof value === 'string' && value.length <= length),
        between: (min: number, max: number) => (value: any) => (typeof value === 'string' && value.length >= min && value.length <= max),
        number: () => (value: any) => !isNaN(value),
        email: () => (value: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        url: () => (value: any) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
        phone: () => (value: any) => /^\+?(\d.*){3,}$/.test(value),
        required: () => (value: any) => value !== null && value !== undefined && value !== '',
        image: () => (value: any) => value instanceof File && value.type.startsWith('image/'),
        regex: (pattern: RegExp) => (value: any) => pattern.test(value),
        size: (maxSize: number) => (value: any) => value instanceof File && value.size <= maxSize * 1024,
        confirmed: (fieldToConfirm: string) => (value: any, formData: any) => value === formData[fieldToConfirm],
        one_of: (list: any[]) => (value: any) => list.includes(value),
        not_one_of: (list: any[]) => (value: any) => !list.includes(value),
        ext: (extensions: string[]) => (value: any) => extensions.some(ext => value.name.endsWith(ext)),
        integer: () => (value: any) => Number.isInteger(value),
        is: (comparison: any) => (value: any) => value === comparison,
        is_not: (comparison: any) => (value: any) => value !== comparison,
        length: (len: number) => (value: any) => value.length === len,
        max_value: (max: number) => (value: any) => value <= max,
        min_value: (min: number) => (value: any) => value >= min,
        mimes: (types: string[]) => (value: any) => types.includes(value.type),
    };

    public generateRules(rules: { [key: string]: any }): ValidationRule[] {
        return Object.entries(rules).map(([key, value]) => {
            if (!this.validators[key]) {
                throw new Error(`Validatore per la chiave "${key}" non trovato.`);
            }
            return {
                validator: this.validators[key](value),
                message: typeof this.messages[key] === 'function' ? this.messages[key](value) : this.messages[key],
            };
        });
    }

    public validateField(fieldName: string, value: any, rules: ValidationRules, formData?: any): string | null {
        const fieldRules = rules[fieldName];
        if (!fieldRules) return null;

        for (const rule of fieldRules) {
            const result = rule.validator(value, formData);
            if (!result) {
                return rule.message;
            }
        }

        return null;
    }

    public validateFormField(fieldName: string, formData: any, validationRules: ValidationRules): void {
        const value = formData[fieldName];
        const errorMessage = this.validateField(fieldName, value, validationRules, formData);
        this.errors[fieldName] = errorMessage || null;
    }

    public validateForm(formData: any, validationRules: ValidationRules): boolean {
        let isValid = true;
        for (const fieldName in validationRules) {
            if (Object.prototype.hasOwnProperty.call(validationRules, fieldName)) {
                this.validateFormField(fieldName, formData, validationRules);
                if (this.errors[fieldName]) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }

    public isInvalid(fieldName: string): boolean {
        return !!this.errors[fieldName];
    }

    public hasError(fieldName: string): boolean {
        return this.isInvalid(fieldName) && this.errors[fieldName] !== null;
    }

    public getErrors() {
        return this.errors;
    }

    public getValidators() {
        return this.validators;
    }

    public getMessages() {
        return this.messages;
    }
}

const validationInstance = new Validation();

export const generateRules = validationInstance.generateRules.bind(validationInstance);
export const validateField = validationInstance.validateField.bind(validationInstance);
export const validateFormField = validationInstance.validateFormField.bind(validationInstance);
export const validateForm = validationInstance.validateForm.bind(validationInstance);
export const isInvalid = validationInstance.isInvalid.bind(validationInstance);
export const hasError = validationInstance.hasError.bind(validationInstance);
export const getErrors = validationInstance.getErrors.bind(validationInstance);
export const getValidators = validationInstance.getValidators.bind(validationInstance);
export const getMessages = validationInstance.getMessages.bind(validationInstance);

export default Validation;
