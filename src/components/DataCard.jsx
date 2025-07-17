const DataCard = ({ icon, label, value, unit }) => {
  const displayValue = value ? `${value}${unit}` : "-";

  return (
    <div className="bg-green-50 hover:bg-green-100 transition-colors duration-300 rounded-2xl shadow-md p-5 w-44 min-h-[120px] flex flex-col justify-center items-center space-y-2">
      <img
        src={icon}
        alt={label}
        className="w-10 h-10 object-contain"
        onError={(e) => (e.target.style.display = "none")}
      />
      <p className="font-semibold text-2xl text-green-900">
        {displayValue}
      </p>
      <p className="text-sm text-gray-600 text-center">{label}</p>
    </div>
  );
};

export default DataCard;
