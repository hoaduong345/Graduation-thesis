import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import useCartContext, { CartContext } from "../hooks/Cart/CartContextProvider";
import ThemeContextProvider from "../hooks/Context/ThemeContextProvider";

interface Props {
  children?: React.ReactNode;
}
function MainLayout({ children }: Props) {
  const cartCtx = useCartContext();
  return (
    <ThemeContextProvider>
      <CartContext.Provider value={cartCtx}>
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      </CartContext.Provider>
    </ThemeContextProvider>
  );
}

export default MainLayout;
