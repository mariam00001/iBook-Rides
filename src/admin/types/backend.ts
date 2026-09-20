/**
 * Shared backend-gap helpers for Admin module.
 * UI remains visible when API does not return a field.
 */

export type BackendStatus = 'ok' | 'missing' | 'unavailable';

export interface BackendField<T = unknown> {
  value: T | null;
  backendStatus: BackendStatus;
  message: string;
  backendMissing?: boolean;
}

export const BACKEND_MISSING_TEXT = 'Not returned from backend';
export const BACKEND_UNAVAILABLE_CARD = 'Backend value unavailable';
export const BACKEND_NO_TABLE_DATA = 'No data returned from backend';
export const BACKEND_NO_OPTIONS = 'Options not returned from backend';
export const BACKEND_SECTION_UNSUPPORTED =
  'This section exists in the UI specification but is not currently supported by the backend.';

export function missingField<T = null>(message: string = BACKEND_MISSING_TEXT): BackendField<T> {
  return {
    value: null,
    backendStatus: 'missing',
    backendMissing: true,
    message,
  };
}

export function okField<T>(value: T): BackendField<T> {
  return {
    value,
    backendStatus: 'ok',
    backendMissing: false,
    message: '',
  };
}

export function displayBackendValue(field: BackendField<string | number | null | undefined>): string {
  if (field.backendStatus !== 'ok' || field.value === null || field.value === undefined || field.value === '') {
    return field.message || BACKEND_MISSING_TEXT;
  }
  return String(field.value);
}
