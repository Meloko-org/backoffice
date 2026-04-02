export function CustomTooltip({ payload, label, active }: any) {

  console.log("tooltip payload :", payload)
  console.log("tooltip label :", label)
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
      >
        <p className="label" style={{ margin: '0', fontWeight: '700' }}>{`${label} : ${payload[0].value}`}</p>
        
      </div>
    );
  }

  return null;
}