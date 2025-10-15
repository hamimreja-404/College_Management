const TabButton = ({ title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 text-sm font-medium transition-colors ${
      isActive
        ? "border-b-2 border-teal-600 text-teal-600"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    {title}
  </button>
);

export default TabButton;