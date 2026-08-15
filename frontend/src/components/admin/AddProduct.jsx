import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import Brand from "./Brand";
import { ArrowLeft, UploadCloud } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    material: "",
    stock: "",
    keywords: "", // <-- Naya field search keywords ke liye
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    if (image) payload.append("image", image);

    try {
      const response = await api.post("/products/add", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("✨ Product added successfully!");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Error:", err.response?.data);
      alert(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full p-4 bg-transparent border-b-2 border-zinc-200 focus:border-brand-ink focus:outline-none placeholder:text-zinc-400 placeholder:uppercase placeholder:text-[10px] tracking-widest transition-all";

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 text-sm font-medium transition"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <Brand size="sm" variant="light" />
      </div>

      <div className="max-w-6xl mx-auto bg-white border border-zinc-100 shadow-2xl rounded-[40px] overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-brand-ink relative min-h-[220px]">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-90" />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
              alt="Model"
              className="w-full h-full object-cover opacity-70"
            />
          )}
          <div className="absolute bottom-10 left-10 text-white">
            <h1 className="font-brand-serif text-4xl italic">Sereine</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase mt-2">New Creation Entry</p>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-12 bg-white">
          <h2 className="font-brand-serif text-2xl font-semibold tracking-wide mb-10 text-zinc-900">
            Add New Piece
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Product Name"
              className={inputClass}
              required
            />

            <div className="grid grid-cols-2 gap-8">
              <input
                name="price"
                type="number"
                onChange={handleChange}
                value={formData.price}
                placeholder="Price (INR)"
                className={inputClass}
                required
              />
              <input
                name="stock"
                type="number"
                onChange={handleChange}
                value={formData.stock}
                placeholder="Stock"
                className={inputClass}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <input
                name="category"
                onChange={handleChange}
                value={formData.category}
                placeholder="Category"
                className={inputClass}
                required
              />
              <input
                name="material"
                onChange={handleChange}
                value={formData.material}
                placeholder="Material"
                className={inputClass}
                required
              />
            </div>

            {/* 🌟 KEYWORDS INPUT FIELD ADDED HERE 🌟 */}
            <div>
              <input
                name="keywords"
                onChange={handleChange}
                value={formData.keywords}
                placeholder="Search Keywords / Synonyms (comma separated, e.g. churi, chudi, bangles)"
                className={inputClass}
              />
              <span className="text-[10px] text-zinc-400 tracking-wider mt-1 block px-1">
                Helps users find this product via Hindi, Urdu, or alternative spellings.
              </span>
            </div>

            <div className="pt-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500">
                Upload Image
              </label>
              <label className="mt-2 flex items-center gap-3 border-2 border-dashed border-zinc-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-brand-gold transition text-sm text-zinc-500">
                <UploadCloud size={18} />
                {image ? image.name : "Choose a product photo"}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <textarea
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Description"
              className={`${inputClass} h-20`}
              required
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-6 btn-gold py-5 uppercase tracking-[0.2em] text-sm disabled:opacity-60"
            >
              {submitting ? "Publishing…" : "Publish To Catalog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;