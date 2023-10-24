import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowKnitting = () => {
  const [knitting, setKnitting] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/knittings/${id}`)
      .then((response) => {
        setKnitting(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Разгледайте плетивото</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>No</span>
            <span>{knitting._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Заглавие</span>
            <span>{knitting.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Цвят</span>
            <span>{knitting.color}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Размер</span>
            <span>{knitting.size}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Пол</span>
            <span>{knitting.gender}</span>
          </div>
          <div className='my-4'>

            <img src={knitting.img} alt={knitting.title} />
          </div>
          {/* <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Дата</span>
            <span>{new Date(knitting.createdAt).toString()}</span>
          </div> */}

        </div>

      )}

    </div>
  );
};
export default ShowKnitting;