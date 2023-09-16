export const columnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <span >
      <input
      style={{width:"150px"}}
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
