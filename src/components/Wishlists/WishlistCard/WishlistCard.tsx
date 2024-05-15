// import { Link, useNavigate, useParams } from "react-router-dom"
// import { useAppDispatch, useAppSelector } from "../../../app/hooks"
// import { useEffect } from "react"
// import { getProduct, selectProduct } from "../productsSlice"
// import NoPageFound from "../../../components/NoPageFound"
// import style from "./WishCard.module.css"

// export default function ProductCard() {
//   const { productId } = useParams()
//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()
//   const product = useAppSelector(selectProduct)
//   useEffect(() => {
//     dispatch(getProduct(Number(productId)))
//   }, [dispatch])
//   if (product) {
//     return (
//       <div className={style.box}>
//         <h2>{product?.title}</h2>
//         <img src={product.images[0]} alt={product?.title} />
//         <p>{product?.description}</p>
//         <Link to="/products">To products</Link>
//         <button onClick={() => navigate(-1)}>To previous page</button>
//       </div>
//     )
//   } else {
//     return <NoPageFound />
//   }
// }
export{}