import React, {useState} from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
function LikePoke() {
    const [likePoke, setLikePoke] = useState(false);

    const handleLike = () => {
        setLikePoke(!likePoke);
    }
    return (
    <div>
        <button onClick={handleLike}>
            {likePoke ? <FaHeart style={{color: 'red'}}/> : <FaRegHeart />}        
        </button>
    </div>
  )
}

export default LikePoke