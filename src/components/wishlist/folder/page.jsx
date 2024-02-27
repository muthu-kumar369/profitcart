import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";


function WishlistFolder({ data, api }) {
    const [formValue, setFormValue] = useState("");
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [id,setId]=useState("");
    const [totalCount,setTotalCount]=useState(data.length);

    const handleOnChange = (e) => {
        setError("");
        setFormValue(e?.target?.value)
    }
    const handleCreate = () => {
        setFormValue("");
        setError("");
        setType("create");
        setShow(true);
    }
    const handleEdit = (item, e) => {
        e.preventDefault();
        setFormValue(item?.name);
        setId(item?._id)
        setError("");
        setType("edit");
        setShow(true);
    };

    const handleDelete = (id, e) => {
        e.preventDefault();
        api.deleteWishlistfolder({id});
    }
    const handleCancel = () => {
        setShow(false);
        setError("");
    };

    const handleSubmit = () => {
        if (formValue == "" || formValue.trim()=="") {
            setError("Please give folder name!")
        } else {
            let data = {
                name: formValue
            };
            switch (type) {
                case "create":

                    data.name = formValue.trim();
                    api.createWhishlistFolder(data);
                    setShow(false);
                    break;

                case "edit":

                    data.name=formValue;
                    data.id=id;
                    api.updateWishlistFolder(data);
                    setShow(false);
                    break;
            }

        }

        console.log(formValue);
    }
    
    const handleCount=()=>{
        setTotalCount(data.length)
    }
    useEffect(()=>{
        handleCount()
    },[data])
    return (
        <>
            <section className="wishlist-folder mx-10 lg:mx-28 mt-6 rounded-sm min-h-96">
                <div >
                    <div className="header flex justify-between items-center py-5 px-9">
                        <p className="title capitalize font-bold text-xl  font-sans">wishlist folder</p>
                        <button className="add-folder text-2xl md:text-4xl font-bold" onClick={() => handleCreate()} >+</button>
                    </div>
                    {data.length!=0 ? (
                        <div>
                        {data && data?.map((item, index) => {
                            return (
                                <>
                                    <Link href={`/user/wishlist/${item?._id}`} className=''>
                                        <div className="folder mx-4 md:mx-20 py-6 my-4  justify-between grid grid-cols-12">
                                            <p className="folder-name text-2xl text-center lg:text-3xl font-semibold lg:ml-28 col-span-12 lg:col-span-8">{item?.name}</p>
                                            <p className="product-count mt-5 md:mt-8 lg:mt-0 text-end col-span-6  lg:col-span-2 font-semibold lg:mr-8">{item?.products.length} Products</p>
                                            <div className=' lg:col-span-2 col-span-6 mt-5 md:mt-8 lg:mt-0 text-end'>
                                                <button className='text-xl md:text-2xl ml-3 text-blue-600' onClick={(e) => handleEdit(item, e)}><FaEdit /></button>
                                                <button className={`text-xl md:text-2xl mx-5 text-red-600 ${totalCount==1 ? "opacity-70":""}`} onClick={(e) => handleDelete(item?._id, e)} disabled={totalCount==1 ? true :false}><MdDelete /></button>
                                            </div>
                                        </div>

                                    </Link>
                                </>
                            )
                        })}
                    </div>
                    ):<div className='no-details flex items-center justify-center min-h-96'>
                    <p className='font-semibold capitalize text-xl py-5'>Product didn't addedd in wishlist</p>
                </div>}
                    
                </div>

            </section>
            {show && <div className="folder-form">

                <div className="form-details p-10">

                    <p className="title capitalize text-xl font-semibold font-sans">folder name:</p>
                    <input type="text" className="input border-2 p-1 px-2 border-lime-900 mt-3 rounded-sm" value={formValue} onChange={(e) => handleOnChange(e)} />
                    {error == "" ? null : <p className=' text-red-600 text-sm mt-2 font-medium capitalize'>{error}</p>}
                    <div className="btn-group mt-5 justify-between flex">
                        <button className="cancel capitalize text-md p-1 px-3  font-semibold bg-red-600 text-white" onClick={() => handleCancel()}>Cancel</button>
                        <button className="submit capitalize text-md p-1 px-3  font-semibold  text-white " onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default WishlistFolder;