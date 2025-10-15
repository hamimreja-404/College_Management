const InputField = ({ label, id, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-600 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-500 focus:border-teal-500"
      {...props}
    />
  </div>
);

export default InputField;