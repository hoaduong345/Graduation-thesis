import {
  ChangeEvent,
  KeyboardEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Products } from "../../pages/home/User/FilterPage/FiltersPage";
import {
  ModelProducts,
  productController,
} from "../../Controllers/ProductsController";
import useDebounce from "../../useDebounceHook/useDebounce";
import { roundedNumber } from "../../Helper/Format";
import { Rate, Row } from "../../Model/ProductModel";
import { Cate } from "../../components/home/components/Category";
import axios from "axios";

export default function useSearchContext() {
  //////////////////////////////////////////////////////////headerPage////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //////////////////////////////////////////////////////////filtersPage////////////////////////////////////////////////////////////////////////

  const [products, setProducts] = useState<Row[]>([]);
  const [stars, setStars] = useState<Rate>();
  const [starsnumber, setStarsnumber] = useState(0);
  // Button FIlterPage
  const [activeBtnLowToHigh, setActiveBtnLowToHigh] = useState(true);
  const [activeBtnHighToLow, setActiveBtnHighToLow] = useState(true);
  const [activeBtnLatestCreationDate, setActiveBtnLatestCreationDate] =
    useState(true);
  // Slider Price SiteBarFilterPages
  const [sliderValues, setSliderValues] = useState<[number, number]>([
    0, 10000000000,
  ]);
  const debouncedInputValueSlider = useDebounce(sliderValues, 700); // Debounce for 300 milliseconds

  //////////////////////////////////////////////////////////IndexPages////////////////////////////////////////////////////////////////////////
  const [categoty, setCategory] = useState<Cate[]>([]);

  const [idaCate, setidaCate] = useState(0);
  const getIdCate = () => {
    const id = localStorage.getItem("cateId");
    const idCate = JSON.parse(id!);
    getProductWithinIdCate(idCate);
    setidaCate(idCate);
  };
  useEffect(() => {
    getIdCate();
  }, []);

  const getProductWithinIdCate = async (id: number) => {
    console.log(
      "🚀 ~ file: SearchContextProvider.tsx:265 ~ getProductWithinIdCate ~ id:",
      id
    );
    await productController
      .getProductWithIdCate(id)
      .then((res: any) => {
        setProducts(res.rows);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: SearchContextProvider.tsx:266 ~ productController.getProductWithIdCate ~ err:",
          err
        );
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };
  // using UseSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("keyword");
  const cateId = searchParams.get("cateId");
  const urlSliderValues = searchParams.get("sliderValues");
  const debouncedSearchParams = useDebounce(searchParams, 2000);

  const decodedData = decodeURIComponent(data);
  // Remove diacritics from Vietnamese characters
  function removeDiacritics(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  // Remove special characters and diacritics
  const cleanedData = removeDiacritics(decodedData).replace(/[^\w\s]/gi, "");
  const categoryID = idaCate.toString();
  useEffect(() => {
    // Kiểm tra nếu giá trị slider thay đổi thì mới cập nhật URL
    if (urlSliderValues) {
      const [min, max] = urlSliderValues.split(",").map(Number);
      setSliderValues([min, max]);
    }
  }, [urlSliderValues]);

  useEffect(() => {
    if (debouncedSearchParams) {
      setSearchParams(
        createSearchParams({
          keyword: cleanedData,
          categoryID: categoryID,
          min: sliderValues[0].toString(),
          max: sliderValues[1].toString(),
        })
      );
    }
  }, [sliderValues, cleanedData, categoryID, debouncedSearchParams]);

  const [productSearch, setProductSearch] = useState<Products[]>([]);
  const debouncedInputValue = useDebounce(data, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
    setShowSuggestions(true);
  };
  // Function to hide suggestions
  const hideSuggestions = () => {
    setShowSuggestions(false);
  };
  // Function to clear cleanedString and navigate
  const clearAndNavigate = () => {
    navigate(`/FiltersPage?keyword=${cleanedData}`);
    setShowSuggestions(false);
  };

  // Event handler for Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchParams(
        createSearchParams({
          keyword: cleanedData,
          categoryID: categoryID,
          min: sliderValues[0].toString(),
          max: sliderValues[1].toString(),
        })
      );
      clearAndNavigate();
    }
  };
  const getSearhvalue = async (value: string) => {
    await productController.getAllProductsSearch(value).then((res: any) => {
      setProductSearch(res.rows);
    });
  };

  useEffect(() => {
    getSearhvalue(debouncedInputValue);
    if (searchValue != "") {
      productController
        .getAllProductsSearch(searchValue?.toString())
        .then((res: any) => {
          setProductSearch(res.rows);
        });
    }
  }, [debouncedInputValue]);

  //////////////////////////////////////////////////////////filtersPage////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (stars) {
      setStarsnumber(roundedNumber(stars.averageRating));
      console.log(
        "🚀 ~ file: FiltersPage.tsx:99 ~ useEffect ~ stars.averageRating:",
        stars.averageRating
      );
    }
  }, [stars]);

  const handleActiveBTNLowToHighClick = async () => {
    await productController
      .getSortProductbyPrice("asc", idaCate)
      .then((res: any) => {
        console.log(
          "🚀 ~ file: FiltersPage.tsx:57 ~ productController.getSortProductbyPrice ~ res:",
          res
        );
        setActiveBtnLowToHigh(false);
        setActiveBtnHighToLow(true);
        setProducts(res.rows);
      });
  };
  const handleActiveBTNHighToLowClick = async () => {
    await productController
      .getSortProductbyPrice("desc", idaCate)
      .then((res: any) => {
        console.log(
          "🚀 ~ file: FiltersPage.tsx:57 ~ productController.getSortProductbyPrice ~ res:",
          res
        );
        setActiveBtnLowToHigh(true);
        setActiveBtnHighToLow(false);
        setProducts(res.rows);
      });
  };
  const handleActiveBTNLatestCreationDate = async () => {
    setActiveBtnLatestCreationDate(!activeBtnLatestCreationDate);
    await productController
      .getSortProductbyDateCreate("desc", idaCate)
      .then((res: any) => {
        setProducts(res.rows);
      });
  };

  useEffect(() => {
    if (searchValue) {
      getData();
      getSearchDataName();
    }
  }, [searchValue]);

  const getData = async () => {
    await productController
      .getAllProductsSearch(searchValue?.toString())
      .then((res: any) => {
        console.log(res);
        setStars(res.data);

        setProducts(res.rows);
      });
  };
  const getSearchDataName = async () => {
    await productController
      .getSearchAndPaginationProduct(searchValue?.toString())
      .then((res: any) => {
        console.log(res);
        setProducts(res.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Slider Price SiteBarFilterPages
  useEffect(() => {
    if (debouncedInputValueSlider) {
      handleFilter(debouncedInputValueSlider);
    }
  }, [debouncedInputValueSlider]);

  const handleFilter = async (debouncedInputValue: any) => {
    console.log(debouncedInputValue);

    await productController
      .getFilterProductWithinRangeIDCategory(
        searchValue?.toString(),
        debouncedInputValue[0],
        debouncedInputValue[1]
      )
      .then((res: any) => {
        setProducts(res.rows);
      });
  };
  function handleSliderChange(price: [number, number]): void {
    setSliderValues(price);
  }
  const name = localStorage.getItem("cateName");
  const nameCate = JSON.parse(name!);
  //////////////////////////////////////////////////////////IndexPages////////////////////////////////////////////////////////////////////////

  const getCategory = async () => {
    await axios
      .get("http://localhost:5000/buyzzle/product/allcategory")
      .then((response) => response.data)
      .then((data) => {
        console.log("🚀 ~ file: index.tsx:50 ~ .then ~ data:", data.id);
        setCategory(data);
      })
      .catch((err) => console.log(err));
  };

  const getAllProducts = async () => {
    await productController.getAllProducts().then((res: any) => {
      console.log(
        "🚀 ~ file: index.tsx:58 ~ productController.getAllProducts ~ res:",
        res
      );
      setProducts(res.rows);
    });
  };
  useEffect(() => {
    getCategory();
    getAllProducts();
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return {
    /////////////////////header////////////////////
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
    searchValue,
    /////////////////////filters////////////////////
    handleSliderChange,
    handleActiveBTNLatestCreationDate,
    handleActiveBTNHighToLowClick,
    handleActiveBTNLowToHighClick,
    activeBtnLatestCreationDate,
    activeBtnHighToLow,
    activeBtnLowToHigh,
    starsnumber,
    products,
    sliderValues,
    nameCate,
    /////////////////////IndexPages////////////////////
    categoty,
    categoryID,
  };
}

type SearchContextType = ReturnType<typeof useSearchContext>;
export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);
export const useSearch = () => useContext(SearchContext);
