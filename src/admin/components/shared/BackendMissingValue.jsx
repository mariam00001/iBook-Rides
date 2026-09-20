import { displayBackendValue } from '../../types/backend';
import styles from './BackendMissingValue.module.css';

/**
 * Renders a backend-mapped field. Keeps the UI cell visible when the API
 * does not return the value (shows the gap message instead of inventing data).
 */
function BackendMissingValue({ field, multiline = false, testId }) {
  const text = displayBackendValue(field);
  const isMissing = field?.backendStatus !== 'ok';

  return (
    <span
      className={isMissing ? styles.missing : styles.value}
      data-testid={testId}
      data-backend-status={field?.backendStatus || 'missing'}
      style={multiline ? { whiteSpace: 'pre-line' } : undefined}
    >
      {text}
    </span>
  );
}

export default BackendMissingValue;
