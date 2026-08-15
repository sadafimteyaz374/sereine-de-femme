import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { resolveImageUrl } from "../../config/api";
import Brand from "./Brand";
import { ArrowLeft, UploadCloud } from "lucide-react";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    material: "",
    imageURL: "",
    stock: "",
    keywords: "", // <-- Keywords field added here
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const productData = res.data.data;
        
        // Agar backend se keywords array aate hain, toh unhe comma-separated string mein convert kar lete hain taaki input mein dikh sakein
        if (Array.isArray(productData.keywords)) {
          productData.keywords = productData.keywords.join(", ");
        }

        setFormData(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
    setSaving(true);

    const payload = new FormData();
    // Payload mein keywords bhi include kar diya hai
    ["name", "description", "price", "category", "material", "stock", "keywords"].forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    });
    if (image) payload.append("image", image);

    try {
      await api.put(`/products/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error updating product:", err);
      alert(err.response?.data?.error || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = "input-field";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-zinc-400 text-sm">
        Loading product…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 text-sm font-medium transition"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <Brand size="sm" variant="light" />
      </div>

      <div className="max-w-2xl mx-auto admin-card p-8">
        <h2 className="font-brand-serif text-2xl font-semibold mb-6 text-zinc-900">
          Edit Product
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={preview || resolveImageUrl(formData.imageURL)}
            alt={formData.name}
            className="w-20 h-20 object-cover rounded-2xl bg-zinc-100 border border-zinc-200"
          />
          <label className="flex-1 flex items-center gap-3 border-2 border-dashed border-zinc-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-brand-gold transition text-sm text-zinc-500">
            <UploadCloud size={18} />
            {image ? image.name : "Replace product photo"}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Product Name
            </label>
            <input name="name" value={formData.name} onChange={handleChange} className={inputStyle} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Material
              </label>
              <input
                name="material"
                value={formData.material}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* 🌟 KEYWORDS INPUT FIELD ADDED HERE 🌟 */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Search Keywords / Synonyms
            </label>
            <input
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              placeholder="e.g. churi, chudi, choori, bangles"
              className={inputStyle}
            />
            <span className="text-[10px] text-zinc-400 tracking-wider mt-1 block">
              Separate multiple keywords with commas.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputStyle} h-24`}
              required
            />
          </div>

          <button type="submit" disabled={saving} className="w-full btn-gold py-3.5 text-sm font-semibold disabled:opacity-60">
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;