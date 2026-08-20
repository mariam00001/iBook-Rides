import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { LuUser } from 'react-icons/lu';
import DataTable, { dataTableStyles as t } from '../../../shared/ui/DataTable/DataTable';
import FormModal, {
  FormField,
  FormRow,
  FileUploadField,
  formModalStyles as m,
} from '../../../shared/ui/FormModal/FormModal';
import styles from './AdminUsers.module.css';

const COLUMNS = [
  { key: 'user', label: 'User Information' },
  { key: 'contact', label: 'Contact Details' },
  { key: 'plan', label: 'Plan Name' },
  { key: 'status', label: 'Status' },
  { key: 'payment', label: 'last payment' },
  { key: 'actions', label: 'Actions' },
];

const INITIAL_USERS = [
  {
    id: 'u001',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 100 123 4567',
    plan: 'Premium',
    status: 'Active',
    lastPayment: '2024-01-01',
  },
  {
    id: 'u002',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 100 123 4567',
    plan: 'Basic',
    status: 'Active',
    lastPayment: '2024-01-01',
  },
  {
    id: 'u003',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 100 123 4567',
    plan: 'Trail',
    status: 'Active',
    lastPayment: '2024-01-01',
  },
  {
    id: 'u004',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 100 123 4567',
    plan: 'Plus',
    status: 'Active',
    lastPayment: '2024-01-01',
  },
];

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
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('Plan');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('Plan');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [uploadFile, setUploadFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => () => setUploadFile(null), []);

  const filteredUsers = users.filter((user) => {
    const query = appliedSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query);
    const matchesPlan =
      appliedFilter === 'Plan' || user.plan.toLowerCase() === appliedFilter.toLowerCase();
    return matchesSearch && matchesPlan;
  });

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
    setAppliedFilter(filterPlan);
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

  const handleSubmit = () => {
    const nextId = `u${String(users.length + 1).padStart(3, '0')}`;
    setUsers((prev) => [
      {
        id: nextId,
        name: formData.contactPersonName || formData.companyName || 'New Subscriber',
        email: formData.loginEmail || formData.emailAddress || '—',
        phone: formData.phoneNumber || '—',
        plan: 'Basic',
        status: 'Active',
        lastPayment: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    closeModal();
  };

  return (
    <div className={styles.page} data-testid="admin-users-page">
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

      <DataTable columns={COLUMNS} testId="admin-users-table">
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td>
              <div className={t.userCell}>
                <div className={t.avatar}>
                  <LuUser />
                </div>
                <div>
                  <div className={t.userName}>{user.name}</div>
                  <div className={t.email}>ID: {user.id}</div>
                </div>
              </div>
            </td>
            <td>
              <div className={t.email}>{user.email}</div>
              <div className={t.phone}>{user.phone}</div>
            </td>
            <td>
              <span className={t.planBadge}>{user.plan}</span>
            </td>
            <td>
              <span className={t.statusBadge}>{user.status}</span>
            </td>
            <td className={t.date}>{user.lastPayment}</td>
            <td>
              <div className={t.actions}>
                <button
                  type="button"
                  className={t.editBtn}
                  data-testid={`admin-users-edit-${user.id}`}
                  aria-label={`Edit ${user.name}`}
                >
                  <AiOutlineEdit />
                </button>
                <button
                  type="button"
                  className={t.deleteBtn}
                  data-testid={`admin-users-delete-${user.id}`}
                  aria-label={`Delete ${user.name}`}
                  onClick={() => setUsers((prev) => prev.filter((item) => item.id !== user.id))}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>

      <FormModal
        open={showModal}
        title="Add Subscriber"
        submitLabel="+ Add Category"
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
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              data-testid="subscriber-city"
            />
          </FormField>
          <FormField label="State">
            <input
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              data-testid="subscriber-state"
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Phone Number">
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              data-testid="subscriber-phone"
            />
          </FormField>
          <FormField label="Email Address">
            <input
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleInputChange}
              data-testid="subscriber-email"
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Country">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              data-testid="subscriber-country"
            >
              <option value="">add</option>
              <option value="Egypt">Egypt</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </FormField>
          <FormField label="ZIP Code">
            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              data-testid="subscriber-zip"
            />
          </FormField>
        </FormRow>

        <h4 className={m.sectionTitle}>Login Information</h4>
        <FormRow>
          <FormField label="Contact Person Name">
            <input
              name="contactPersonName"
              placeholder="enter name"
              value={formData.contactPersonName}
              onChange={handleInputChange}
              data-testid="subscriber-contact-name"
            />
          </FormField>
          <FormField label="Login Email">
            <input
              name="loginEmail"
              type="email"
              value={formData.loginEmail}
              onChange={handleInputChange}
              data-testid="subscriber-login-email"
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Password">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              data-testid="subscriber-password"
            />
          </FormField>
          <FormField label="Notes">
            <input
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              data-testid="subscriber-notes"
            />
          </FormField>
        </FormRow>

        <h4 className={m.sectionTitle}>IMG Upload</h4>
        <FormRow>
          <FileUploadField
            inputRef={fileInputRef}
            fileName={uploadFile?.name}
            onChange={(event) => setUploadFile(event.target.files?.[0] || null)}
            inputId="subscriber-image-upload"
            testId="subscriber-img-upload"
          />
        </FormRow>
      </FormModal>
    </div>
  );
}

export default AdminUsers;
