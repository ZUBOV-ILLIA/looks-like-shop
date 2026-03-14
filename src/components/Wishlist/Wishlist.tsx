import { Drawer, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Close, DeleteOutline, FavoriteBorder } from "@mui/icons-material";
import { removeWishlistItem } from "../../redux/slices/wishlistSlice";
import { addBasketItem } from "../../redux/slices/basketSlice";
import { langSetter } from "../../utils/langSetter";
import { Link } from "react-router-dom";
import "./Wishlist.scss";

interface WishlistProps {
  drawerIsOpen: boolean;
  onClose: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
  drawerIsOpen,
  onClose,
}) => {
  const items = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <Drawer
      open={drawerIsOpen}
      anchor="right"
      onClose={onClose}
      PaperProps={{
        sx: { boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.08)" },
      }}
    >
      <div className="wishlist-drawer">
        <div className="wishlist-drawer__header">
          <h2 className="wishlist-drawer__title">
            {langSetter("wishlist")}
          </h2>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "#86868b" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </div>

        {items.length > 0 ? (
          <div className="wishlist-drawer__items">
            {items.map((product) => (
              <div className="wishlist-drawer__item" key={product.id}>
                <Link
                  to={"/products/" + product.id}
                  onClick={onClose}
                  style={{ flexShrink: 0 }}
                >
                  <img
                    className="wishlist-drawer__item-image"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Link>

                <div className="wishlist-drawer__item-details">
                  <Link
                    to={"/products/" + product.id}
                    onClick={onClose}
                    className="wishlist-drawer__item-title"
                  >
                    {product.title}
                  </Link>
                  <p className="wishlist-drawer__item-price">
                    ${product.price}
                  </p>
                  <button
                    className="wishlist-drawer__add-cart-btn"
                    onClick={() => dispatch(addBasketItem(product))}
                  >
                    {langSetter("addtocart")}
                  </button>
                </div>

                <IconButton
                  className="wishlist-drawer__delete-btn"
                  onClick={() => dispatch(removeWishlistItem(product))}
                  size="small"
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
        ) : (
          <div className="wishlist-drawer__empty">
            <FavoriteBorder
              className="wishlist-drawer__empty-icon"
              sx={{ fontSize: "3rem" }}
            />
            <p className="wishlist-drawer__empty-text">
              {langSetter("wishlistEmpty")}
            </p>
          </div>
        )}
      </div>
    </Drawer>
  );
};
