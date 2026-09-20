import { useEffect, useMemo, useState } from 'react';
import { FaSearch, FaDownload, FaRegCalendar, FaBuilding } from 'react-icons/fa';
import { RiArrowUpDownLine } from 'react-icons/ri';
import DataTable, { dataTableStyles as t } from '../../../shared/ui/DataTable/DataTable';
import BackendMissingValue from '../shared/BackendMissingValue';
import { fetchAdminTransactions } from '../../api';
import { displayBackendValue } from '../../types/backend';
import styles from './AdminTransactions.module.css';

const TABS = ['Today', 'Past', 'Paid'];

function SortHeader({ label }) {
  return (
    <span className={styles.thContent}>
      {label}
      <RiArrowUpDownLine className={styles.sortIcon} />
    </span>
  );
}

const TODAY_COLUMNS = [
  { key: 'company', label: <SortHeader label="COMPANY INFO" /> },
  { key: 'site', label: <SortHeader label="SITE URL" /> },
  { key: 'address', label: <SortHeader label="ADDRESS" /> },
  { key: 'package', label: <SortHeader label="PACKAGE" /> },
  { key: 'price', label: <SortHeader label="PRICE" /> },
  { key: 'due', label: <SortHeader label="DUE DATE" /> },
  { key: 'payment', label: <SortHeader label="PAYMENT STATUS" /> },
  { key: 'account', label: <SortHeader label="ACCOUNT STATUS" /> },
];

const PAST_PAID_COLUMNS = [
  ...TODAY_COLUMNS,
  { key: 'emailHistory', label: 'EMAIL HISTORY' },
];

