export function Button({ children, onClick, variant }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === 'outline' ? 'border border-gray-500' : 'bg-blue-600 text-white'
      }`}
    >
      {children}
    </button>
  );
}
