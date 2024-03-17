import { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'


function App() {
  const [myData, setMyData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const controller = new AbortController()
      ; (async () => {
        try {
          setLoading(true)
          setError(false)
          const res = await axios.get('https://fakestoreapi.com/products', { signal: controller.signal });
          console.log(res.data);
          setMyData(res.data);
          setLoading(false)

        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request Canceled', error.message)
            return
          }
          console.log(error);
          setError(true)
          setLoading(false)
        }

      })();

    // cleanup code 
    return () => {
      controller.abort()
    }
  }, [search])


  if (error) {
    return <h1 className='text-orange-400'>Something went wrong</h1>
  }

  if (loading) {
    return <div className='h-[500px] w-full flex justify-center items-center '>
      <h1 className='text-orange-400'>Loading...</h1>
    </div>
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearch('');
  };

  return (
    <>
      {/* for background images  */}
      <div>
        <div>
          <img className='invisible sm:w-full sm:h-auto sm:visible ' src="./images/Placeholder_01.jpg" alt="" />
        </div>
        <div>
          <img className='w-[80%] h-auto absolute top-[78px] invisible sm:visible md:invisible' src="./images/Image.png" alt="" />
        </div>
      </div>

      <div className=' absolute top-[190px] left-[25%] invisible sm:visible md:invisible lg:visible'>
        <h1 className='w-[381px]  text-white'>GET START YOUR FAVORITE SHOPPING</h1>
        <button className='text-sm font-semibold text-white bg-black pl-4 pr-4 rounded mt-5 '>BUY NOW</button>
      </div>

      {/* for Select Category part  */}
      <div>
        <div className='flex gap-4 absolute top-[12%] left-[15%] md:ml-[190px] lg:ml-0'>
          <div>
            <select
              className='text-sm font-semibold text-white bg-black p-2 rounded mt-5'
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">Category</option>
              <option value="">All</option>
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Women</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewellery</option>
            </select>
          </div>

          {/* searchproduct starts from here  */}
          <div>
            <input className='p-2 border-2 border-orange-300 w-[370px] mt-4'
              type="search"
              placeholder='Search Product Here'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }} />
          </div>
          {/* searchproduct end here  */}
          <div>
            <select className='text-sm font-semibold text-black bg-white p-2 rounded mt-5 md:bg-black md:text-white'>
              <option value="languages">English</option>
              <option value="languages">Hindi</option>
            </select>
          </div>
          <div><h1 className='text-sm font-bold mt-5 p-2 sm:text-white  md:bg-black md:text-white md:rounded'>Cart</h1></div>
        </div>

        <div className='ml-[62px] sm:ml-0'>
          <h1 className='font-bold text-3xl m-4 ml-[190px] sm:ml-0'> Man & Women Fashion</h1>

          {/* for cardproduct data */}


          <div className='flex content-center item-center flex-wrap ml-20'>
            {myData
              .filter((product) => {
                if (!selectedCategory) return true;
                return product.category === selectedCategory;
              })
              .filter((products) => {
                if (search=="") {
                  return products;
                } 
                else if (products.title.toLowerCase().includes(search.toLowerCase())) {
                  return products;
                }

              })
              .map((products) => {
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
      </div>


    </>
  )
}

export default App
