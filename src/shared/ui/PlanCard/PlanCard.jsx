import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from './PlanCard.module.css';

function PlanCard({
  name,
  price,
  periodLabel,
  features = [],
  popular = false,
  ctaLabel = 'Get Started',
  onCta,
  testId = 'plan-card',
}) {
  return (
    <article
      className={`${styles.card} ${popular ? styles.popular : ''}`.trim()}
      data-testid={testId}
    >
      {popular ? <span className={styles.badge}>Most Popular</span> : null}
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.priceRow}>
        <span className={styles.priceAmount}>{price}</span>
        {periodLabel ? <span className={styles.pricePeriod}>{periodLabel}</span> : null}
      </div>
      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature.label} className={styles.feature}>
            {feature.included ? (
              <FaCheck className={styles.iconOk} size={12} aria-hidden="true" />
            ) : (
              <FaTimes className={styles.iconNo} size={12} aria-hidden="true" />
            )}
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={popular ? styles.ctaPopular : styles.cta}
        data-testid={`${testId}-cta`}
        onClick={onCta}
      >
        {ctaLabel}
      </button>
    </article>
  );
}

export { styles as planCardStyles };
export default PlanCard;
