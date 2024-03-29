import React, {  useState } from 'react';

function WishlistForm({ data, state,api }) {

    const [indexValue, setIndexValue] = useState();
    const [id, setId] = useState();
    const [error,setError]=useState();

    const handleClick = (folderId, index) => {
        setIndexValue(index);
        setId(folderId)
        state.setFolderId(folderId);
        setError(null)
    }
    const handleCancel = () => {
        state.setWishlistForm(false);
        setError(null)
    }
    const handleAdd = () => {
        if (id) {
            state.setFolderId(id);
            state.setWishlistForm(false);
            api.addToWishlist();
        }else{
            setError("Please select folder name!")
        }
    }
    return (
        <section className='wishlist-form'>
            <div className='select py-8 w-full '>
                <div className="header">
                    <p className="title capitalize font-bold text-center pb-3 text-2xl">select folder</p>
                </div>
                <div className="body-content px-10 py-5">
                    {data && data.map((item, index) => {
                        return (
                            <>
                                <div className={`content flex items-center cursor-pointer my-4 px-4 py-2 ${indexValue == index ? "active" : ""}`} key={index} onClick={() => handleClick(item?._id, index)}>
                                    <p className="dot"></p>
                                    <p className='name text-lg px-6'>{item?.name}</p>
                                </div>
                            </>
                        )
                    })}
                </div>
                {error && <p className="error pb-6 text-center">{error}</p>}
                <div className="btn-grp px-10 flex justify-between">
                    <button className='cancel bg-red-600 text-white p-1 px-4 rounded-sm' onClick={(e) => handleCancel()}>Cancel</button>
                    <button className="add text-white p-1 px-4 rounded-sm" onClick={() => { handleAdd() }}>Add</button>
                </div>
            </div>
        </section>
    )
}

export default WishlistForm;