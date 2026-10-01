import { useEffect, useMemo, useState } from 'react';
import { FaSearch, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import PlanCard from '../../../shared/ui/PlanCard/PlanCard';
import DataTable, { dataTableStyles as t } from '../../../shared/ui/DataTable/DataTable';
import FormModal, {
  FormField,
  FormRow,
  formModalStyles as m,
} from '../../../shared/ui/FormModal/FormModal';
import BackendMissingValue from '../shared/BackendMissingValue';
import {
  AdminApiError,
  deleteAdminPackage,
  fetchAdminPackages,
  storeAdminPackage,
  updateAdminPackage,
} from '../../api';
import styles from './AdminPackages.module.css';

const TABLE_COLUMNS = [
  { key: 'name', label: 'Plan Name' },
  { key: 'price', label: 'Price' },
  { key: 'duration', label: 'Duration' },
  { key: 'users', label: 'Users' },
  { key: 'actions', label: 'Actions' },
];

const ENTRIES_PER_PAGE = 8;

/** Customize toggles — labels match design (including typos). */
const CUSTOMIZE_TOGGLES = [
  { key: 'peakHoursFacility', label: 'Peak Hours Facility', apiKey: 'peak_hour_facility' },
  { key: 'visibleInFrontend', label: 'visible in frontend', apiKey: null },
  { key: 'googleCalendar', label: 'Google Calender', apiKey: 'google_calendar_synchronization' },
  { key: 'promoCodeApplicable', label: 'Promo Code Applicable', apiKey: 'avail_promo_code' },
  { key: 'trackFlightStatus', label: 'Track Flight Status', apiKey: 'track_flight_status' },
  { key: 'specialPackage', label: 'Special Package', apiKey: null },
];

/** Additional Features checkboxes — labels match design. */
const ADDITIONAL_FEATURES = [
  { key: 'unlimitedBookings', label: 'Unlimeted bokungs', apiKey: 'unlimited_booking' },
  { key: 'onlineBookingAccessible', label: 'Online booking Accessible', apiKey: 'online_booking_form_accessible' },
  { key: 'localGlobalAffiliate', label: 'Local & Global Affiliate', apiKey: 'local_and_global_affiliates' },
  { key: 'merchantAccountAccessible', label: 'Merchant Account Accessiable', apiKey: 'merchant_account_accessible' },
  { key: 'driverScheduling', label: 'Driver scheduling', apiKey: 'driver_scheduling' },
  { key: 'invoicing', label: 'Invoicing', apiKey: 'invoicing' },
  { key: 'revenueReport', label: 'Revenue Report', apiKey: 'revenue_report_visibility' },
  { key: 'instantPriceQuoting', label: 'instant price quoting', apiKey: 'instant_price_quoting_facility' },
];

const EMPTY_PACKAGE_SETTINGS = {
  packageName: '',
  userAccess: '',
  monthlyPrice: '',
  yearlyPrice: '',
  peakHoursFacility: false,
  visibleInFrontend: false,
  googleCalendar: false,
  promoCodeApplicable: false,
  trackFlightStatus: false,
  specialPackage: false,
  unlimitedBookings: false,
  onlineBookingAccessible: false,
  localGlobalAffiliate: false,
  merchantAccountAccessible: false,
  driverScheduling: false,
  invoicing: false,
  revenueReport: false,
  instantPriceQuoting: false,
};

const EMPTY_EDIT_FORM = {
  name: '',
  description: '',
  price: '',
  duration_days: '',
};

function AdminPackages() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendBanner, setBackendBanner] = useState('');
  const [actionError, setActionError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('All');
  const [view, setView] = useState('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPackageSettings, setShowPackageSettings] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [packageSettings, setPackageSettings] = useState(EMPTY_PACKAGE_SETTINGS);
  const [editForm, setEditForm] = useState(EMPTY_EDIT_FORM);
  const [submitting, setSubmitting] = useState(false);

  const loadPackages = async () => {
    setLoading(true);
    const result = await fetchAdminPackages({
      search: appliedSearch || undefined,
      limit: 50,
    });
    setPlans(result.items);
    setBackendBanner(result.backendMissing ? result.message : '');
    setLoading(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const result = await fetchAdminPackages({
        search: appliedSearch || undefined,
        limit: 50,
      });
      if (!active) return;
      setPlans(result.items);
      setBackendBanner(result.backendMissing ? result.message : '');
      setLoading(false);
      setCurrentPage(1);
    })();
    return () => {
      active = false;
    };
  }, [appliedSearch]);

  const filteredPlans = useMemo(() => {
    const query = appliedSearch.trim().toLowerCase();
    return plans.filter((plan) => {
      const matchesSearch =
        !query ||
        plan.name.toLowerCase().includes(query) ||
        plan.price.toLowerCase().includes(query) ||
        plan.period.toLowerCase().includes(query);
      const matchesFilter =
        appliedFilter === 'All' || plan.name.toLowerCase() === appliedFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [plans, appliedSearch, appliedFilter]);

  const monthlyPlans = filteredPlans.filter((plan) => plan.period === 'Monthly');
  const yearlyPlans = filteredPlans.filter((plan) => plan.period === 'Yearly');

  const totalPages = Math.max(1, Math.ceil(filteredPlans.length / ENTRIES_PER_PAGE));
  const indexOfLast = currentPage * ENTRIES_PER_PAGE;
  const indexOfFirst = indexOfLast - ENTRIES_PER_PAGE;
  const pageRows = filteredPlans.slice(indexOfFirst, indexOfLast);

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
    setAppliedFilter(filterPlan);
  };

  const closePackageSettings = () => {
    setShowPackageSettings(false);
    setPackageSettings(EMPTY_PACKAGE_SETTINGS);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingId(null);
    setEditForm(EMPTY_EDIT_FORM);
  };

  const handleDelete = async (id) => {
    setActionError('');
    try {
      await deleteAdminPackage(id);
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    } catch (error) {
      setActionError(
        error instanceof AdminApiError ? error.message : 'Failed to delete package'
      );
    }
  };

  /** Cards view only — opens Package Settings design popup. */
  const handleAddPlan = () => {
    setActionError('');
    setPackageSettings(EMPTY_PACKAGE_SETTINGS);
    setShowPackageSettings(true);
  };

  const handleEdit = (plan) => {
    setActionError('');
    setEditingId(plan.id);
    const priceValue =
      plan.apiPrice?.backendStatus === 'ok' && plan.apiPrice.value != null
        ? String(plan.apiPrice.value)
        : '';
    const daysValue =
      plan.durationDays?.backendStatus === 'ok' && plan.durationDays.value != null
        ? String(plan.durationDays.value)
        : '';
    setEditForm({
      name: plan.name || '',
      description:
        plan.description?.backendStatus === 'ok' && plan.description.value != null
          ? String(plan.description.value)
          : '',
      price: priceValue,
      duration_days: daysValue,
    });
    setShowEditModal(true);
  };

  const onPackageField = (event) => {
    const { name, value } = event.target;
    setPackageSettings((prev) => ({ ...prev, [name]: value }));
  };

  const onPackageToggle = (key) => {
    setPackageSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onEditField = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageSettingsSubmit = async () => {
    setActionError('');
    const name = packageSettings.packageName.trim();
    const monthly = Number(packageSettings.monthlyPrice);
    const yearly = Number(packageSettings.yearlyPrice);
    const hasMonthly = packageSettings.monthlyPrice !== '' && !Number.isNaN(monthly);
    const hasYearly = packageSettings.yearlyPrice !== '' && !Number.isNaN(yearly);

    if (!name) {
      setActionError('Package Name is required');
      return;
    }
    if (!hasMonthly && !hasYearly) {
      setActionError('Enter a monthly or yearly price');
      return;
    }

    // Backend create contract only accepts name, description, price, duration_days.
    const payload = {
      name,
      description: `${name} package`,
      price: hasMonthly ? monthly : yearly,
      duration_days: hasMonthly ? 30 : 365,
    };

    const gaps = [];
    if (packageSettings.userAccess) {
      gaps.push('Number Of User Access cannot be saved — backend is missing.');
    }
    if (hasMonthly && hasYearly) {
      gaps.push(
        'Only one price is stored (monthly used). Separate yearly price is missing on create.'
      );
    }
    if (packageSettings.visibleInFrontend || packageSettings.specialPackage) {
      gaps.push('visible in frontend / Special Package flags are missing on backend.');
    }
    const anyFeature =
      CUSTOMIZE_TOGGLES.concat(ADDITIONAL_FEATURES).some(
        (item) => item.apiKey && packageSettings[item.key]
      );
    if (anyFeature) {
      gaps.push('Feature toggles/checkboxes are not accepted on POST /admin/packages.');
    }

    setSubmitting(true);
    try {
      await storeAdminPackage(payload);
      closePackageSettings();
      if (gaps.length) {
        setActionError(gaps.join(' '));
      }
      await loadPackages();
    } catch (error) {
      setActionError(
        error instanceof AdminApiError ? error.message : 'Failed to create package'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async () => {
    setActionError('');
    const payload = {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
      price: Number(editForm.price),
      duration_days: Number(editForm.duration_days),
    };

    if (!payload.name || !payload.description) {
      setActionError('Name and description are required');
      return;
    }
    if (Number.isNaN(payload.price) || Number.isNaN(payload.duration_days)) {
      setActionError('Price and duration_days must be valid numbers');
      return;
    }

    setSubmitting(true);
    try {
      await updateAdminPackage(editingId, payload);
      closeEditModal();
      await loadPackages();
    } catch (error) {
      setActionError(
        error instanceof AdminApiError ? error.message : 'Failed to update package'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const customizeLeft = CUSTOMIZE_TOGGLES.slice(0, 3);
  const customizeRight = CUSTOMIZE_TOGGLES.slice(3);
  const additionalLeft = ADDITIONAL_FEATURES.slice(0, 4);
  const additionalRight = ADDITIONAL_FEATURES.slice(4);

  return (
    <div className={styles.page} data-testid="admin-packages-page">
      {backendBanner ? (
        <p className={styles.backendBanner} data-testid="admin-packages-backend-banner">
          {backendBanner}
        </p>
      ) : null}
      {actionError ? (
        <p className={styles.backendBanner} data-testid="admin-packages-action-error" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className={styles.filters} data-testid="admin-packages-filters">
        <div className={styles.field}>
          <label htmlFor="admin-packages-search">Search</label>
          <div className={styles.searchWrap}>
            <FaSearch className={styles.searchIcon} />
            <input
              id="admin-packages-search"
              type="text"
              className={styles.searchInput}
              placeholder="Search search plan..."
              value={searchTerm}
              data-testid="admin-packages-search"
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSearch();
              }}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="admin-packages-filter">Filter by</label>
          <select
            id="admin-packages-filter"
            className={styles.filterSelect}
            value={filterPlan}
            data-testid="admin-packages-filter"
            onChange={(event) => setFilterPlan(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Trail">Trail</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Plus">Plus</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <button
          type="button"
          className={styles.searchBtn}
          data-testid="admin-packages-search-btn"
          onClick={handleSearch}
        >
          <FaSearch />
          Search
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.viewToggle} role="tablist" aria-label="Packages view">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'cards'}
            className={`${styles.viewBtn} ${view === 'cards' ? styles.viewBtnActive : ''}`.trim()}
            data-testid="packages-view-cards"
            onClick={() => setView('cards')}
          >
            Cards
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'tables'}
            className={`${styles.viewBtn} ${view === 'tables' ? styles.viewBtnActive : ''}`.trim()}
            data-testid="packages-view-tables"
            onClick={() => setView('tables')}
          >
            Tables
          </button>
        </div>

        {view === 'cards' ? (
          <button
            type="button"
            className={styles.addBtn}
            data-testid="admin-packages-add-btn"
            onClick={handleAddPlan}
          >
            + Add New Plan
          </button>
        ) : null}
      </div>

      {loading ? (
        <p className={styles.backendBanner}>Loading…</p>
      ) : view === 'cards' ? (
        <div className={styles.board} data-testid="admin-packages-cards">
          {monthlyPlans.length > 0 ? (
            <section className={styles.section}>
              <div className={styles.periodBadge}>Monthly</div>
              <div className={styles.grid}>
                {monthlyPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    name={plan.name}
                    price={plan.price}
                    periodLabel={plan.periodLabel}
                    features={plan.features}
                    popular={plan.popular}
                    testId={`plan-card-${plan.id}`}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {yearlyPlans.length > 0 ? (
            <section className={styles.section}>
              <div className={styles.periodBadge}>Yearly</div>
              <div className={styles.grid}>
                {yearlyPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    name={plan.name}
                    price={plan.price}
                    periodLabel={plan.periodLabel}
                    features={plan.features}
                    popular={plan.popular}
                    testId={`plan-card-${plan.id}`}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {filteredPlans.length === 0 ? (
            <p className={styles.backendBanner}>No results</p>
          ) : null}
        </div>
      ) : (
        <DataTable
          columns={TABLE_COLUMNS}
          className={styles.packagesTable}
          testId="admin-packages-table"
        >
          {pageRows.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <span className={styles.backendBanner}>No results</span>
              </td>
            </tr>
          ) : (
            pageRows.map((plan) => (
              <tr key={plan.id}>
                <td>
                  <div className={t.userCell}>{plan.name}</div>
                </td>
                <td>
                  <div className={t.email}>{plan.tablePrice}</div>
                </td>
                <td>
                  <div className={t.date}>{plan.duration}</div>
                </td>
                <td>
                  <BackendMissingValue field={plan.users} />
                </td>
                <td className={styles.actionsCell}>
                  <div className={`${t.actions} ${styles.actionsEnd}`.trim()}>
                    <button
                      type="button"
                      className={t.editBtn}
                      data-testid={`packages-edit-${plan.id}`}
                      aria-label={`Edit ${plan.name}`}
                      onClick={() => handleEdit(plan)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      type="button"
                      className={t.deleteBtn}
                      data-testid={`packages-delete-${plan.id}`}
                      aria-label={`Delete ${plan.name}`}
                      onClick={() => handleDelete(plan.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </DataTable>
      )}

      <div className={styles.pagination}>
        <span className={styles.paginationInfo}>
          Showing {filteredPlans.length === 0 ? 0 : indexOfFirst + 1} to{' '}
          {Math.min(indexOfLast, filteredPlans.length)} of {filteredPlans.length} entries
        </span>
        <div className={styles.paginationBtns}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage === 1}
            data-testid="packages-page-prev"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`.trim()}
              data-testid={`packages-page-${page}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            data-testid="packages-page-next"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      </div>

      {/* Cards → Add New Plan → Package Settings (design) */}
      <FormModal
        open={showPackageSettings}
        title="Package Settings"
        submitLabel={submitting ? 'Saving…' : '+ Add New'}
        onClose={closePackageSettings}
        onSubmit={handlePackageSettingsSubmit}
        testId="add-package-modal"
        wide
      >
        <div className={styles.settingsGaps} data-testid="package-settings-backend-gaps">
          Backend missing for this form: Number Of User Access, separate monthly + yearly
          prices, Custmize/Additional feature flags on create, and “visible in frontend” /
          “Special Package”. Create API only accepts name, description, price,
          duration_days. Details: docs/admin-packages-backend-gaps.md
        </div>

        <div className={styles.settingsGrid}>
          <label className={styles.settingsField}>
            <span>Package Name</span>
            <input
              name="packageName"
              className={styles.settingsInput}
              placeholder="Form Distance uni"
              value={packageSettings.packageName}
              onChange={onPackageField}
              data-testid="package-name"
            />
          </label>
          <label className={styles.settingsField}>
            <span>Number Of User Access</span>
            <input
              name="userAccess"
              className={styles.settingsInput}
              placeholder="Diistance Unit"
              value={packageSettings.userAccess}
              onChange={onPackageField}
              data-testid="package-user-access"
            />
          </label>
          <label className={styles.settingsField}>
            <span>Package Monthly Price($)</span>
            <input
              name="monthlyPrice"
              type="number"
              step="0.01"
              min="0"
              className={styles.settingsInput}
              placeholder="Form Distance uni"
              value={packageSettings.monthlyPrice}
              onChange={onPackageField}
              data-testid="package-monthly-price"
            />
          </label>
          <label className={styles.settingsField}>
            <span>Package Yearly Price($)</span>
            <input
              name="yearlyPrice"
              type="number"
              step="0.01"
              min="0"
              className={styles.settingsInput}
              placeholder="Diistance Unit"
              value={packageSettings.yearlyPrice}
              onChange={onPackageField}
              data-testid="package-yearly-price"
            />
          </label>
        </div>

        <div className={styles.settingsColumns}>
          <div className={styles.settingsBlock}>
            <h4 className={styles.settingsBlockTitle}>Custmize</h4>
            <div className={styles.toggleGrid}>
              <div className={styles.toggleCol}>
                {customizeLeft.map((item) => (
                  <div key={item.key} className={styles.toggleRow}>
                    <span>{item.label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={packageSettings[item.key]}
                      className={`${styles.toggle} ${
                        packageSettings[item.key] ? styles.toggleOn : ''
                      }`.trim()}
                      data-testid={`package-toggle-${item.key}`}
                      onClick={() => onPackageToggle(item.key)}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.toggleCol}>
                {customizeRight.map((item) => (
                  <div key={item.key} className={styles.toggleRow}>
                    <span>{item.label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={packageSettings[item.key]}
                      className={`${styles.toggle} ${
                        packageSettings[item.key] ? styles.toggleOn : ''
                      }`.trim()}
                      data-testid={`package-toggle-${item.key}`}
                      onClick={() => onPackageToggle(item.key)}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.settingsBlock}>
            <h4 className={styles.settingsBlockTitle}>Additional Features</h4>
            <div className={styles.checkGrid}>
              <div className={styles.checkCol}>
                {additionalLeft.map((item) => (
                  <label key={item.key} className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={packageSettings[item.key]}
                      onChange={() => onPackageToggle(item.key)}
                      data-testid={`package-check-${item.key}`}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
              <div className={styles.checkCol}>
                {additionalRight.map((item) => (
                  <label key={item.key} className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={packageSettings[item.key]}
                      onChange={() => onPackageToggle(item.key)}
                      data-testid={`package-check-${item.key}`}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FormModal>

      {/* Table edit — existing narrow form */}
      <FormModal
        open={showEditModal}
        title="Update Plan"
        submitLabel={submitting ? 'Saving…' : 'Update Plan'}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        testId="edit-package-modal"
        compact
      >
        <FormRow spaced>
          <FormField label="Name">
            <input
              className={m.input}
              name="name"
              placeholder="Test Package"
              value={editForm.name}
              onChange={onEditField}
              data-testid="edit-package-name"
              required
            />
          </FormField>
          <FormField label="Price">
            <input
              className={m.input}
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="333.33"
              value={editForm.price}
              onChange={onEditField}
              data-testid="edit-package-price"
              required
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Duration Days">
            <input
              className={m.input}
              name="duration_days"
              type="number"
              min="1"
              placeholder="360"
              value={editForm.duration_days}
              onChange={onEditField}
              data-testid="edit-package-duration-days"
              required
            />
          </FormField>
          <FormField label="Description">
            <input
              className={m.input}
              name="description"
              placeholder="Test description"
              value={editForm.description}
              onChange={onEditField}
              data-testid="edit-package-description"
              required
            />
          </FormField>
        </FormRow>
      </FormModal>
    </div>
  );
}

export default AdminPackages;
