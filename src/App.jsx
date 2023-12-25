import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import FavList from './components/FavList'
import ReactLoading from 'react-loading';

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(1);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    responce();
  }, [index]);
  console.log(data);

  const responce = async () => {
    try {
      let controller = new AbortController();
      let signal = controller.signal;
      setIsLoading(true);
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`, { signal} );
      setData(res.data);
    }
    catch(err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
    return () => abortController.abort();
  }

  const nextPoke = () => {
    setIndex(index + 1);
  }

  const previousPoke = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
    else {
      setIndex(1);
    }
  }

  const addToFav = () => {
    setFavList([...favList, data]);
  }
  
  return (
    <div className='h-100 block max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-6 00 dark:hover:bg-gray-700'>
      <div className='font-bold grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        {isLoading ?
          <ReactLoading type={'spin'} color={'blue'} height={20} width={20} />
            :
            <>
              <div>
              <h1>Poke API</h1>
              <h2>{data.name}</h2>
              <img src={data?.sprites?.other.home.front_default} alt="" />
              <br />
              <ul>
                {data?.abilities?.map((item, idx) => (
                  <li className='font-bold' key={idx}>
                      {item?.ability?.name}
                  </li>
                ))}
                <br />
                <button onClick={previousPoke}>Previous</button>
                <button onClick={nextPoke}>Next</button>
                <br />
                <br />
                <button onClick={addToFav}>Add to My Favourite</button>
              </ul>
              </div>
              <div>
                <h3 className='py-5'>My Favourite Poke</h3>
                {favList.length == 0 ? <p className='h-full w-full mx-4 my-80 justity-center items-center'>Not found Favourite Poke....</p>
                  : <FavList favList={favList} />}
              </div>
            </>
        }
        {isLoading ? <p>Loading.........</p> : isLoading}
      </div> 
    </div>
  )
}

export default App
