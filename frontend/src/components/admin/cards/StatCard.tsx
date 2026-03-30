type Props = {
  label: string;
  value: string | number;
};

export function StatCard({ label, value }: Props) {
  return (
    <div className="stat-card">
      <div className="stat-card-title">
        {label}
      </div>
      <div className="stat-card-value">
        {value}
      </div>
    </div>
  );
}