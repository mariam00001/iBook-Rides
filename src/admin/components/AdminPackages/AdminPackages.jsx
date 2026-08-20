import { useMemo, useState } from 'react';
import { FaSearch, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import PlanCard from '../../../shared/ui/PlanCard/PlanCard';
import DataTable, { dataTableStyles as t } from '../../../shared/ui/DataTable/DataTable';
import styles from './AdminPackages.module.css';

const FEATURES = {
  trail: [
    { label: 'Unlimited Booking', included: true },
    { label: 'Online Booking Form Accessible', included: true },
    { label: 'Instant Price Quoting Facility', included: true },
    { label: 'Revenue Report visibility', included: true },
    { label: 'Merchant Account Accessible', included: true },
    { label: 'Invoicing', included: true },
    { label: 'Driver Scheduling', included: true },
    { label: 'Local And Global Affiliates', included: true },
    { label: 'Peak Hour Facility', included: false },
    { label: 'Track Flight Status', included: false },
    { label: 'Avail Promo Code', included: false },
    { label: 'Google Calendar Synchronization', included: false },
  ],
  basic: [
    { label: 'Maximum 10 users', included: true },
    { label: 'Unlimited Booking', included: true },
    { label: 'Online Booking Form Accessible', included: true },
    { label: 'Instant Price Quoting Facility', included: true },
    { label: 'Revenue Report visibility', included: true },
    { label: 'Merchant Account Accessible', included: true },
    { label: 'Invoicing', included: true },
    { label: 'Driver Scheduling', included: true },
    { label: 'Local And Global Affiliates', included: true },
    { label: 'Peak Hour Facility', included: true },
    { label: 'Track Flight Status', included: false },
    { label: 'Avail Promo Code', included: false },
    { label: 'Google Calendar Synchronization', included: false },
  ],
  premium: [
    { label: 'Maximum 25 users', included: true },
    { label: 'Unlimited Booking', included: true },
    { label: 'Online Booking Form Accessible', included: true },
    { label: 'Instant Price Quoting Facility', included: true },
    { label: 'Revenue Report visibility', included: true },
    { label: 'Merchant Account Accessible', included: true },
    { label: 'Invoicing', included: true },
    { label: 'Driver Scheduling', included: true },
    { label: 'Local And Global Affiliates', included: true },
    { label: 'Peak Hour Facility', included: true },
    { label: 'Track Flight Status', included: true },
    { label: 'Avail Promo Code', included: true },
    { label: 'Google Calendar Synchronization', included: false },
  ],
  plus: [
    { label: 'Unlimited users', included: true },
    { label: 'Unlimited Booking', included: true },
    { label: 'Online Booking Form Accessible', included: true },
    { label: 'Instant Price Quoting Facility', included: true },
    { label: 'Revenue Report visibility', included: true },
    { label: 'Merchant Account Accessible', included: true },
    { label: 'Invoicing', included: true },
    { label: 'Driver Scheduling', included: true },
    { label: 'Local And Global Affiliates', included: true },
    { label: 'Peak Hour Facility', included: true },
    { label: 'Track Flight Status', included: true },
    { label: 'Avail Promo Code', included: true },
    { label: 'Google Calendar Synchronization', included: true },
  ],
};

const PLANS = [
  {
    id: 'monthly-trail',
    period: 'Monthly',
    name: 'Trail',
    price: 'Free',
    periodLabel: '',
    tablePrice: '0 $',
    duration: '1 Month',
    users: '5 User',
    popular: false,
    features: FEATURES.trail,
  },
  {
    id: 'monthly-basic',
    period: 'Monthly',
    name: 'Basic',
    price: '$9',
    periodLabel: '/month',
    tablePrice: '9 $',
    duration: '1 Month',
    users: '10 User',
    popular: true,
    features: FEATURES.basic,
  },
  {
    id: 'monthly-premium',
    period: 'Monthly',
    name: 'Premium',
    price: '$29',
    periodLabel: '/month',
    tablePrice: '200 $',
    duration: '1 Month',
    users: '24 User',
    popular: false,
    features: FEATURES.premium,
  },
  {
    id: 'monthly-plus',
    period: 'Monthly',
    name: 'Plus',
    price: '$59',
    periodLabel: '/month',
    tablePrice: '59 $',
    duration: '1 Month',
    users: '50 User',
    popular: false,
    features: FEATURES.plus,
  },
  {
    id: 'yearly-trail',
    period: 'Yearly',
    name: 'Trail',
    price: 'Free',
    periodLabel: '',
    tablePrice: '0 $',
    duration: '1 Year',
    users: '5 User',
    popular: false,
    features: FEATURES.trail,
  },
  {
    id: 'yearly-basic',
    period: 'Yearly',
    name: 'Basic',
    price: '$90',
    periodLabel: '/year',
    tablePrice: '90 $',
    duration: '1 Year',
    users: '10 User',
    popular: true,
    features: FEATURES.basic,
  },
  {
    id: 'yearly-premium',
    period: 'Yearly',
    name: 'Premium',
    price: '$290',
    periodLabel: '/year',
    tablePrice: '200 $',
    duration: '1 Year',
    users: '24 User',
    popular: false,
    features: FEATURES.premium,
  },
  {
    id: 'yearly-plus',
    period: 'Yearly',
    name: 'Plus',
    price: '$590',
    periodLabel: '/year',
    tablePrice: '590 $',
    duration: '1 Year',
    users: '50 User',
    popular: false,
    features: FEATURES.plus,
  },
];

const TABLE_COLUMNS = [
  { key: 'name', label: 'Plan Name' },
  { key: 'price', label: 'Price' },
  { key: 'duration', label: 'Duration' },
  { key: 'users', label: 'Users' },
  { key: 'actions', label: 'Actions' },
];

function AdminPackages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedFilter, setAppliedFilter] = useState('All');
  const [view, setView] = useState('cards');

  const filteredPlans = useMemo(() => {
    const query = appliedSearch.trim().toLowerCase();
    return PLANS.filter((plan) => {
      const matchesSearch =
        !query ||
        plan.name.toLowerCase().includes(query) ||
        plan.price.toLowerCase().includes(query) ||
        plan.period.toLowerCase().includes(query);
      const matchesFilter =
        appliedFilter === 'All' || plan.name.toLowerCase() === appliedFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [appliedSearch, appliedFilter]);

  const monthlyPlans = filteredPlans.filter((plan) => plan.period === 'Monthly');
  const yearlyPlans = filteredPlans.filter((plan) => plan.period === 'Yearly');

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
    setAppliedFilter(filterPlan);
  };

  return (
    <div className={styles.page} data-testid="admin-packages-page">
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
        >
          + Add New Plan
        </button>
      </div>

      {view === 'cards' ? (
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
        </div>
      ) : (
        <div className={styles.tableWrap} data-testid="admin-packages-table-wrap">
          <DataTable columns={TABLE_COLUMNS} testId="admin-packages-table" className={styles.packagesTable}>
            {filteredPlans.map((plan) => (
              <tr key={plan.id}>
                <td>
                  <span className={styles.planName}>{plan.name}</span>
                </td>
                <td>
                  <span className={styles.cellText}>{plan.tablePrice}</span>
                </td>
                <td>
                  <span className={styles.cellText}>{plan.duration}</span>
                </td>
                <td>
                  <span className={styles.cellText}>{plan.users}</span>
                </td>
                <td>
                  <div className={t.actions}>
                    <button
                      type="button"
                      className={t.editBtn}
                      data-testid={`packages-edit-${plan.id}`}
                      aria-label={`Edit ${plan.name}`}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      type="button"
                      className={t.deleteBtn}
                      data-testid={`packages-delete-${plan.id}`}
                      aria-label={`Delete ${plan.name}`}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      )}

      <div className={styles.pagination}>
        <span className={styles.paginationInfo}>
          Showing 1 to {filteredPlans.length} of {filteredPlans.length} entries
        </span>
        <div className={styles.paginationBtns}>
          <button type="button" className={styles.pageBtn} disabled>
            Previous
          </button>
          <button type="button" className={`${styles.pageBtn} ${styles.pageBtnActive}`}>
            1
          </button>
          <button type="button" className={styles.pageBtn} disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPackages;
