// validation.ts

export interface ValidationRule {
    validator: (value: any) => boolean;
    message: string;
}

export interface ValidationRules {
    [fieldName: string]: ValidationRule[];
}

export const errors = ref<{ [key: string]: string | null }>({});

export function isInvalid(fieldName: string): boolean {
    return !!errors.value[fieldName];
}

export function hasError(fieldName: string): boolean {
    return isInvalid(fieldName) && errors.value[fieldName] !== null;
}

export class Validator {
    private rules: ValidationRules;

    constructor(rules: ValidationRules) {
        this.rules = rules;
    }

    validate(fieldName: string, value: any): string | null {
        const fieldRules = this.rules[fieldName];
        if (!fieldRules) return null;

        for (const rule of fieldRules) {
            if (!rule.validator(value)) {
                return rule.message;
            }
        }

        return null;
    }
}

export function validateForm(data: Record<string, any>, rules: ValidationRules): Record<string, string | null> {
    const errors: Record<string, string | null> = {};

    for (const fieldName in rules) {
        if (Object.prototype.hasOwnProperty.call(rules, fieldName)) {
            const fieldRules = rules[fieldName];
            const value = data[fieldName];

            for (const rule of fieldRules) {
                if (!rule.validator(value)) {
                    errors[fieldName] = rule.message;
                    break;
                } else {
                    errors[fieldName] = null;
                }
            }
        }
    }

    return errors;
}

export function validateField(fieldName: string, value: any, validationRules: ValidationRules): string | null {
    const fieldRules = validationRules[fieldName];
    if (!fieldRules) return null;

    for (const rule of fieldRules) {
        if (!rule.validator(value)) {
            return rule.message;
        }
    }

    return null;
}
