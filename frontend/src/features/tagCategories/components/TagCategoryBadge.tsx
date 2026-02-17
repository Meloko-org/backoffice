import { Tooltip } from "../../../components/global/Tooltip";

type TagCategoryBadgeProps = {
  label: string;
  color?: string;
  description?: string;
};

export function TagCategoryBadge({
  label,
  color,
  description,
}: TagCategoryBadgeProps) {
  const badge = (
    <div
      style={{
        backgroundColor: color || "#eee",
        padding: "4px 8px",
        borderRadius: "6px",
        display: "inline-block",
        fontSize: "0.85rem",
      }}
    >
      {label}
    </div>
  );

  if (!description) return badge;

  return (
    <Tooltip
      content={description}
      position="top"
      background="#000"
      color="#fff"
    >
      {badge}
    </Tooltip>
  );
}

