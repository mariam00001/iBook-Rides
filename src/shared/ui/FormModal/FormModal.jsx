import { useEffect } from 'react';
import { HiUpload } from 'react-icons/hi';
import styles from './FormModal.module.css';

function FormField({ label, children, className = '' }) {
  return (
    <div className={`${styles.group} ${className}`.trim()}>
      {label ? <label>{label}</label> : null}
      {children}
    </div>
  );
}

function FormRow({ children, spaced = false }) {
  return <div className={spaced ? styles.rowSpaced : styles.row}>{children}</div>;
}

function FileUploadField({
  label = 'IMG Upload',
  inputRef,
  fileName,
  onChange,
  inputId = 'shared-file-upload',
  testId = 'shared-file-upload',
}) {
  return (
    <FormField label={label}>
      <div className={styles.fileUpload}>
        <input
          ref={inputRef}
          type="file"
          id={inputId}
          accept="image/*"
          style={{ display: 'none' }}
          data-testid={`${testId}-input`}
          onChange={onChange}
        />
        <button
          type="button"
          className={styles.fileUploadBtn}
          data-testid={testId}
          onClick={() => inputRef?.current?.click()}
        >
          <HiUpload />
          Choose File
        </button>
      </div>
      {fileName ? <small className={styles.fileName}>{fileName}</small> : null}
    </FormField>
  );
}

function FormModal({
  open,
  title,
  onClose,
  onSubmit,
  submitLabel = '+ Add',
  children,
  testId = 'shared-form-modal',
  compact = false,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      data-testid={`${testId}-overlay`}
      onClick={onClose}
    >
      <div
        className={`${styles.content} ${compact ? styles.compact : ''}`.trim()}
        data-testid={testId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            type="button"
            className={styles.close}
            data-testid={`${testId}-close`}
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.(event);
          }}
        >
          <div className={styles.body}>{children}</div>
          <div className={styles.footer}>
            <button
              type="submit"
              className={styles.submitBtn}
              data-testid={`${testId}-submit`}
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { FormField, FormRow, FileUploadField, styles as formModalStyles };
export default FormModal;
