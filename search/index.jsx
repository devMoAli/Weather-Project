export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <input
        type="text"
        className="city-search"
        name="search"
        placeholder="Enter City Name..."
        // value search will be a prop received from parent component
        value={search}
        // onChange setSearch value will be a prop received from Parent component too
        onChange={(event) => setSearch(event.target.value)}
      />
      {/* receiving handleSearch as a another props in button */}
      <button className="searchBtn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
