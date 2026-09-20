import { useEffect, useState } from 'react';
import { FaSearch, FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import DataTable, { dataTableStyles as t } from '../../../shared/ui/DataTable/DataTable';
import FormModal, { FormField, FormRow, formModalStyles as m } from '../../../shared/ui/FormModal/FormModal';
import BackendMissingValue from '../shared/BackendMissingValue';
import {
  AdminApiError,
  deleteAdminSetting,
  fetchAdminSettings,
  storeAdminSetting,
  updateAdminSetting,
} from '../../api';
import { displayBackendValue } from '../../types/backend';
import styles from './AdminSettings.module.css';

const COLUMNS = [
  { key: 'label', label: 'LABEL' },
  { key: 'group', label: 'GROUP' },
  { key: 'key', label: 'KEY' },
  { key: 'value', label: 'VALUE' },
  { key: 'actions', label: 'ACTIONS' },
];

const EMPTY_FORM = {
  label: 'Merchant Account',
  group: 'payments',
  key: 'merchant-account',
  payment_gate: 'stripe',
  mode: 'test',
  currency_code: 'us',
  apiKey: '',
};

function AdminSettings() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [listMessage, setListMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadSettings = async (term) => {
    setLoading(true);
    const result = await fetchAdminSettings(term || undefined);
    setRows(result.items);
    setListMessage(result.backendMissing ? result.message : '');
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const result = await fetchAdminSettings(appliedSearch || undefined);
      if (!active) return;
      setRows(result.items);
      setListMessage(result.backendMissing ? result.message : '');
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [appliedSearch]);

  const onField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCreate = () => {
    setEditingKey(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (row) => {
    setEditingKey(displayBackendValue(row.key) || row.id);
    setForm({
      ...EMPTY_FORM,
      label: displayBackendValue(row.label),
      group: displayBackendValue(row.group),
      key: displayBackendValue(row.key) || row.id,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setActionError('');
    const payload = {
      label: form.label,
      group: form.group,
      key: form.key,
      value: {
        payment_gate: form.payment_gate,
        mode: form.mode,
        currency_code: form.currency_code,
        key: form.apiKey,
      },
    };

    setSubmitting(true);
    try {
      if (editingKey) {
        await updateAdminSetting(editingKey, payload);
      } else {
        await storeAdminSetting(payload);
      }
      setShowModal(false);
      await loadSettings(appliedSearch);
    } catch (error) {
      setActionError(
        error instanceof AdminApiError ? error.message : 'Failed to save setting'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (key) => {
    setActionError('');
    try {
      await deleteAdminSetting(key);
      setRows((prev) => prev.filter((row) => row.id !== key));
    } catch (error) {
      setActionError(
        error instanceof AdminApiError ? error.message : 'Failed to delete setting'
      );
    }
  };

  return (
    <div className={styles.page} data-testid="admin-settings-page">
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search settings..."
            value={search}
            data-testid="admin-settings-search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setAppliedSearch(search);
            }}
          />
        </div>
        <button
          type="button"
          className={styles.addBtn}
          data-testid="admin-settings-add"
          onClick={openCreate}
        >
          <FaPlus />
          Add Setting
        </button>
      </div>

      {listMessage ? (
        <p className={styles.banner} data-testid="admin-settings-backend-banner">
          {listMessage}
        </p>
      ) : null}
      {actionError ? (
        <p className={styles.banner} data-testid="admin-settings-action-error" role="alert">
          {actionError}
        </p>
      ) : null}

      <DataTable columns={COLUMNS} testId="admin-settings-table">
        {loading ? (
          <tr>
            <td colSpan={5}>
              <span className={styles.empty}>Loading…</span>
            </td>
          </tr>
        ) : rows.length === 0 ? (
          <tr>
            <td colSpan={5}>
              <span className={styles.empty}>No results</span>
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id}>
              <td>
                <BackendMissingValue field={row.label} />
              </td>
              <td>
                <BackendMissingValue field={row.group} />
              </td>
              <td>
                <BackendMissingValue field={row.key} />
              </td>
              <td>
                <BackendMissingValue field={row.value} />
              </td>
              <td>
                <div className={t.actions}>
                  <button
                    type="button"
                    className={t.editBtn}
                    data-testid={`admin-settings-edit-${row.id}`}
                    onClick={() => openEdit(row)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    type="button"
                    className={t.deleteBtn}
                    data-testid={`admin-settings-delete-${row.id}`}
                    onClick={() => handleDelete(row.id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>

      <FormModal
        open={showModal}
        title={editingKey ? 'Update Setting' : 'Add Setting'}
        submitLabel={submitting ? 'Saving…' : editingKey ? 'Update' : 'Save'}
        testId="admin-settings-modal"
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      >
        <FormRow>
          <FormField label="Label">
            <input
              className={m.input}
              name="label"
              value={form.label}
              onChange={onField}
              data-testid="admin-settings-label"
            />
          </FormField>
          <FormField label="Group">
            <input
              className={m.input}
              name="group"
              value={form.group}
              onChange={onField}
              data-testid="admin-settings-group"
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Key">
            <input
              className={m.input}
              name="key"
              value={form.key}
              onChange={onField}
              data-testid="admin-settings-key"
            />
          </FormField>
          <FormField label="Payment Gate">
            <input
              className={m.input}
              name="payment_gate"
              value={form.payment_gate}
              onChange={onField}
              data-testid="admin-settings-payment-gate"
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Mode">
            <input
              className={m.input}
              name="mode"
              value={form.mode}
              onChange={onField}
              data-testid="admin-settings-mode"
            />
          </FormField>
          <FormField label="Currency Code">
            <input
              className={m.input}
              name="currency_code"
              value={form.currency_code}
              onChange={onField}
              data-testid="admin-settings-currency"
            />
          </FormField>
        </FormRow>
        <FormField label="API Key">
          <input
            className={m.input}
            name="apiKey"
            value={form.apiKey}
            onChange={onField}
            data-testid="admin-settings-api-key"
          />
        </FormField>
      </FormModal>
    </div>
  );
}

export default AdminSettings;
