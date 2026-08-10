interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({
  search,
  onSearchChange,
}: SearchBarProps) => {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search users by name..."
      value={search}
      onChange={(event) =>
        onSearchChange(event.target.value)
      }
    />
  );
};

export default SearchBar;