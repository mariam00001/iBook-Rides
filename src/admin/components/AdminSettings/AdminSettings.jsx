import { useEffect, useRef, useState } from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
  FaSave,
} from 'react-icons/fa';
import {
  AdminApiError,
  fetchAdminSettings,
  storeAdminSetting,
  updateAdminSetting,
} from '../../api';
import { displayBackendValue } from '../../types/backend';
import styles from './AdminSettings.module.css';

const MERCHANT_SETTING_KEY = 'merchant-account';
const GATEWAY_OPTIONS = [
  { value: '', label: 'Select gatway' },
  { value: 'stripe', label: 'Stripe' },
  { value: 'paypal', label: 'PayPal' },
];
const MODE_OPTIONS = [
  { value: '', label: 'select mode' },
  { value: 'test', label: 'Test' },
  { value: 'live', label: 'Live' },
];

const EMPTY_FORM = {
  emailId: '',
  password: '',
  paymentGateway: '',
  mode: '',
  currencyCode: 'us',
  enterKeys: '',
  secondKey: '',
  terms: '',
};

/** Fields present in the UI design but not supported by the admin settings API. */
const BACKEND_GAPS = [
  'Email section (Email ID, Password) — no admin email settings endpoint or setting key',
  'Merchant “Enter second Key” — backend merchant value only documents one key (key / api_key)',
  'Terms and conditions — no terms setting key or endpoint',
];

