import {
  Alert,
  Avatar,
  Button,
  ImageList,
  ImageListItem,
  Link,
  Paper,
  Rating,
  Snackbar,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommentsFromAPI } from '../../api/getCommentsFromAPI';
import { getProductsFromAPI } from '../../api/getProductsFromAPI';
import { PromiseComments } from '../../react-app-env';
import { addBasketItem } from '../../redux/slices/basketSlice';
import { RootState } from '../../redux/store/store';
import { Comment } from '../../types/comments';
import { Product } from '../../types/products';
import { langSetter } from '../../utils/langSetter';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

export const SingleProduct: React.FC = () => {
  const { params } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const { lang } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();

  const getCommets = async () => {
    try {
      const res: PromiseComments = await getCommentsFromAPI(`/post/${params}`);

      setComments(res.comments);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const getProduct = async () => {
    try {
      const res: Product = await getProductsFromAPI(`/${params}`);

      setProduct(res);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  useEffect(() => {
    getProduct();
    getCommets();
  }, []);

  return (
    <>
      <LanguageSelector />

      <Header />

      {product && (
        <Box sx={{ padding: '30px 0' }}>
          <div className="container">
            <Paper elevation={6} sx={{ padding: '30px', display: 'flex', justifyContent: 'space-between' }}>
              <Paper elevation={3} sx={{ width: '49%' }}>
                <ImageList sx={{ height: 400 }} cols={1}>
                  <ImageListItem>
                    <img
                      src={product.thumbnail}
                      srcSet={product.thumbnail}
                      alt="product-pic"
                      loading="lazy"
                      style={{
                        height: '400px',
                        objectFit: "contain",
                      }}
                    />
                  </ImageListItem>

                  {product.images.map((item) => (
                    <ImageListItem key={item}>
                      <img
                        src={item}
                        srcSet={item}
                        alt="product-pic"
                        loading="lazy"
                        style={{
                          height: '400px',
                          objectFit: "contain",
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Paper>
              <Box sx={{ width: '49%' }}>
                <Typography variant="h5" marginBottom="10px">{product.title}</Typography>
                <Box sx={{ marginBottom: "10px", display: "flex", gap: "15px" }}>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.25}
                    size="medium"
                    readOnly
                  />

                  {comments && comments.length > 0 && (
                    <Link href="#comments">
                      <Typography variant="body2">
                        {langSetter("show")}{comments.length}{langSetter("comments")}
                      </Typography>
                    </Link>
                  )}
                </Box>

                <Typography variant="subtitle1">{`${product.price} $`}</Typography>

                {product.stock < 50 && (
                  <Typography color="#ff0000" variant="caption" >
                    {langSetter("lessproducts")}
                  </Typography>
                )}

                <hr />

                <Box>
                  <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                    <Alert variant="filled" severity="success">{`${product?.title} ${langSetter("addedinfo")}`}</Alert>
                  </Snackbar>

                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      dispatch(addBasketItem(product));
                      setOpen(true);
                    }}
                  >
                    {langSetter("addtocart")}
                  </Button>
                </Box>

                <hr />

                <Paper
                  sx={{
                    mb: "20px",
                    padding: "10px",
                    width: "60%",
                    border: '2px solid #ca980a80',
                    boxShadow: "0px 2px 1px -1px #ca980a80, 0px 1px 1px 0px #d6b11ba8, 0px 1px 3px 0px #dc9f14d4",
                    bgcolor: "#ffab0042"
                  }}
                >
                  <Typography variant="subtitle1">
                    {langSetter("discount")}{` ${product.discountPercentage} $`}
                  </Typography>
                </Paper>

                <Box>
                  <Typography variant="subtitle1">{product.description}</Typography>
                </Box>
              </Box>
            </Paper>

            <hr />


            {comments && (
              <Paper elevation={6} sx={{ padding: '30px' }} id="comments">
                <Typography variant="h5" mb="20px">{langSetter("singlepostcomments")}</Typography>

                {comments.map(comment => (
                  <React.Fragment key={comment.id}>
                    <Box sx={{ mb: "15px", display: "flex", alignItems: "end", gap: "15px" }}>
                      <Avatar
                        sx={{
                          bgcolor: `#${randomColor()}`
                        }}
                      >
                        {comment.user.username.slice(0, 2).toUpperCase()}
                      </Avatar>

                      <Typography variant="body2" sx={{ fontWeight: "700", color: "#999" }}>
                        {comment.user.username}
                      </Typography>
                    </Box>

                    <Typography sx={{ ml: "55px", color: "#666" }} variant="body1">
                      {comment.body}
                    </Typography>
                    <hr />

                  </React.Fragment>
                ))}
              </Paper>
            )}

          </div>
        </Box>
      )}

      <Footer />
      <Typography sx={{ display: "none" }}>{lang}</Typography>
    </>
  );
};
