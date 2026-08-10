interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
}: SummaryCardProps) => {
  return (
    <div className="summary-card">
      <div className="summary-icon">{icon}</div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default SummaryCard;