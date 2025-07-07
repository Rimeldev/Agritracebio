import 'swiper/css';

const DataCard = ({ icon, label, value, unit }) =>  {
     return (
  <div className="bg-[#E9F0E1FF] rounded shadow p-4 w-40">
    <img src={icon} alt={label} className="w-10 h-10" />
    <p className="font-bold text-xl">{value}{unit}</p>
    <p className="text-sm text-gray-700">{label}</p>
  </div>
); };
export default DataCard;
