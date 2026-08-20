import styles from './DataTable.module.css';

function DataTable({ columns, children, className = '', testId = 'shared-data-table' }) {
  return (
    <div className={`${styles.wrapper} ${className}`.trim()} data-testid={testId}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key || column.label}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export { styles as dataTableStyles };
export default DataTable;
