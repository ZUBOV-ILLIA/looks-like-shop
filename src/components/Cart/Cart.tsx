import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Drawer,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Close, DeleteForeverTwoTone } from '@mui/icons-material';
import { addBasketItem, deleteBasketItem, removeBasketItem } from '../../redux/slices/basketSlice';

interface CartProps {
  liftingDrawerIsOpen: (arg: boolean) => void,
  drawerIsOpen: boolean,
}

export const Cart: React.FC<CartProps> = ({ liftingDrawerIsOpen, drawerIsOpen }) => {
  const products = useSelector((state: RootState) => state.basket.basket);
  const dispatch = useDispatch();

  return (
    <>
      <Drawer
        open={drawerIsOpen}
        anchor="right"
        onClose={() => liftingDrawerIsOpen(false)}
      >
        <div
          style={{
            width: '100vw',
          }}
        >
          <div
            className="container"
            style={{
              margin: '70px auto 70px',
            }}>
            <IconButton
              onClick={() => liftingDrawerIsOpen(false)}
              sx={{
                boxShadow: '0 0 5px #808080',
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              <Close color="secondary" />
            </IconButton>

            {!!products.length ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>Price</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Card sx={{ display: 'flex' }}>
                            <CardMedia
                              component="img"
                              height="120px"
                              image={product.thumbnail}
                              alt="product image"
                              sx={{
                                maxWidth: '120px'
                              }}
                            />

                            <CardContent
                              sx={{
                                padding: '10px',
                                "&:last-child": {
                                  padding: '10px',
                                }
                              }}
                            >
                              <Typography gutterBottom variant="subtitle2" component="div">
                                {`${product.title}`}
                              </Typography>
                              <Typography gutterBottom variant="subtitle2" component="div" sx={{ color: '#f27a1a' }}>
                                {`${product.price} $`}
                              </Typography>
                              <Rating
                                name="read-only"
                                value={product.rating}
                                precision={0.25}
                                size="small"
                                readOnly
                              />
                            </CardContent>
                          </Card>
                        </TableCell>

                        <TableCell>
                          <ButtonGroup variant="outlined" aria-label="outlined button group" color="secondary">
                            <Button
                              disabled={product.quantity === 1}
                              onClick={() => {
                                dispatch(removeBasketItem(product));
                              }}
                            >
                              <Typography variant="h6">
                                -
                              </Typography>
                            </Button>
                            <Button
                              sx={{ color: '#000 !important', width: "56px" }}
                              disabled
                            >
                              {product.quantity}
                            </Button>
                            <Button
                              onClick={() => {
                                dispatch(addBasketItem(product));
                              }}
                            >
                              <Typography variant="h6">
                                +
                              </Typography>
                            </Button>
                          </ButtonGroup>
                        </TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>{`${product.price * product.quantity} $`}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => dispatch(deleteBasketItem(product))}
                            sx={{
                              boxShadow: '0 0 5px #808080',
                            }}
                          >
                            <DeleteForeverTwoTone color="secondary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableHead>
                    <TableRow>
                      <TableCell>Full Price</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Typography sx={{ color: '#f27a1a' }} variant="h6">
                          {`${products.reduce((prev, el) => prev + (el.price * el.quantity), 0)} $`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                <div
                  style={{
                    margin: '10px',
                    display: 'flex',
                    flexDirection: 'row-reverse'
                  }}
                >
                  <Button color="secondary" variant="outlined">
                    Confirm Cart
                  </Button>
                </div>
              </TableContainer>
            ) : (
              <Typography variant="h3" sx={{ textAlign: 'center' }}>It's empty here</Typography>
            )}

          </div>
        </div>
      </Drawer>
    </>
  );
};
