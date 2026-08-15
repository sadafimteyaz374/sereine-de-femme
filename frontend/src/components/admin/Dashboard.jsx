import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { resolveImageUrl } from "../../config/api";
import Brand from "./Brand";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  ShoppingBag,
  Tags,
  Bell,
  LogOut,
  Plus,
  PencilLine,
  Trash2,
  Gem,
  PackageX,
  AlertTriangle,
  Wallet,
} from "lucide-react";

/* ---------------------------------- Home ---------------------------------- */

const StatCard = ({ icon: Icon, label, value, tone }) => {
  const tones = {
    ink: "bg-zinc-50 border-zinc-200 text-zinc-900",
    gold: "bg-amber-50 border-amber-200 text-amber-700",
    rose: "bg-rose-50 border-rose-200 text-rose-600",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
  };
  return (
    <div className={`p-7 rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${tones[tone]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-zinc-500">{label}</div>
        <div className="p-2 rounded-xl bg-white/70">
          <Icon size={18} strokeWidth={1.75} />
        </div>
      </div>
      <div className="text-4xl font-brand-serif font-semibold">{value}</div>
    </div>
  );
};

const HomeView = ({ stats, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Gem} label="Total Items" value={stats?.totalItems ?? 0} tone="ink" />
        <StatCard icon={PackageX} label="Out of Stock" value={stats?.drafts ?? 0} tone="rose" />
        <StatCard icon={AlertTriangle} label="Low Stock Alert" value={stats?.lowStock ?? 0} tone="gold" />
        <StatCard
          icon={Wallet}
          label="Inventory Value"
          value={`₹${Number(stats?.inventoryValue ?? 0).toLocaleString("en-IN")}`}
          tone="emerald"
        />
      </div>

      <div className="admin-card p-8">
        <h3 className="font-brand-serif text-xl font-semibold text-zinc-900 mb-6">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/addProduct")}
            className="flex items-center gap-2 btn-primary px-6 py-3 text-sm"
          >
            <Plus size={16} /> Add New Product
          </button>
          <button
            onClick={() => setActiveTab("productmanagement")}
            className="flex items-center gap-2 bg-zinc-100 text-zinc-800 px-6 py-3 rounded-xl hover:bg-zinc-200 transition text-sm font-medium"
          >
            <Package size={16} /> Manage Products
          </button>
          <button
            onClick={() => setActiveTab("orderManagement")}
            className="flex items-center gap-2 bg-zinc-100 text-zinc-800 px-6 py-3 rounded-xl hover:bg-zinc-200 transition text-sm font-medium"
          >
            <ShoppingBag size={16} /> View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Product Management ------------------------------ */

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    api
      .get("/products/all")
      .then((response) => setProducts(response.data.data))
      .catch((err) => console.error("Error fetching products", err))
      .finally(() => setLoading(false));
  };

  useEffect(fetchProducts, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from the catalog? This cannot be undone.`)) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product", err);
      alert("Could not delete this product. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center text-zinc-400 text-sm">
        Loading catalog…
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-brand-serif text-2xl font-semibold text-zinc-900">Our Creations</h2>
        <button
          onClick={() => navigate("/addProduct")}
          className="flex items-center gap-2 btn-primary px-5 py-2.5 text-sm"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="admin-card p-16 text-center text-zinc-400">
          <Package size={32} className="mx-auto mb-4 text-zinc-300" />
          No products yet. Add your first piece to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item._id} className="admin-card p-5 flex flex-col">
              <img
                src={resolveImageUrl(item.imageURL)}
                alt={item.name}
                className="w-full h-64 object-cover rounded-2xl mb-4 bg-zinc-100"
              />
              <div className="space-y-1 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-zinc-900">{item.name}</h3>
                  {item.stock === 0 ? (
                    <span className="badge bg-rose-50 text-rose-600">Out of stock</span>
                  ) : item.stock < 5 ? (
                    <span className="badge bg-amber-50 text-amber-700">Low stock</span>
                  ) : (
                    <span className="badge bg-emerald-50 text-emerald-700">In stock</span>
                  )}
                </div>
                <p className="text-zinc-500 text-sm italic">
                  {item.category} • {item.material}
                </p>
                <p className="text-lg font-semibold text-zinc-900 pt-2">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-zinc-400">Stock: {item.stock}</p>
              </div>
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => navigate(`/edit-product/${item._id}`)}
                  className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-black transition"
                >
                  <PencilLine size={15} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className="flex items-center justify-center gap-2 bg-rose-50 text-rose-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-100 transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------ Simple Analytics ------------------------------ */