function AdminTransactions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendBanner, setBackendBanner] = useState('');
  const [actionError, setActionError] = useState('');
  const [activeTab, setActiveTab] = useState('Today');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All Status');
  const [appliedFrom, setAppliedFrom] = useState('');
  const [appliedTo, setAppliedTo] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const result = await fetchAdminTransactions({
        limit: 50,
        from_date: appliedFrom || undefined,
        to_date: appliedTo || undefined,
        with_user: '1',
        with_package: '1',
      });
      if (!active) return;
      setRows(result.items);
      setBackendBanner(result.backendMissing ? result.message : '');
      setLoading(false);
      setCurrentPage(1);
    })();
    return () => {
      active = false;
    };
  }, [appliedFrom, appliedTo]);

  const filtered = useMemo(() => {
    return rows.filter((item) => {
      const matchesTab = item.tab === activeTab;
      const account = displayBackendValue(item.accountStatus);
      const matchesStatus =
        appliedStatus === 'All Status' ||
        account.toLowerCase() === appliedStatus.toLowerCase();
      return matchesTab && matchesStatus;
    });
  }, [rows, activeTab, appliedStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentRows = filtered.slice(indexOfFirst, indexOfLast);
  const isPastOrPaid = activeTab === 'Past' || activeTab === 'Paid';
  const columns = isPastOrPaid ? PAST_PAID_COLUMNS : TODAY_COLUMNS;

  const handleSearch = () => {
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setAppliedStatus(status);
    setCurrentPage(1);
  };

  const handleDownload = () => {
    setActionError(
      'BACKEND ENDPOINT MISSING / NOT AVAILABLE: Download Report (no export endpoint in Postman Admin/Transactions)'
    );
  };

  const handleRowAction = () => {
    setActionError(
      'BACKEND ENDPOINT MISSING / NOT AVAILABLE: Send Recipet / Process Payment (no mutation endpoint in Postman)'
    );
  };

  return (
    <div className={styles.page} data-testid="admin-transactions-page">
      {backendBanner ? (
        <p className={styles.backendBanner} data-testid="transactions-backend-banner">
          {backendBanner}
        </p>
      ) : null}
      {actionError ? (
        <p className={styles.backendBanner} data-testid="transactions-action-error" role="alert">
          {actionError}
        </p>
      ) : null}

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Transactions period">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`.trim()}
              data-testid={`transactions-tab-${tab.toLowerCase()}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.downloadBtn}
          data-testid="transactions-download-btn"
          onClick={handleDownload}
        >
          <FaDownload />
          Download Report
        </button>
      </div>

      <div className={styles.filters} data-testid="transactions-filters">
        <div className={styles.field}>
          <label htmlFor="tx-from-date">From Date</label>
          <div className={styles.dateWrap}>
            <input
              id="tx-from-date"
              type="text"
              className={styles.dateInput}
              placeholder="yyyy-mm-dd"
              value={fromDate}
              data-testid="transactions-from-date"
              onChange={(event) => setFromDate(event.target.value)}
            />
            <FaRegCalendar className={styles.dateIcon} />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="tx-to-date">To Date</label>
          <div className={styles.dateWrap}>
            <input
              id="tx-to-date"
              type="text"
              className={styles.dateInput}
              placeholder="yyyy-mm-dd"
              value={toDate}
              data-testid="transactions-to-date"
              onChange={(event) => setToDate(event.target.value)}
            />
            <FaRegCalendar className={styles.dateIcon} />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="tx-status">Status</label>
          <select
            id="tx-status"
            className={styles.select}
            value={status}
            data-testid="transactions-status"
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          type="button"
          className={styles.searchBtn}
          data-testid="transactions-search-btn"
          onClick={handleSearch}
        >
          <FaSearch />
          Search
        </button>
      </div>

      <DataTable columns={columns} testId="admin-transactions-table">
        {loading ? (
          <tr>
            <td colSpan={isPastOrPaid ? 9 : 8}>
              <span className={styles.backendBanner}>Loading…</span>
            </td>
          </tr>
        ) : currentRows.length === 0 ? (
          <tr>
            <td colSpan={isPastOrPaid ? 9 : 8}>
              <span className={styles.backendBanner}>No results</span>
            </td>
          </tr>
        ) : (
          currentRows.map((row) => (
            <tr key={row.id}>
              <td>
                <div className={styles.companyInfo}>
                  <span className={styles.companyIcon}>
                    <FaBuilding />
                  </span>
                  <div className={styles.companyText}>
                    <div className={styles.companyName}>
                      <BackendMissingValue field={row.company} />
                    </div>
                    <div className={styles.companyEmail}>
                      <BackendMissingValue field={row.email} />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <BackendMissingValue field={row.siteUrl} />
              </td>
              <td>
                <div className={styles.address}>
                  <BackendMissingValue field={row.address} />
                </div>
              </td>
              <td>
                <span className={t.planBadge}>
                  <BackendMissingValue field={row.package} />
                </span>
              </td>
              <td>
                <BackendMissingValue field={row.price} />
              </td>
              <td>
                <BackendMissingValue field={row.dueDate} />
              </td>
              <td>
                <button
                  type="button"
                  className={styles.sendBtn}
                  data-testid={`transactions-action-${row.id}`}
                  onClick={handleRowAction}
                >
                  {isPastOrPaid ? 'Process Payment' : 'Send Recipet'}
                </button>
              </td>
              <td>
                <BackendMissingValue field={row.accountStatus} />
              </td>
              {isPastOrPaid ? (
                <td>
                  <div className={styles.emailHistory}>
                    <BackendMissingValue field={row.emailHistory} multiline />
                  </div>
                </td>
              ) : null}
            </tr>
          ))
        )}
      </DataTable>

      <div className={styles.pagination}>
        <span className={styles.paginationInfo}>
          Showing {filtered.length === 0 ? 0 : indexOfFirst + 1} to{' '}
          {Math.min(indexOfLast, filtered.length)} of {filtered.length} results
        </span>
        <div className={styles.paginationBtns}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage === 1}
            data-testid="transactions-page-prev"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`.trim()}
              data-testid={`transactions-page-${page}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            data-testid="transactions-page-next"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminTransactions;
