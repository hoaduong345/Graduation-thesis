import {
  ChangeEvent,
  KeyboardEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../../pages/home/User/FilterPage/FiltersPage";
import { productController } from "../../Controllers/ProductsController";
import useDebounce from "../../useDebounceHook/useDebounce";

export default function useSearchContext() {
  const [data, setData] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  //   const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const navigate = useNavigate();

  const [productSearch, setProductSearch] = useState<Products[]>([]);
  const debouncedInputValue = useDebounce(data, 500);
  console.log(
    "🚀 ~ file: SearchContextProvider.tsx:28 ~ useSearchContext ~ debouncedInputValue:",
    debouncedInputValue
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
    setShowSuggestions(true);
  };
  // Function to hide suggestions
  const hideSuggestions = () => {
    setShowSuggestions(false);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      navigate(`/FiltersPage/${data}`);
      setShowSuggestions(false);
    }
  };
  const getSearhvalue = async (value: string) => {
    await productController.getAllProductsSearch(value).then((res: any) => {
      setProductSearch(res.rows);
    });
  };

  useEffect(() => {
    getSearhvalue(debouncedInputValue);
    if (data != "") {
      productController
        .getAllProductsSearch(data?.toString())
        .then((res: any) => {
          setProductSearch(res.rows);
        });
    }
  }, [debouncedInputValue]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return {
    data,
    setData,
    onChange,
    handleKeyPress,
    hideSuggestions,
    handleChange,
    productSearch,
    showSuggestions,
    isSearch,
    setIsSearch,
    setShowSuggestions,
    navigate,
    // text,
  };
}

type SearchContextType = ReturnType<typeof useSearchContext>;
export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);
export const useSearch = () => useContext(SearchContext);
