type Props = {
  title: string;
  value: string | number;
}

export default function KPI({ title, value }: Props) {

  return (
    <div className="stat-card">
      <div className="stat-card-title">
        {title}
      </div>
      <div className="stat-card-value">
        {value}
      </div>
    </div>
  )
}