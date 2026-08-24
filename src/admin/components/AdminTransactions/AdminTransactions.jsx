import { useMemo, useState } from 'react';
import { FaSearch, FaDownload, FaRegCalendar, FaBuilding } from 'react-icons/fa';
import { RiArrowUpDownLine } from 'react-icons/ri';
import DataTable, { dataTableStyles as t } from '../../../shared/ui/DataTable/DataTable';
import styles from './AdminTransactions.module.css';

const TABS = ['Today', 'Past', 'Paid'];

const TRANSACTIONS = [
  {
    id: 1,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 2,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 3,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 4,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 5,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 6,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 7,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 8,
    company: 'FLY LIMOUSINE',
    email: 'info@flylimousine.ca',
    siteUrl: 'flylimousine.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '03/11/2026',
    accountStatus: 'Active',
    tab: 'Today',
  },
  {
    id: 9,
    company: 'CITY RIDES',
    email: 'ops@cityrides.com',
    siteUrl: 'cityrides.com',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Basic',
    price: '49.00$',
    dueDate: '12/01/2024',
    accountStatus: 'Active',
    tab: 'Past',
  },
  {
    id: 10,
    company: 'CITY RIDES',
    email: 'ops@cityrides.com',
    siteUrl: 'cityrides.com',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Plus',
    price: '199.00$',
    dueDate: '11/20/2024',
    accountStatus: 'Inactive',
    tab: 'Past',
  },
  {
    id: 11,
    company: 'METRO CARS',
    email: 'hello@metrocars.ca',
    siteUrl: 'metrocars.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Premium',
    price: '100.00$',
    dueDate: '10/05/2024',
    accountStatus: 'Active',
    tab: 'Paid',
  },
  {
    id: 12,
    company: 'METRO CARS',
    email: 'hello@metrocars.ca',
    siteUrl: 'metrocars.ca',
    address: '28 10 Major Mackenzie Dr. vaughan ontario 321',
    package: 'Trail',
    price: '0.00$',
    dueDate: '09/12/2024',
    accountStatus: 'Active',
    tab: 'Paid',
  },
];

function SortHeader({ label }) {
  return (
    <span className={styles.thContent}>
      {label}
      <RiArrowUpDownLine className={styles.sortIcon} />
    </span>
  );
}

const COLUMNS = [
  { key: 'company', label: <SortHeader label="COMPANY INFO" /> },
  { key: 'site', label: <SortHeader label="SITE URL" /> },
  { key: 'address', label: <SortHeader label="ADDRESS" /> },
  { key: 'package', label: <SortHeader label="PACKAGE" /> },
  { key: 'price', label: <SortHeader label="PRICE" /> },
  { key: 'due', label: <SortHeader label="DUE DATE" /> },
  { key: 'payment', label: <SortHeader label="PAYMENT STATUS" /> },
  { key: 'account', label: <SortHeader label="ACCOUNT STATUS" /> },
];

function AdminTransactions() {
  const [activeTab, setActiveTab] = useState('Today');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All Status');
  const [appliedStatus, setAppliedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;

  const filtered = useMemo(() => {
    return TRANSACTIONS.filter((item) => {
      const matchesTab = item.tab === activeTab;
      const matchesStatus =
        appliedStatus === 'All Status' || item.accountStatus === appliedStatus;
      return matchesTab && matchesStatus;
    });
  }, [activeTab, appliedStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentRows = filtered.slice(indexOfFirst, indexOfLast);

  const handleSearch = () => {
    setAppliedStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className={styles.page} data-testid="admin-transactions-page">
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
              placeholder="mm/dd/yyyy"
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
              placeholder="mm/dd/yyyy"
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

      <DataTable columns={COLUMNS} testId="admin-transactions-table">
        {currentRows.map((row) => (
          <tr key={row.id}>
            <td>
              <div className={styles.companyInfo}>
                <span className={styles.companyIcon}>
                  <FaBuilding />
                </span>
                <div className={styles.companyText}>
                  <div className={styles.companyName}>{row.company}</div>
                  <div className={styles.companyEmail}>{row.email}</div>
                </div>
              </div>
            </td>
            <td>
              <a
                href={`https://${row.siteUrl}`}
                className={styles.siteUrl}
                target="_blank"
                rel="noreferrer"
              >
                {row.siteUrl}
              </a>
            </td>
            <td>
              <div className={styles.address}>{row.address}</div>
            </td>
            <td>
              <span className={t.planBadge}>{row.package}</span>
            </td>
            <td>
              <div className={t.date}>{row.price}</div>
            </td>
            <td>
              <div className={t.date}>{row.dueDate}</div>
            </td>
            <td>
              <button
                type="button"
                className={styles.sendBtn}
                data-testid={`transactions-send-${row.id}`}
              >
                Send Recipet
              </button>
            </td>
            <td>
              <span
                className={
                  row.accountStatus === 'Active' ? t.statusBadge : t.planBadge
                }
              >
                {row.accountStatus}
              </span>
            </td>
          </tr>
        ))}
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
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`.trim()}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
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