function parseMerchantValue(rawValue) {
  if (rawValue == null) return {};
  if (typeof rawValue === 'object' && !Array.isArray(rawValue)) return rawValue;
  if (typeof rawValue !== 'string') return {};
  try {
    const parsed = JSON.parse(rawValue);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function AdminSettings() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [merchantExists, setMerchantExists] = useState(false);
  const [listMessage, setListMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const termsRef = useRef(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const result = await fetchAdminSettings();
      if (!active) return;

      setListMessage(result.backendMissing ? result.message : '');

      const merchantRow = result.items.find((row) => {
        const key = displayBackendValue(row.key) || row.id;
        return key === MERCHANT_SETTING_KEY;
      });

      if (merchantRow) {
        const valueObj = parseMerchantValue(displayBackendValue(merchantRow.value));
        setMerchantExists(true);
        setForm((prev) => ({
          ...prev,
          paymentGateway: String(
            valueObj.payment_gate ?? valueObj.provider ?? prev.paymentGateway ?? ''
          ),
          mode: String(valueObj.mode ?? prev.mode ?? ''),
          currencyCode: String(valueObj.currency_code ?? prev.currencyCode ?? 'us'),
          enterKeys: String(valueObj.key ?? valueObj.api_key ?? prev.enterKeys ?? ''),
          // secondKey / email / terms: not returned by backend
        }));
      }

      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const onField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const applyEditorCommand = (command) => {
    const el = termsRef.current;
    if (!el) return;
    el.focus();
    document.execCommand(command, false, null);
    setForm((prev) => ({ ...prev, terms: el.innerHTML }));
  };

  const onTermsInput = () => {
    const el = termsRef.current;
    if (!el) return;
    setForm((prev) => ({ ...prev, terms: el.innerHTML }));
  };

  const handleSave = async () => {
    setActionError('');
    setActionSuccess('');
    setSubmitting(true);

    const gaps = [];
    if (form.emailId || form.password) {
      gaps.push('Email settings cannot be saved — backend is missing.');
    }
    if (form.secondKey) {
      gaps.push('Second key cannot be saved — backend is missing.');
    }
    if (form.terms && form.terms.replace(/<[^>]*>/g, '').trim()) {
      gaps.push('Terms and conditions cannot be saved — backend is missing.');
    }

    try {
      const payload = {
        label: 'Merchant Account',
        group: 'payments',
        key: MERCHANT_SETTING_KEY,
        value: {
          payment_gate: form.paymentGateway,
          mode: form.mode,
          currency_code: form.currencyCode,
          key: form.enterKeys,
        },
      };

      if (merchantExists) {
        await updateAdminSetting(MERCHANT_SETTING_KEY, payload);
      } else {
        await storeAdminSetting(payload);
        setMerchantExists(true);
      }

      if (gaps.length) {
        setActionSuccess('Merchant account saved.');
        setActionError(gaps.join(' '));
      } else {
        setActionSuccess('Merchant account saved.');
      }
    } catch (error) {
      setActionError(
        error instanceof AdminApiError ? error.message : 'Failed to save settings'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page} data-testid="admin-settings-page">
      {loading ? (
        <p className={styles.status} data-testid="admin-settings-loading">
          Loading…
        </p>
      ) : null}

      {listMessage ? (
        <p className={styles.banner} data-testid="admin-settings-backend-banner">
          {listMessage}
        </p>
      ) : null}

      <div className={styles.gapsBanner} data-testid="admin-settings-backend-gaps">
        <p className={styles.gapsTitle}>Backend missing for this UI</p>
        <ul className={styles.gapsList}>
          {BACKEND_GAPS.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
      </div>

      {actionError ? (
        <p className={styles.banner} data-testid="admin-settings-action-error" role="alert">
          {actionError}
        </p>
      ) : null}
      {actionSuccess ? (
        <p className={styles.success} data-testid="admin-settings-action-success">
          {actionSuccess}
        </p>
      ) : null}

      {/* Email */}
      <section className={styles.card} data-testid="admin-settings-email-section">
        <h3 className={styles.sectionTitle}>Email</h3>
        <div className={styles.row2}>
          <label className={styles.field}>
            <span className={styles.label}>
              Email ID <span className={styles.required}>*</span>
            </span>
            <input
              type="email"
              name="emailId"
              className={styles.input}
              placeholder="your-email@company.com"
              value={form.emailId}
              onChange={onField}
              data-testid="admin-settings-email-id"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              Password <span className={styles.required}>*</span>
            </span>
            <input
              type="password"
              name="password"
              className={styles.input}
              placeholder="your-email@company.com"
              value={form.password}
              onChange={onField}
              data-testid="admin-settings-password"
            />
          </label>
        </div>
        <p className={styles.fieldGap} data-testid="admin-settings-email-backend-missing">
          Backend missing: email settings are not available on `/admin/settings`.
        </p>
      </section>

      {/* Merchant Account */}
      <section className={styles.card} data-testid="admin-settings-merchant-section">
        <h3 className={styles.sectionTitle}>Merchant Account</h3>
        <div className={styles.row3}>
          <label className={styles.field}>
            <span className={styles.label}>
              payment gatway <span className={styles.required}>*</span>
            </span>
            <select
              name="paymentGateway"
              className={styles.select}
              value={form.paymentGateway}
              onChange={onField}
              data-testid="admin-settings-payment-gateway"
            >
              {GATEWAY_OPTIONS.map((opt) => (
                <option key={opt.value || 'empty'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              select mode <span className={styles.required}>*</span>
            </span>
            <select
              name="mode"
              className={styles.select}
              value={form.mode}
              onChange={onField}
              data-testid="admin-settings-mode"
            >
              {MODE_OPTIONS.map((opt) => (
                <option key={opt.value || 'empty'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              Currency Code <span className={styles.required}>*</span>
            </span>
            <input
              type="text"
              name="currencyCode"
              className={styles.input}
              value={form.currencyCode}
              onChange={onField}
              data-testid="admin-settings-currency"
            />
          </label>
        </div>
        <div className={styles.row2}>
          <label className={styles.field}>
            <span className={styles.label}>
              Enter keys <span className={styles.required}>*</span>
            </span>
            <input
              type="text"
              name="enterKeys"
              className={styles.inputTall}
              value={form.enterKeys}
              onChange={onField}
              data-testid="admin-settings-enter-keys"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              Enter second Key <span className={styles.required}>*</span>
            </span>
            <input
              type="text"
              name="secondKey"
              className={styles.inputTall}
              value={form.secondKey}
              onChange={onField}
              data-testid="admin-settings-second-key"
            />
            <span
              className={styles.fieldGap}
              data-testid="admin-settings-second-key-backend-missing"
            >
              Backend missing: only one merchant key is supported.
            </span>
          </label>
        </div>
      </section>

      {/* Terms and conditions */}
      <section className={styles.card} data-testid="admin-settings-terms-section">
        <h3 className={styles.sectionTitle}>Terms and conditions</h3>
        <div className={styles.editor} data-testid="admin-settings-terms-editor">
          <div className={styles.toolbar}>
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Bold"
              data-testid="admin-settings-terms-bold"
              onClick={() => applyEditorCommand('bold')}
            >
              <FaBold />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Italic"
              data-testid="admin-settings-terms-italic"
              onClick={() => applyEditorCommand('italic')}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Underline"
              data-testid="admin-settings-terms-underline"
              onClick={() => applyEditorCommand('underline')}
            >
              <FaUnderline />
            </button>
            <span className={styles.toolbarDivider} />
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Align Left"
              data-testid="admin-settings-terms-align-left"
              onClick={() => applyEditorCommand('justifyLeft')}
            >
              <FaAlignLeft />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Align Center"
              data-testid="admin-settings-terms-align-center"
              onClick={() => applyEditorCommand('justifyCenter')}
            >
              <FaAlignCenter />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Align Right"
              data-testid="admin-settings-terms-align-right"
              onClick={() => applyEditorCommand('justifyRight')}
            >
              <FaAlignRight />
            </button>
            <span className={styles.toolbarDivider} />
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Bullet List"
              data-testid="admin-settings-terms-ul"
              onClick={() => applyEditorCommand('insertUnorderedList')}
            >
              <FaListUl />
            </button>
            <button
              type="button"
              className={styles.toolbarBtn}
              title="Numbered List"
              data-testid="admin-settings-terms-ol"
              onClick={() => applyEditorCommand('insertOrderedList')}
            >
              <FaListOl />
            </button>
          </div>
          <div
            ref={termsRef}
            className={styles.editorContent}
            contentEditable
            suppressContentEditableWarning
            onInput={onTermsInput}
            data-testid="admin-settings-terms-content"
            role="textbox"
            aria-multiline="true"
            aria-label="Terms and conditions"
          />
        </div>
        <p className={styles.fieldGap} data-testid="admin-settings-terms-backend-missing">
          Backend missing: terms and conditions cannot be persisted.
        </p>
      </section>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.saveBtn}
          data-testid="admin-settings-save"
          onClick={handleSave}
          disabled={submitting || loading}
        >
          <FaSave />
          {submitting ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;
