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

const EMPTY_FORM = {
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
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
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

  const handleAddPlan = () => {
    setActionError('');
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setShowModal(true);
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
    setFormData({
      name: plan.name || '',
      description:
        plan.description?.backendStatus === 'ok' && plan.description.value != null
          ? String(plan.description.value)
          : '',
      price: priceValue,
      duration_days: daysValue,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setActionError('');
    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      duration_days: Number(formData.duration_days),
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
      if (editingId) {
        await updateAdminPackage(editingId, payload);
      } else {
        await storeAdminPackage(payload);
      }
      closeModal();
      await loadPackages();
    } catch (error) {
      setActionError(
        error instanceof AdminApiError
          ? error.message
          : editingId
            ? 'Failed to update package'
            : 'Failed to create package'
      );
    } finally {
      setSubmitting(false);
    }
  };

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

        <button
          type="button"
          className={styles.addBtn}
          data-testid="admin-packages-add-btn"
          onClick={handleAddPlan}
        >
          + Add New Plan
        </button>
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
                  <div className={t.userName}>{plan.name}</div>
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

      <FormModal
        open={showModal}
        title={editingId ? 'Update Plan' : 'Add New Plan'}
        submitLabel={
          submitting ? 'Saving…' : editingId ? 'Update Plan' : '+ Add Plan'
        }
        onClose={closeModal}
        onSubmit={handleSubmit}
        testId={editingId ? 'edit-package-modal' : 'add-package-modal'}
        compact
      >
        <FormRow spaced>
          <FormField label="Name">
            <input
              className={m.input}
              name="name"
              placeholder="Test Package"
              value={formData.name}
              onChange={handleInputChange}
              data-testid="package-name"
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
              value={formData.price}
              onChange={handleInputChange}
              data-testid="package-price"
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
              value={formData.duration_days}
              onChange={handleInputChange}
              data-testid="package-duration-days"
              required
            />
          </FormField>
          <FormField label="Description">
            <input
              className={m.input}
              name="description"
              placeholder="Test description"
              value={formData.description}
              onChange={handleInputChange}
              data-testid="package-description"
              required
            />
          </FormField>
        </FormRow>
      </FormModal>
    </div>
  );
}

export default AdminPackages;
