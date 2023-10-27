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
    <SearchContext.Provider value={searchCtx}>
      <CartContext.Provider value={cartCtx}>
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      </CartContext.Provider>
    </SearchContext.Provider>
  );
}

export default MainLayout;
