import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller ? "true" : "false");
      formData.append("image1", image1);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Clear form on success
        setImage1(null);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Bonsai");
        setSubCategory("Indoor");
        setBestSeller(false);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img
              className='w-20 h-20 object-cover cursor-pointer'
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt="upload"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[500px] px-3 py-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Write content here'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select
            className='w-full px-3 py-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Bonsai">Bonsai</option>
            <option value="Flowering">Flowering</option>
            <option value="Hanging">Hanging</option>
            <option value="Semishade">Semishade</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select
            className='w-full px-3 py-2'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full px-3 py-2 sm:w-[120px]'
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='25'
            required
          />
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          id='bestseller'
          checked={bestSeller}
          onChange={() => setBestSeller(!bestSeller)}
        />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button
        type='submit'
        className={`w-28 py-3 mt-4 text-white ${loading ? 'bg-gray-700' : 'bg-black'}`}
        disabled={loading}
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
