import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditKnitting = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [img, setImg] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/knittings/${id}`)
      .then((response) => {
        setColor(response.data.color);
        setSize(response.data.size);
        setTitle(response.data.title);
        setImg(response.data.img);
        setGender(response.data.gender);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('Възникна грешка! Проверете дали всички полета са попълнени');
        console.log(error);
      });
  }, []);

  const handleEditKnitting = () => {
    const data = {
      title,
      color,
      size,
      gender,
      img
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/knittings/${id}`, data)
      .then(() => {
        setLoading(false);
        // enqueueSnackbar('knitting Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        // enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Редактиране информацията за <span className="font-bold text-gray-500">{title}</span></h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Заглавие</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Цвят</label>
          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Размер</label>
          <input
            type='string'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Пол</label>
          <input
            type='string'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Снимка</label>
            <input
              type='string'
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
            />
          </div>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditKnitting}>
          Коригирай
        </button>
      </div>
    </div>
  );
};
export default EditKnitting;