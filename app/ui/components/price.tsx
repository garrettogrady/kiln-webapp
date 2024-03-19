import clsx from 'clsx';

const Price = ({
  amount,
  className
}: {
  amount: string;
  className?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'usd',
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount)/100)}`}
    <span className={clsx('ml-1 inline')}>USD</span>
  </p>
);

export default Price;
