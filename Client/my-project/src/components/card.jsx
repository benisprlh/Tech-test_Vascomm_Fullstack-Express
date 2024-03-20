export const Card = ({title, amount, type}) => {
    return <div className="card w-96 bg-sky-200 text-primary-content">
    <div className="card-body">
      <h2 className="card-title text-slate-500">{title}</h2>
      <div className="flex flex-row gap-3">
      <h2 className="text-sky-700 text-lg text-bold">{amount}</h2>
      <p className="text-sky-700 text-lg">{type}</p>
      </div>
    </div>
  </div>
}