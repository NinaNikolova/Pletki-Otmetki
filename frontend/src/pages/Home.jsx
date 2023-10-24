import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Knitting } from '../../../backend/models/knittingModel';

const Home = () => {
    const [knittings, setKnittings] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/knittings')
            .then((response) => {
                setKnittings(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);
    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <h1 className='text-3xl my-8'>Налични плетива:</h1>
                <Link to="/knittings/create">
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Име</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Цвят
                            </th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Размер
                            </th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Пол
                            </th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Снимка
                            </th>
                            <th className='border border-slate-600 rounded-md'>Операции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {knittings.map((knitting, index) => (
                            <tr key={knitting._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {knitting.title}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {knitting.color}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {knitting.size}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {knitting.gender}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    <div className="w-64 h-64 bg-cover bg-center">
                                        <img src={knitting.img} alt={knitting.title} />
                                    </div>
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/knittings/details/${knitting._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/knittings/edit/${knitting._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/knittings/delete/${knitting._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default Home;