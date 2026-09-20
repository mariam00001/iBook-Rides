import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiUserLine } from 'react-icons/ri';
import DataTable, { dataTableStyles as t } from '../../../shared/ui/DataTable/DataTable';
import FormModal, {
  FormField,
  FormRow,
  FileUploadField,
} from '../../../shared/ui/FormModal/FormModal';
import BackendMissingValue from '../shared/BackendMissingValue';
import { AdminApiError, deleteAdminUser, fetchAdminUsers, storeAdminUser } from '../../api';
import { displayBackendValue } from '../../types/backend';
import styles from './AdminUsers.module.css';

const COLUMNS = [
  { key: 'user', label: 'User Information' },
  { key: 'contact', label: 'Contact Details' },
  { key: 'plan', label: 'Plan Name' },
  { key: 'status', label: 'Status' },
  { key: 'payment', label: 'last payment' },
  { key: 'actions', label: 'Actions' },
];

const ENTRIES_PER_PAGE = 5;

const EMPTY_FORM = {
  companyName: '',
  siteUrl: '',
  city: '',
  state: '',
  phoneNumber: '',
  emailAddress: '',
  country: '',
  zipCode: '',
  contactPersonName: '',
  loginEmail: '',
  password: '',
  notes: '',
};

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendBanner, setBackendBanner] = useState('');
  const [actionError, setActionError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('Plan');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('Plan');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [uploadFile, setUploadFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef(null);

  useEffect(() => () => setUploadFile(null), []);

  const loadUsers = async () => {
    setLoading(true);
    const result = await fetchAdminUsers({
      search: appliedSearch || undefined,
      package: appliedFilter !== 'Plan' ? appliedFilter.toLowerCase() : undefined,
      limit: 50,
    });
    setUsers(result.items);
    setBackendBanner(result.backendMissing ? result.message : '');
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const result = await fetchAdminUsers({
        search: appliedSearch || undefined,
        package: appliedFilter !== 'Plan' ? appliedFilter.toLowerCase() : undefined,
        limit: 50,
      });
      if (!active) return;
      setUsers(result.items);
      setBackendBanner(result.backendMissing ? result.message : '');
      setLoading(false);
      setCurrentPage(1);
    })();
    return () => {
      active = false;
    };
  }, [appliedSearch, appliedFilter]);

  const filteredUsers = users.filter((user) => {
    const query = appliedSearch.trim().toLowerCase();
    const name = displayBackendValue(user.name).toLowerCase();
    const email = displayBackendValue(user.email).toLowerCase();
    const plan = displayBackendValue(user.plan).toLowerCase();
    const matchesSearch =
      !query ||
      name.includes(query) ||
      email.includes(query) ||
      String(user.id).toLowerCase().includes(query);
    const matchesPlan =
      appliedFilter === 'Plan' || plan === appliedFilter.toLowerCase();
    return matchesSearch && matchesPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ENTRIES_PER_PAGE));
  const indexOfLast = currentPage * ENTRIES_PER_PAGE;
  const indexOfFirst = indexOfLast - ENTRIES_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
    setAppliedFilter(filterPlan);
    setCurrentPage(1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(EMPTY_FORM);
    setUploadFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    setActionError('');
    const apiPayload = {
      name: formData.contactPersonName || formData.companyName || 'Subscriber',
      email: formData.loginEmail || formData.emailAddress,
      password: formData.password || 'password',
      password_confirmation: formData.password || 'password',
      role: 'company',
      plan_id: 4,
    };

    // UI form fields not accepted by POST /admin/users (Postman contract):
    // companyName, siteUrl, city, state, phoneNumber, country, zipCode, notes, upload
    setSubmitting(true);
    try {
      await storeAdminUser(apiPayload);
      closeModal();
      await loadUsers();
    } catch (error) {
      setActionError(
        error instanceof AdminApiError
          ? error.message
          : 'Failed to create subscriber'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setActionError('');
    try {
      await deleteAdminUser(id);
      setUsers((prev) => {
        const next = prev.filter((item) => item.id !== id);
        const nextFilteredCount = next.filter((user) => {
          const query = appliedSearch.trim().toLowerCase();
          const name = displayBackendValue(user.name).toLowerCase();
          const email = displayBackendValue(user.email).toLowerCase();
          const plan = displayBackendValue(user.plan).toLowerCase();
          const matchesSearch =
            !query ||
            name.includes(query) ||
            email.includes(query) ||
            String(user.id).toLowerCase().includes(query);
          const matchesPlan =
            appliedFilter === 'Plan' || plan === appliedFilter.toLowerCase();
          return matchesSearch && matchesPlan;
        }).length;
        const pages = Math.max(1, Math.ceil(nextFilteredCount / ENTRIES_PER_PAGE));
        setCurrentPage((page) => Math.min(page, pages));
        return next;
      });
    } catch (error) {
      setActionError(
        error instanceof AdminApiError ? error.message : 'Failed to delete user'
      );
    }
  };

  const handleEditClick = () => {
    setActionError(
      'BACKEND ENDPOINT MISSING / NOT AVAILABLE: Edit User form UI is not present. PATCH /admin/users/:id exists on backend.'
    );
  };

  return (
    <div className={styles.page} data-testid="admin-users-page">
      {backendBanner ? (
        <p className={styles.backendBanner} data-testid="admin-users-backend-banner">
          {backendBanner}
        </p>
      ) : null}
      {actionError ? (
        <p className={styles.backendBanner} data-testid="admin-users-action-error" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className={styles.filters} data-testid="admin-users-filters">
        <div className={styles.field}>
          <label htmlFor="admin-users-search">Search</label>
          <div className={styles.searchWrap}>
            <FaSearch className={styles.searchIcon} />
            <input
              id="admin-users-search"
              type="text"
              className={styles.searchInput}
              placeholder="Search ..."
              value={searchTerm}
              data-testid="admin-users-search"
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSearch();
              }}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="admin-users-filter">Filter by</label>
          <select
            id="admin-users-filter"
            className={styles.filterSelect}
            value={filterPlan}
            data-testid="admin-users-filter"
            onChange={(event) => setFilterPlan(event.target.value)}
          >
            <option value="Plan">Plan</option>
            <option value="Premium">Premium</option>
            <option value="Basic">Basic</option>
            <option value="Trail">Trail</option>
            <option value="Plus">Plus</option>
          </select>
        </div>

        <button
          type="button"
          className={styles.searchBtn}
          data-testid="admin-users-search-btn"
          onClick={handleSearch}
        >
          <FaSearch />
          Search
        </button>
      </div>

      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.addBtn}
          data-testid="admin-users-add-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Subscriber
        </button>
      </div>

      <div className={styles.tableCard}>
        <DataTable columns={COLUMNS} testId="admin-users-table">
          {loading ? (
            <tr>
              <td colSpan={6}>
                <span className={styles.backendBanner}>Loading…</span>
              </td>
            </tr>
          ) : currentUsers.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <span className={styles.backendBanner}>No results</span>
              </td>
            </tr>
          ) : (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={t.userCell}>
                    <div className={t.avatar}>
                      <RiUserLine />
                    </div>
                    <div>
                      <div className={t.userName}>
                        <BackendMissingValue field={user.name} />
                      </div>
                      <div className={styles.userId}>ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.contactEmail}>
                    <BackendMissingValue field={user.email} />
                  </div>
                  <div className={styles.contactPhone}>
                    <BackendMissingValue field={user.phone} />
                  </div>
                </td>
                <td>
                  <span className={t.planBadge}>
                    <BackendMissingValue field={user.plan} />
                  </span>
                </td>
                <td>
                  {user.status?.backendStatus === 'ok' ? (
                    <span className={styles.statusOk}>
                      <BackendMissingValue field={user.status} />
                    </span>
                  ) : (
                    <BackendMissingValue field={user.status} />
                  )}
                </td>
                <td>
                  <div className={styles.paymentDate}>
                    <BackendMissingValue field={user.lastPayment} />
                  </div>
                </td>
                <td>
                  <div className={t.actions}>
                    <button
                      type="button"
                      className={t.editBtn}
                      data-testid={`admin-users-edit-${user.id}`}
                      aria-label={`Edit ${displayBackendValue(user.name)}`}
                      onClick={handleEditClick}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      type="button"
                      className={t.deleteBtn}
                      data-testid={`admin-users-delete-${user.id}`}
                      aria-label={`Delete ${displayBackendValue(user.name)}`}
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </DataTable>

        <div className={styles.pagination} data-testid="admin-users-pagination">
          <span className={styles.paginationInfo}>
            Showing {filteredUsers.length === 0 ? 0 : indexOfFirst + 1} to{' '}
            {Math.min(indexOfLast, filteredUsers.length)} of {filteredUsers.length} results
          </span>
          <div className={styles.paginationBtns}>
            <button
              type="button"
              className={styles.pageBtn}
              disabled={currentPage === 1}
              data-testid="admin-users-page-prev"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`.trim()}
                data-testid={`admin-users-page-${page}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className={styles.pageBtn}
              disabled={currentPage === totalPages}
              data-testid="admin-users-page-next"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <FormModal
        open={showModal}
        title="Add Subscriber"
        submitLabel={submitting ? 'Saving…' : '+ Add Category'}
        onClose={closeModal}
        onSubmit={handleSubmit}
        testId="add-subscriber-modal"
        compact
      >
        <FormRow spaced>
          <FormField label="Company Name">
            <input
              name="companyName"
              placeholder="enter name"
              value={formData.companyName}
              onChange={handleInputChange}
              data-testid="subscriber-company-name"
            />
          </FormField>
          <FormField label="Site Url">
            <input
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleInputChange}
              data-testid="subscriber-site-url"
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="City">
            <input name="city" value={formData.city} onChange={handleInputChange} data-testid="subscriber-city" />
          </FormField>
          <FormField label="State">
            <input name="state" value={formData.state} onChange={handleInputChange} data-testid="subscriber-state" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Phone Number">
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} data-testid="subscriber-phone" />
          </FormField>
          <FormField label="Email Address">
            <input name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} data-testid="subscriber-email" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Country">
            <input name="country" value={formData.country} onChange={handleInputChange} data-testid="subscriber-country" />
          </FormField>
          <FormField label="Zip Code">
            <input name="zipCode" value={formData.zipCode} onChange={handleInputChange} data-testid="subscriber-zip" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Contact Person Name">
            <input name="contactPersonName" value={formData.contactPersonName} onChange={handleInputChange} data-testid="subscriber-contact-person" />
          </FormField>
          <FormField label="Login Email">
            <input name="loginEmail" value={formData.loginEmail} onChange={handleInputChange} data-testid="subscriber-login-email" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Password">
            <input name="password" type="password" value={formData.password} onChange={handleInputChange} data-testid="subscriber-password" />
          </FormField>
          <FormField label="Notes">
            <input name="notes" value={formData.notes} onChange={handleInputChange} data-testid="subscriber-notes" />
          </FormField>
        </FormRow>
        <FileUploadField
          inputRef={fileInputRef}
          fileName={uploadFile?.name || null}
          onChange={(event) => setUploadFile(event.target.files?.[0] || null)}
          testId="subscriber-upload"
        />
      </FormModal>
    </div>
  );
}

export default AdminUsers;
