import "./SearchInput.scss";
import { MdSearch } from "react-icons/md";

export const SearchInput = ({ placeholder, value, onChange, handleSearch }) => {
  return (
    <div className="search-input">
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <MdSearch
        className="search-input__icon"
        onClick={() => {
          handleSearch();
        }}
      />
    </div>
  );
};

export default SearchInput;
