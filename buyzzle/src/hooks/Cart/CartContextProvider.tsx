import { createContext, useContext, useEffect, useState } from "react";
import { ModelCart, cartControllers } from "../../controllers/CartControllers";
import { toastSuccess } from "../../helper/Toast/Success";
import { toastWarn } from "../../helper/Toast/Warning";
import { CartItem, DataCart } from "../../model/CartModel";
import { orderControllers } from "../../controllers/OrderControllers";
import { UpdateQuantityModal } from "../../model/OrderModel";
import { useNavigate } from "react-router-dom";

export default function useCartContext() {
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState<string>("");
  const [productChecked, setProductChecked] = useState<CartItem[]>([]);
  const [carts, setCarts] = useState<DataCart>({} as DataCart);
  let listProductQuantity: UpdateQuantityModal[] = [];
  const navigate = useNavigate();
  const [idAttribute, setIdAttribute] = useState<number>(0);

  const addProduct = (
    productId: number,
    productQuantities: number,
    type: boolean
  ) => {
    const data: ModelCart = {
      atributes: idAttribute,
      productId: productId,
      quantity: productQuantities,
    };
    cartControllers
      .addCart(data)
      .then((res) => {
        getCart();

        if (type) {
          setProductChecked([]);
          const buynowChecked = res.data.item.find(
            (e) => e.atributes_fk.id == data.atributes
          );
          const _buynowChecked: CartItem = {
            id: buynowChecked?.id!,
            productid: buynowChecked?.productid!,
            quantity: buynowChecked?.quantity!,
            cartid: buynowChecked?.cartid!,
            product: buynowChecked?.product!,
            total: buynowChecked?.total!,
            atributes_fk: buynowChecked?.atributes_fk!,
            atributesId: buynowChecked?.atributesId!,
            price: buynowChecked?.price!,
          };
          handleChecked(true, _buynowChecked);
          navigate("/cart");
          return;
        } else {
          if (productChecked.length > 0) {
            const isCheck = productChecked.find(
              (item) => item.atributes_fk.id == idAttribute
            );
            if (isCheck) {
              const indexProduct = productChecked.findIndex(
                (item) => item.atributes_fk.id === data.atributes
              );
              const _productChecked = [...productChecked];
              _productChecked[indexProduct].quantity += productQuantities;
              setProductChecked(_productChecked);
            }
          }
        }

        toastSuccess("Thêm thành công");
      })
      .catch((err) => {
        setWarning(err.response?.data);
        openModal("idWarningQuantity");
      });
  };

  const getCart = async () => {
    setLoading(true);
    await cartControllers
      .getCart()
      .then((res) => {
        console.log(
          "🚀 ~ file: CartContextProvider.tsx:83 ~ .then ~ res:",
          res
        );
        setCarts(res.data);
        res.data.item.map((e) => {
          if (e.quantity > e.product.quantity) {
            listProductQuantity.push({
              attributeId: e.atributes_fk.id!,
              soluong: e.atributes_fk.soluong,
            });
          }
        });
      })
      .then(() => {
        updateQuantityCart();
      })
      .finally(() => setLoading(false));
  };

  const updateQuantityCart = async () => {
    if (listProductQuantity.length > 0) {
      await orderControllers.updateQuantityCart(listProductQuantity);
    }
    return await cartControllers.getCart().then((res) => {
      setCarts(res.data);
      return res.data.item;
    });
  };
  useEffect(() => {
    getCart();
  }, []);

  const handleBuyNow = async () => {
    if (productChecked.length == 0) {
      toastWarn("Chưa chọn sản phẩm");
    } else {
      await getCart();
      await updateQuantityCart().then((res) => {
        const listCheckout = res!.filter((e) =>
          productChecked.some((ele) => ele.atributes_fk.id == e.atributes_fk.id)
        );
        sessionStorage.setItem("cartBuyzzle", JSON.stringify(listCheckout));
        setProductChecked(listCheckout);
      });
      navigate("/checkout");
    }
  };

  const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };
  const idItemCart = "confirmCart";
  const idAllCart = "confirmAllCart";
  const removeItemCart = (id: number) => {
    cartControllers.removeItemCart(id).then(() => {
      getCart();
      closeModal(idItemCart);
      const _productChecked = [...productChecked];
      const Product = _productChecked.filter(
        (item) => item.atributes_fk.id !== id
      );
      setProductChecked(Product);
    });
  };
  const removeAllCart = () => {
    productChecked.length > 0 &&
      productChecked.map((e) => {
        cartControllers.removeItemCart(e.atributesId).then(() => {
          getCart();
          setProductChecked([]);
          closeModal(idAllCart);
        });
      });
  };
  const handleChecked = (checked: boolean, item: CartItem) => {
    console.log(
      "🚀 ~ file: CartContextProvider.tsx:169 ~ handleChecked ~ item:",
      item
    );
    if (checked) {
      if (item.product.quantity > 0) {
        setProductChecked((prev) => [...prev, item]);
      }
    } else {
      let cloneProduct = [...productChecked];
      let products = cloneProduct.filter((e) => {
        return e.atributes_fk.id !== item.atributes_fk.id;
      });
      setProductChecked(products);
    }
  };
  return {
    carts,
    setCarts,
    addProduct,
    loading,
    setLoading,
    getCart,

    productChecked,
    setProductChecked,
    handleBuyNow,
    openModal,
    closeModal,
    removeItemCart,
    removeAllCart,
    idItemCart,
    idAllCart,
    warning,
    handleChecked,
    setIdAttribute,
    idAttribute,
  };
}
type CartContextType = ReturnType<typeof useCartContext>;

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const useCart = () => useContext(CartContext);
