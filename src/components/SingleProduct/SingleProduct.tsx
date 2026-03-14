import {
  Alert,
  Box,
  Button,
  Rating,
  Snackbar,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCommentsFromAPI } from "../../api/getCommentsFromAPI";
import { getProductsFromAPI } from "../../api/getProductsFromAPI";
import { PromiseComments } from "../../react-app-env";
import { addBasketItem } from "../../redux/slices/basketSlice";
import { RootState } from "../../redux/store/store";
import { Comment } from "../../types/comments";
import { Product } from "../../types/products";
import { langSetter } from "../../utils/langSetter";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./SingleProduct.scss";

export const SingleProduct: React.FC = () => {
  const { params } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();

  const getCommets = useCallback(async () => {
    try {
      const res: PromiseComments = await getCommentsFromAPI(`/post/${params}`);
      setComments(res.comments);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [params]);

  const getProduct = useCallback(async () => {
    try {
      const res: Product = await getProductsFromAPI(`/${params}`);
      setProduct(res);
      setSelectedImage(res.thumbnail);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [params]);

  useEffect(() => {
    getProduct();
    getCommets();
  }, [getProduct, getCommets]);

  const allImages = product
    ? [product.thumbnail, ...product.images.filter((img) => img !== product.thumbnail)]
    : [];

  const discountedPrice = product && product.discountPercentage > 0
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <>
      <Header />

      {product && (
        <div className="single-product">
          <div className="container">
            <Link to="/" className="single-product__back-link">
              <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
              {langSetter("backto")}
            </Link>

            <div className="single-product__layout">
              <div className="single-product__gallery">
                <div className="single-product__main-image">
                  <img
                    src={selectedImage}
                    alt={product.title}
                  />
                </div>

                {allImages.length > 1 && (
                  <div className="single-product__thumbnails">
                    {allImages.map((img, idx) => (
                      <div
                        key={idx}
                        className={`single-product__thumb${
                          selectedImage === img ? " single-product__thumb--active" : ""
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} alt={`${product.title} ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="single-product__info">
                {product.brand && (
                  <div className="single-product__brand">{product.brand}</div>
                )}

                <h1 className="single-product__title">{product.title}</h1>

                <div className="single-product__rating-row">
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.25}
                    size="small"
                    readOnly
                    sx={{ fontSize: "1rem", opacity: 0.8 }}
                  />
                  {comments && comments.length > 0 && (
                    <span className="single-product__comments-count">
                      {comments.length} {langSetter("comments")}
                    </span>
                  )}
                </div>

                <div className="single-product__price-section">
                  <div className="single-product__price">
                    {discountedPrice ? (
                      <>
                        <span className="single-product__price-current">
                          ${discountedPrice}
                        </span>
                        <span className="single-product__price-original">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="single-product__price-current">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  {discountedPrice && (
                    <div className="single-product__discount-badge">
                      {langSetter("discount")} {product.discountPercentage}%
                    </div>
                  )}
                  {product.stock < 50 && (
                    <div className="single-product__stock-warning">
                      {langSetter("lessproducts")}
                    </div>
                  )}
                </div>

                <hr className="single-product__divider" />

                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={() => setOpen(false)}
                >
                  <Alert variant="filled" severity="success">
                    {`${product.title} ${langSetter("addedinfo")}`}
                  </Alert>
                </Snackbar>

                <Button
                  className="single-product__add-btn"
                  variant="contained"
                  disableElevation
                  fullWidth
                  onClick={() => {
                    dispatch(addBasketItem(product));
                    setOpen(true);
                  }}
                >
                  {langSetter("addtocart")}
                </Button>

                <hr className="single-product__divider" />

                <p className="single-product__description">
                  {product.description}
                </p>

                <hr className="single-product__divider" />

                <div>
                  {product.brand && (
                    <div className="single-product__detail-row">
                      <span className="single-product__detail-label">{langSetter("brand")}:</span>
                      <span className="single-product__detail-value">{product.brand}</span>
                    </div>
                  )}
                  <div className="single-product__detail-row">
                    <span className="single-product__detail-label">{langSetter("category")}:</span>
                    <span className="single-product__detail-value">{product.category}</span>
                  </div>
                  <div className="single-product__detail-row">
                    <span className="single-product__detail-label">{langSetter("stock")}:</span>
                    <span className="single-product__detail-value">{product.stock}</span>
                  </div>
                </div>
              </div>
            </div>

            {comments && comments.length > 0 && (
              <div className="single-product__reviews" id="comments">
                <div className="single-product__reviews-title">
                  {langSetter("singlepostcomments")}
                </div>

                {comments.map((comment) => (
                  <div key={comment.id} className="single-product__review">
                    <div className="single-product__review-header">
                      <div className="single-product__review-avatar">
                        {comment.user.username.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="single-product__review-username">
                        {comment.user.username}
                      </span>
                    </div>
                    <div className="single-product__review-body">
                      {comment.body}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <Typography sx={{ display: "none" }}>{lang}</Typography>
    </>
  );
};
