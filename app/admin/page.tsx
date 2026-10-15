'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Database,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  Loader2,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wrench,
  X,
} from 'lucide-react';
import type { Product } from '@/data/products';
import type { ServiceItem } from '@/data/services-data';

const PRODUCT_TAGS = [
  'Business essentials',
  'Books + learning',
  'Gifting + merchandise',
  'Packaging + displays',
  'Publications + reports',
];

const SERVICE_TAG_FILTERS = [
  'Corporate Reporting',
  'Commercial Print',
  'Books & Publishing',
  'Corporate Gifting',
  'Packaging & Production',
  'Large Format',
  'Design & Artwork',
  'Finishing & Bindery',
];

const PRESET_COLORS = [
  { id: 'orange', label: 'Orange (Brand)', hex: '#e97819' },
  { id: 'blue', label: 'Royal Blue', hex: '#2563eb' },
  { id: 'pink', label: 'Crimson / Pink', hex: '#db2777' },
  { id: 'yellow', label: 'Golden Amber', hex: '#d97706' },
  { id: 'cyan', label: 'Cyan Teal', hex: '#0891b2' },
  { id: 'black', label: 'Obsidian Black', hex: '#1c1d1f' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'settings'>('products');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [sanityStatus, setSanityStatus] = useState({ configured: false, writeAccess: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Product Form State
  const [prodForm, setProdForm] = useState({
    title: '',
    tag: 'Business essentials',
    intro: '',
    detail: '',
    color: 'orange',
    image: '/catalog/brochures.jpg',
    imageAlt: '',
    order: 1,
  });

  // New Service Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    number: '',
    category: '',
    tagFilter: 'Commercial Print',
    shortDescription: '',
    fullDescription: '',
    accent: '#e97819',
    image: '/annual-report.jpg',
    turnaround: '3–5 working days post-approval',
  });

  const [featuresList, setFeaturesList] = useState<string[]>([
    'High-resolution multi-color precision',
    'Custom tactile finishing options',
  ]);
  const [featureInput, setFeatureInput] = useState('');

  const [scopeList, setScopeList] = useState<string[]>([
    'Concept proofing & dummy approval',
    'Full volume production and packaging',
  ]);
  const [scopeInput, setScopeInput] = useState('');

  const [machineryList, setMachineryList] = useState<string[]>([
    'AccurioPress Digital Press',
    'Heidelberg 4-Color Offset',
  ]);
  const [machineryInput, setMachineryInput] = useState('');

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/items');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setServices(data.services || []);
        setSanityStatus({
          configured: Boolean(data.sanityConfigured),
          writeAccess: Boolean(data.hasWriteAccess),
        });
      }
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 5000);
  };

  // Handle Product Submission
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.title.trim() || !prodForm.detail.trim()) {
      showToast('error', 'Please fill in the Product Title and Detailed Description.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prodForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', `Product "${prodForm.title}" published! Live on website now.`);
        setProdForm({
          title: '',
          tag: 'Business essentials',
          intro: '',
          detail: '',
          color: 'orange',
          image: '/catalog/brochures.jpg',
          imageAlt: '',
          order: 1,
        });
        await fetchData();
      } else {
        showToast('error', data.error || 'Failed to add product');
      }
    } catch {
      showToast('error', 'Network error creating product');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Service Submission
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim() || !serviceForm.shortDescription.trim()) {
      showToast('error', 'Please fill in the Service Title and Short Description.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...serviceForm,
        number: serviceForm.number || String(services.length + 1).padStart(2, '0'),
        features: featuresList,
        scopeOfWork: scopeList,
        machinery: machineryList,
      };

      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', `Service "${serviceForm.title}" published! Live on website now.`);
        setServiceForm({
          title: '',
          number: '',
          category: '',
          tagFilter: 'Commercial Print',
          shortDescription: '',
          fullDescription: '',
          accent: '#e97819',
          image: '/annual-report.jpg',
          turnaround: '3–5 working days post-approval',
        });
        await fetchData();
      } else {
        showToast('error', data.error || 'Failed to add service');
      }
    } catch {
      showToast('error', 'Network error creating service');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteItem = async (id: string, type: 'product' | 'service') => {
    if (!confirm(`Are you sure you want to remove this ${type}?`)) return;
    try {
      const res = await fetch(`/api/admin/items?id=${encodeURIComponent(id)}&type=${type}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('success', `Item removed from active catalogue.`);
        await fetchData();
      } else {
        showToast('error', 'Could not delete item.');
      }
    } catch {
      showToast('error', 'Network error deleting item.');
    }
  };

  // Filtered lists
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.detail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagFilter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111215] text-[#ede8de] flex flex-col font-sans">
      {/* 1. Global Admin Header */}
      <header className="sticky top-0 z-50 border-b border-[#252830] bg-[#16181d]/95 backdrop-blur px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow">
              <img src="/printone-logo.png" alt="Print One Graphics" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                  Print One Graphics Desk
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#e97819]/20 text-[#e97819] border border-[#e97819]/30 uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-[#938e83]">Manage live products, print services &amp; Sanity CMS content</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2b2e38] bg-[#1c1e25] text-xs font-semibold text-[#c5c0b5] hover:border-[#e97819] hover:text-white transition-colors"
              title="Refresh catalogue data"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>View Live Website</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Feedback Notification Toast */}
      {feedback && (
        <div
          className={`fixed top-16 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-xl text-xs sm:text-sm font-medium transition-all ${
            feedback.type === 'success'
              ? 'bg-[#14291e] border-[#22c55e]/40 text-[#86efac]'
              : 'bg-[#2b1619] border-[#ef4444]/40 text-[#fca5a5]'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <X size={16} />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* 3. Sub-Navigation Tabs */}
      <div className="border-b border-[#22252c] bg-[#14161b] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[#e97819] text-[#e97819]'
                : 'border-transparent text-[#979286] hover:text-[#e4dfd4]'
            }`}
          >
            <Package size={15} />
            <span>Products</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#20232a] text-[10px] text-[#aea99c]">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'services'
                ? 'border-[#e97819] text-[#e97819]'
                : 'border-transparent text-[#979286] hover:text-[#e4dfd4]'
            }`}
          >
            <Layers size={15} />
            <span>Services</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#20232a] text-[10px] text-[#aea99c]">
              {services.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#e97819] text-[#e97819]'
                : 'border-transparent text-[#979286] hover:text-[#e4dfd4]'
            }`}
          >
            <Settings size={15} />
            <span>CMS Connection</span>
            <span
              className={`w-2 h-2 rounded-full ${
                sanityStatus.configured ? 'bg-[#22c55e]' : 'bg-[#eab308]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 4. Tab Contents */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {/* ================= PRODUCTS TAB ================= */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-start">
            {/* Form: Add New Product */}
            <div className="rounded-2xl border border-[#2b2e38] bg-[#1a1c22] p-6 shadow-xl">
              <div className="flex items-center gap-2 pb-4 border-b border-[#2b2e38]">
                <div className="w-8 h-8 rounded-lg bg-[#e97819]/15 border border-[#e97819]/30 flex items-center justify-center text-[#e97819]">
                  <Plus size={16} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Add New Product</h2>
                  <p className="text-xs text-[#989387]">Will reflect directly in /products &amp; home showcase</p>
                </div>
              </div>

              <form onSubmit={handleCreateProduct} className="mt-5 space-y-4 text-xs">
                {/* Title */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">
                    Product Title <span className="text-[#e97819]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Luxury Foil Stamped Presentation Boxes"
                    value={prodForm.title}
                    onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                  />
                </div>

                {/* Category Tag */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">Category Tag</label>
                  <select
                    value={prodForm.tag}
                    onChange={(e) => setProdForm({ ...prodForm, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white focus:outline-none focus:border-[#e97819]"
                  >
                    {PRODUCT_TAGS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Intro Headline */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">Short Intro Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g., A lasting impression with custom velvet finish."
                    value={prodForm.intro}
                    onChange={(e) => setProdForm({ ...prodForm, intro: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">
                    Detailed Description <span className="text-[#e97819]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe paper weights, binding, finish treatments, standard formats, and application..."
                    value={prodForm.detail}
                    onChange={(e) => setProdForm({ ...prodForm, detail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                  />
                </div>

                {/* Theme Accent Color */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">Card Color Accent</label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((c) => {
                      const isSelected = prodForm.color === c.id;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setProdForm({ ...prodForm, color: c.id })}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
                            isSelected
                              ? 'border-[#e97819] bg-[#e97819]/15 text-white'
                              : 'border-[#2d303a] bg-[#131417] text-[#938e83] hover:border-[#424653]'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Image Path or URL */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">
                    Product Image Path or URL
                  </label>
                  <input
                    type="text"
                    placeholder="/catalog/brochures.jpg or https://images.unsplash.com/..."
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                  />
                  <p className="mt-1 text-[10px] text-[#78746c]">
                    Default options: /catalog/brochures.jpg, /catalog/packaging-boxes.jpg, /catalog/notebooks.jpg, or any web image URL.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Publishing to Website &amp; CMS...</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Publish Product Live</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* List: Existing Products */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Live Product Catalogue ({products.length})</h3>
                  <p className="text-xs text-[#959084]">All published products currently active on the site</p>
                </div>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-[#736f66]" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-[#1c1e25] border border-[#2d303a] text-xs text-white placeholder-[#6e6b63] focus:outline-none focus:border-[#e97819]"
                  />
                </div>
              </div>

              <div className="max-h-[720px] overflow-y-auto space-y-2.5 pr-1">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-[#282b35] bg-[#1a1c22] hover:border-[#383d4a] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-[#242730] border border-[#333742] overflow-hidden shrink-0">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/catalog/brochures.jpg';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">{p.title}</h4>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#252832] text-[#e97819] shrink-0">
                            {p.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#938e83] truncate mt-0.5">{p.intro || p.detail}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteItem(p.id, 'product')}
                      className="p-2 rounded-lg hover:bg-[#2e191d] text-[#868177] hover:text-[#f87171] transition-colors shrink-0"
                      title="Remove product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= SERVICES TAB ================= */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-start">
            {/* Form: Add New Service */}
            <div className="rounded-2xl border border-[#2b2e38] bg-[#1a1c22] p-6 shadow-xl">
              <div className="flex items-center gap-2 pb-4 border-b border-[#2b2e38]">
                <div className="w-8 h-8 rounded-lg bg-[#e97819]/15 border border-[#e97819]/30 flex items-center justify-center text-[#e97819]">
                  <Wrench size={16} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Add New Print Service</h2>
                  <p className="text-xs text-[#989387]">Will reflect directly on /services &amp; modal sheets</p>
                </div>
              </div>

              <form onSubmit={handleCreateService} className="mt-5 space-y-4 text-xs">
                {/* Title & Index */}
                <div className="grid grid-cols-[1fr_80px] gap-3">
                  <div>
                    <label className="block font-semibold text-[#ded9cf] mb-1.5">
                      Service Title <span className="text-[#e97819]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Rigid Luxury Box Fabrication"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#ded9cf] mb-1.5">Index</label>
                    <input
                      type="text"
                      placeholder="10"
                      value={serviceForm.number}
                      onChange={(e) => setServiceForm({ ...serviceForm, number: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                    />
                  </div>
                </div>

                {/* Category & Tag Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#ded9cf] mb-1.5">Subtitle Category</label>
                    <input
                      type="text"
                      placeholder="e.g., Bespoke Rigid Packaging"
                      value={serviceForm.category}
                      onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#ded9cf] mb-1.5">Filter Tab Category</label>
                    <select
                      value={serviceForm.tagFilter}
                      onChange={(e) => setServiceForm({ ...serviceForm, tagFilter: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white focus:outline-none focus:border-[#e97819]"
                    >
                      {SERVICE_TAG_FILTERS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">
                    Short Description <span className="text-[#e97819]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Short summary displayed on the card..."
                    value={serviceForm.shortDescription}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, shortDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">Full Detailed Description</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation displayed inside modal dialog..."
                    value={serviceForm.fullDescription}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, fullDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                  />
                </div>

                {/* Key Features Pill Adder */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">Key Highlights / Features</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add feature and press +"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (featureInput.trim()) {
                            setFeaturesList([...featuresList, featureInput.trim()]);
                            setFeatureInput('');
                          }
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (featureInput.trim()) {
                          setFeaturesList([...featuresList, featureInput.trim()]);
                          setFeatureInput('');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#252832] hover:bg-[#323644] text-[#e97819] font-bold"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {featuresList.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#22252e] text-[11px] text-[#ded9cf]"
                      >
                        <span>{f}</span>
                        <X
                          size={12}
                          className="cursor-pointer text-[#8b877e] hover:text-white"
                          onClick={() => setFeaturesList(featuresList.filter((_, idx) => idx !== i))}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Machinery / Equipment */}
                <div>
                  <label className="block font-semibold text-[#ded9cf] mb-1.5">Machinery Deployed</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Heidelberg 4-Color Speedmaster"
                      value={machineryInput}
                      onChange={(e) => setMachineryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (machineryInput.trim()) {
                            setMachineryList([...machineryList, machineryInput.trim()]);
                            setMachineryInput('');
                          }
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#111215] border border-[#313540] text-white placeholder-[#68655c] focus:outline-none focus:border-[#e97819]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (machineryInput.trim()) {
                          setMachineryList([...machineryList, machineryInput.trim()]);
                          setMachineryInput('');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#252832] hover:bg-[#323644] text-[#e97819] font-bold"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {machineryList.map((m, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#22252e] text-[11px] text-[#ded9cf]"
                      >
                        <span>{m}</span>
                        <X
                          size={12}
                          className="cursor-pointer text-[#8b877e] hover:text-white"
                          onClick={() => setMachineryList(machineryList.filter((_, idx) => idx !== i))}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit Service */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Publishing Service...</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Publish Service Live</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* List: Existing Services */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Live Print Services ({services.length})</h3>
                  <p className="text-xs text-[#959084]">All production capabilities displayed on /services</p>
                </div>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-[#736f66]" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-[#1c1e25] border border-[#2d303a] text-xs text-white placeholder-[#6e6b63] focus:outline-none focus:border-[#e97819]"
                  />
                </div>
              </div>

              <div className="max-h-[720px] overflow-y-auto space-y-2.5 pr-1">
                {filteredServices.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-[#282b35] bg-[#1a1c22] hover:border-[#383d4a] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-[#242730] border border-[#333742] overflow-hidden shrink-0">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/annual-report.jpg';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#e97819]">{s.number}</span>
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">{s.title}</h4>
                        </div>
                        <p className="text-[11px] text-[#938e83] truncate mt-0.5">{s.shortDescription}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteItem(s.id, 'service')}
                      className="p-2 rounded-lg hover:bg-[#2e191d] text-[#868177] hover:text-[#f87171] transition-colors shrink-0"
                      title="Remove service"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= SETTINGS / CONNECTION TAB ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-[#2d313c] bg-[#1a1c22] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 pb-6 border-b border-[#2d313c]">
              <div className="w-10 h-10 rounded-xl bg-[#e97819]/15 border border-[#e97819]/30 flex items-center justify-center text-[#e97819]">
                <Database size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Sanity CMS Connection Status</h2>
                <p className="text-xs text-[#959085]">Bridge between Next.js Admin Desk and Sanity Cloud</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#14161b] border border-[#2a2d36]">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      sanityStatus.configured ? 'bg-[#22c55e]' : 'bg-[#eab308]'
                    }`}
                  />
                  <div>
                    <p className="font-bold text-white">Project ID Status</p>
                    <p className="text-[#8e897e]">
                      {sanityStatus.configured
                        ? 'Connected & Valid'
                        : 'Using Local Fallback Store (Instant Publishing Active)'}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#22252e] text-[#c9c4ba]">
                  {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Not set in .env.local'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#14161b] border border-[#2a2d36]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck
                    size={18}
                    className={sanityStatus.writeAccess ? 'text-[#22c55e]' : 'text-[#8e897e]'}
                  />
                  <div>
                    <p className="font-bold text-white">Direct Sanity Write Token</p>
                    <p className="text-[#8e897e]">
                      {sanityStatus.writeAccess
                        ? 'Token active: Items write directly to Sanity Cloud'
                        : 'No write token set: Items publish instantly via Local Desk & ready for sync'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0f1013] border border-[#262830] font-mono text-[11px] leading-relaxed">
                <p className="text-[#6d6960] font-sans font-medium mb-1"># Your .env.local keys:</p>
                <p className="text-[#e97819]">NEXT_PUBLIC_SANITY_PROJECT_ID=...</p>
                <p className="text-[#9e9a91]">NEXT_PUBLIC_SANITY_DATASET=production</p>
                <p className="text-[#9e9a91]">SANITY_API_WRITE_TOKEN=...</p>
              </div>

              <div className="pt-2 text-[#b0aba0] space-y-2 leading-relaxed">
                <p className="font-semibold text-white">How this screen works:</p>
                <p>
                  Whenever you submit a product or service from this Next.js screen, it is <strong>immediately reflected on the main website</strong> without requiring any login screen.
                </p>
                <p>
                  If you have configured Sanity credentials, the items are additionally mirrored into your Sanity CMS database automatically!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
