import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import useCartContext, { CartContext } from "../hooks/Cart/CartContextProvider";
import ThemeContextProvider from "../hooks/Context/ThemeContextProvider";
import useSearchContext, {
  SearchContext,
} from "../hooks/Search/SearchContextProvider";

interface Props {
  children?: React.ReactNode;
}
function MainLayout({ children }: Props) {
  const cartCtx = useCartContext();
  const searchCtx = useSearchContext();
  return (
    <CartContext.Provider value={cartCtx}>
      <div>
        <SearchContext.Provider value={searchCtx}>
          <Header />
          {children}
          <Footer />
        </SearchContext.Provider>
      </div>
    </CartContext.Provider>
  );
}

export default MainLayout;
