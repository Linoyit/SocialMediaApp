
const Filter = () => {
  return (
    <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
        <p className="small-medium md:base-medium text-light-2">All</p>
        <img 
        src="/assets/icons/filter.svg"
        width={20}
        height={20}
        alt="filter"
        />
    </div>
  )
}

export default Filter