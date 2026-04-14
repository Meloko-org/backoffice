type Props = {
  label: string;
  value: string | number | null;
  extraClasses?: string;
};

export function FlatStatCard({ 
  label, 
  value,
  extraClasses,
}: Props) {


  return (
    <div className={`${extraClasses} stat-card-flat`}>
      <div className="stat-card-title">
        {label}
      </div>
      <div className="stat-card-value">
        {value}
      </div>
    </div>
  );
}