import { useEffect, useState } from "react"
import axios from "axios";

function Electronic() {
  const [myData, setMyData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ; (async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await axios.get('https://fakestoreapi.com/products/category/electronics',);
        console.log(res.data);
        setMyData(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setError(true)
        setLoading(false)
      }
    })();
}, [])


if (error) {
  return <h1 className='text-orange-400'>Something went wrong</h1>
}

if (loading) {
  return <div className='h-[500px] w-full flex justify-center items-center '>
    <h1 className='text-orange-400'>Loading...</h1>
  </div>
}

    return (
        <>
        <div>
        <h1 className='font-bold text-3xl m-4'> Electronic Section</h1>
        <div className='flex content-center item-center flex-wrap ml-20'>
              {myData.map((products) => {
                const { id, title, price, description, image, } = products
                return <div className='m-4 border-2 h-[354px]  w-[310px] p-2' key={id}>
                  <img className='h-28 w-32 ml-20' src={image} alt="" />
                  <h2 className='font-bold'>{title.slice(0, 12)}</h2>
                  <h3 className='font-semibold item-center p-2'>Price: ${price}</h3>
                  <p>{description.slice(1, 100)}</p>
                  <button className='bg-orange-400 font-bold text-black mt-4'>Add To Cart</button>
                </div>
              })}
            </div>
          </div>
        </>
      )
    }

export default Electronic