const SimpleAnalytics = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error fetching category breakdown", err))
      .finally(() => setLoading(false));
  }, []);

  const maxCount = Math.max(1, ...categories.map((c) => c.itemCount));

  return (
    <div className="space-y-8">
      <h2 className="font-brand-serif text-2xl font-semibold text-zinc-900">Simple Analytics</h2>

      <div className="admin-card p-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6">
          Catalog Mix by Category
        </h3>

        {loading ? (
          <div className="text-sm text-zinc-400">Loading analytics…</div>
        ) : categories.length === 0 ? (
          <div className="text-sm text-zinc-400">No product data yet.</div>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat._id || "uncategorized"}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-zinc-700">{cat._id || "Uncategorized"}</span>
                  <span className="text-zinc-400">{cat.itemCount} items · {cat.totalStock} in stock</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full btn-gold rounded-full"
                    style={{ width: `${(cat.itemCount / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = () => {
        setLoading(true);
        api.get("/orders/admin/all-orders")
            .then((res) => {
                if (res.data.success) {
                    setOrders(res.data.orders);
                }
            })
            .catch((err) => console.error("Error fetching orders", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await api.put(`/orders/admin/update-status/${orderId}`, {
                orderStatus: newStatus
            });
            
            if (res.data.success) {
                // Turant UI state update karein
                setOrders((prevOrders) =>
                    prevOrders.map((ord) =>
                        ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord
                    )
                );
            }
        } catch (err) {
            console.error("Error updating order status", err);
            alert("Failed to update status. Please check console.");
        }
    };

    if (loading) {
        return (
            <div className="p-10 flex items-center justify-center text-zinc-400 text-sm">
                Loading orders…
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="font-brand-serif text-2xl font-semibold text-zinc-900">Order Management</h2>

            {orders.length === 0 ? (
                <div className="admin-card p-16 text-center text-zinc-400">
                    <ShoppingBag size={32} className="mx-auto mb-4 text-zinc-300" />
                    <h3 className="text-zinc-700 font-medium mb-2">No orders found</h3>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto">
                        When customers place orders from the storefront, they will appear here automatically.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="admin-card p-6 flex flex-col gap-4">
                            {/* Order Header */}
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                                <div>
                                    <span className="text-xs text-zinc-400">Order ID:</span>
                                    <div className="font-mono text-sm font-semibold text-zinc-800">{order._id}</div>
                                    <div className="text-xs text-zinc-500 mt-0.5">
                                        Placed on: {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                                        })}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium text-zinc-500">Status:</span>
                                    <select
                                        value={order.orderStatus || "Processing"}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-brand-gold transition cursor-pointer"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Packed">Packed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>

                            {/* Customer & Payment Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-zinc-50/50 p-4 rounded-2xl">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Customer Details</span>
                                    <div className="font-medium text-zinc-900 mt-1">{order.userId?.name || "Guest / Unknown"}</div>
                                    <div className="text-zinc-500 text-xs">{order.userId?.email}</div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Shipping Address</span>
                                    <div className="text-zinc-700 text-xs mt-1">
                                        {order.shippingAddress ? (
                                            <>
                                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                            </>
                                        ) : (
                                            "Not provided"
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Items Ordered</span>
                                <div className="divide-y divide-zinc-100">
                                    {order.items.map((item, idx) => {
                                        const itemPrice = item.price ?? item.productId?.price ?? 0;
                                        const itemQty = item.quantity || 1;

                                        return (
                                            <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-3">
                                                    {item.productId?.imageURL && (
                                                        <img 
                                                            src={resolveImageUrl(item.productId.imageURL)} 
                                                            alt="" 
                                                            className="w-10 h-10 object-cover rounded-lg bg-zinc-100" 
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium text-zinc-800">
                                                            {item.productId?.name || "Product Unavailable"}
                                                        </div>
                                                        <div className="text-xs text-zinc-400">
                                                            Size: {item.size || "N/A"} · Qty: {itemQty}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-zinc-900">
                                                    ₹{(itemPrice * itemQty).toLocaleString("en-IN")}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Total Amount & Payment Mode */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                <div className="text-xs text-zinc-500">
                                    Payment Method: <span className="font-semibold text-zinc-800">{order.paymentMethod || "Online / COD"}</span> ({order.paymentStatus || "Pending"})
                                </div>
                                <div className="text-base font-semibold text-zinc-900">
                                    Total: ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/* ------------------------------ Category Manager ------------------------------ */

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error fetching categories", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="font-brand-serif text-2xl font-semibold text-zinc-900">Category Manager</h2>

      {loading ? (
        <div className="text-sm text-zinc-400">Loading categories…</div>
      ) : categories.length === 0 ? (
        <div className="admin-card p-16 text-center text-zinc-400">
          <Tags size={32} className="mx-auto mb-4 text-zinc-300" />
          No categories yet — they're created automatically from your products.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat._id || "uncategorized"} className="admin-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                  <Tags size={18} />
                </div>
                <h3 className="font-semibold text-zinc-900">{cat._id || "Uncategorized"}</h3>
              </div>
              <div className="text-sm text-zinc-500">
                {cat.itemCount} product{cat.itemCount !== 1 ? "s" : ""} · {cat.totalStock} units in stock
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------- Dashboard ---------------------------------- */

const NAV_ITEMS = [
  { id: "home", label: "Dashboard", icon: LayoutDashboard },
  { id: "productmanagement", label: "Product Management", icon: Package },
  { id: "simpleAnalytics", label: "Simple Analytics", icon: BarChart3 },
  { id: "orderManagement", label: "Order Management", icon: ShoppingBag },
  { id: "categoryManager", label: "Category Manager", icon: Tags },
];

const Dashboard = ({ setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => {
        if (res.data.success) setStats(res.data.data);
      })
      .catch((err) => console.error("Error fetching stats", err));
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/admin/login");
  };

  const activeLabel = NAV_ITEMS.find((n) => n.id === activeTab)?.label || "Dashboard";

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <div className="w-72 bg-brand-ink text-white flex flex-col p-5">
        <div className="py-4 px-2 mb-4">
          <Brand size="md" variant="dark" />
        </div>

        <nav className="flex-1 space-y-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white border border-brand-gold/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={17} strokeWidth={1.75} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors mt-4 border-t border-white/5 pt-5"
        >
          <LogOut size={17} strokeWidth={1.75} />
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8">
          <h2 className="font-semibold text-lg text-zinc-900">{activeLabel}</h2>
          <div className="flex items-center gap-5">
            <button className="text-zinc-400 hover:text-zinc-700 transition">
              <Bell size={19} />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-brand-ink text-white flex items-center justify-center text-xs font-semibold">
                SI
              </div>
              <div className="font-medium text-sm text-zinc-800">Sadaf Imteyaz</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 text-zinc-900 p-8 rounded-3xl mb-8 border border-amber-100 shadow-sm">
            <h1 className="font-brand-serif text-2xl font-semibold">Welcome, Sadaf Imteyaz!</h1>
            <p className="text-zinc-600 mt-2 max-w-2xl text-sm leading-relaxed">
              Sereine De Femme private management desk. From here you can oversee newly
              crafted pieces, review stock levels, and manage the catalog with ease.
            </p>
          </div>

          {activeTab === "home" && <HomeView stats={stats} setActiveTab={setActiveTab} />}
          {activeTab === "productmanagement" && <ProductManagement />}
          {activeTab === "simpleAnalytics" && <SimpleAnalytics />}
          {activeTab === "orderManagement" && <OrderManagement />}
          {activeTab === "categoryManager" && <CategoryManager />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;