import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";
import { selectSearchValue } from "../../redux/filter/selectors";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");
  const searchValue = useSelector(selectSearchValue);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((val: string) => {
        dispatch(setSearchValue(val));
      }, 500),
    [dispatch]
  );
  const onChangeSearchValue = React.useCallback(
    (value: string) => {
      setValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus(); // ? - оператор опциональной последовательности. Если в inputRef есть current то вызови .focus()
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeSearchValue(event.target.value)}
        className={styles.search}
        placeholder="Пошук піци..."
      />
      {searchValue && (
        <svg
          className={styles.clearIcon}
          onClick={onClickClear}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
export default Search;
