export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl card-shadow p-6 transition-all hover:shadow-xl ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
