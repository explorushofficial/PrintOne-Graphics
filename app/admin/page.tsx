'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Database,
  ExternalLink,
  Filter,
  Layers,
  Loader2,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Wrench,
  X,
} from 'lucide-react';
import type { Product } from '@/data/products';
import type { ServiceItem } from '@/data/services-data';
import { AdminImageUploader } from '@/components/admin-image-uploader';

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
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Product Form State
  const [prodForm, setProdForm] = useState({
    title: '',
    tag: 'Business essentials',
    intro: '',
    detail: '',
    color: 'orange',
    image: '',
    imageAlt: '',
    order: 1,
  });

  const [capabilitiesList, setCapabilitiesList] = useState<string[]>([
    'Paper Stocks: Fine art, textured linen, recycled wove, and FSC cotton stocks.',
    'Specialty Finishes: Foil stamping, blind deboss, spot gloss UV, and soft-touch lamination.',
    'Custom Sizes: Standard ISO dimensions or bespoke custom dieline trims.',
    'Speed & Proofs: 48-hour physical proofing available prior to production run.',
  ]);
  const [capabilityInput, setCapabilityInput] = useState('');

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    number: '',
    category: '',
    tagFilter: 'Commercial Print',
    shortDescription: '',
    fullDescription: '',
    accent: '#e97819',
    image: '',
    turnaround: '3–5 working days post-approval',
  });

  const [featuresList, setFeaturesList] = useState<string[]>([
    'High-resolution multi-color precision',
    'Custom tactile finishing options',
  ]);
  const [featureInput, setFeatureInput] = useState('');

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

  // Open Product Modal (New or Edit)
  const openNewProductModal = () => {
    setEditingProductId(null);
    setProdForm({
      title: '',
      tag: 'Business essentials',
      intro: '',
      detail: '',
      color: 'orange',
      image: '',
      imageAlt: '',
      order: 1,
    });
    setCapabilitiesList([
      'Paper Stocks: Fine art, textured linen, recycled wove, and FSC cotton stocks.',
      'Specialty Finishes: Foil stamping, blind deboss, spot gloss UV, and soft-touch lamination.',
      'Custom Sizes: Standard ISO dimensions or bespoke custom dieline trims.',
      'Speed & Proofs: 48-hour physical proofing available prior to production run.',
    ]);
    setCapabilityInput('');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setProdForm({
      title: product.title,
      tag: product.tag,
      intro: product.intro,
      detail: product.detail,
      color: product.color || 'orange',
      image: product.image,
      imageAlt: product.imageAlt || '',
      order: 1,
    });
    setCapabilitiesList(
      product.capabilities && product.capabilities.length > 0
        ? product.capabilities
        : [
            'Paper Stocks: Fine art, textured linen, recycled wove, and FSC cotton stocks.',
            'Specialty Finishes: Foil stamping, blind deboss, spot gloss UV, and soft-touch lamination.',
            'Custom Sizes: Standard ISO dimensions or bespoke custom dieline trims.',
            'Speed & Proofs: 48-hour physical proofing available prior to production run.',
          ]
    );
    setCapabilityInput('');
    setIsProductModalOpen(true);
  };

  // Open Service Modal (New or Edit)
  const openNewServiceModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: '',
      number: String(services.length + 1).padStart(2, '0'),
      category: '',
      tagFilter: 'Commercial Print',
      shortDescription: '',
      fullDescription: '',
      accent: '#e97819',
      image: '',
      turnaround: '3–5 working days post-approval',
    });
    setFeaturesList(['High-resolution multi-color precision', 'Custom tactile finishing options']);
    setMachineryList(['AccurioPress Digital Press', 'Heidelberg 4-Color Offset']);
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      number: service.number,
      category: service.category,
      tagFilter: service.tagFilter,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      accent: service.accent || '#e97819',
      image: service.image,
      turnaround: service.turnaround || '3–5 working days post-approval',
    });
    setFeaturesList(service.features || []);
    setMachineryList(service.machinery || []);
    setIsServiceModalOpen(true);
  };

  // Handle Product Save / Update
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.title.trim() || !prodForm.detail.trim()) {
      showToast('error', 'Please fill in Product Title and Description.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...prodForm,
        capabilities: capabilitiesList,
        ...(editingProductId ? { id: editingProductId } : {}),
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          'success',
          editingProductId
            ? `Product "${prodForm.title}" updated successfully!`
            : `Product "${prodForm.title}" published! Live on website now.`
        );
        setIsProductModalOpen(false);
        await fetchData();
      } else {
        showToast('error', data.error || 'Failed to save product');
      }
    } catch {
      showToast('error', 'Network error saving product');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Service Save / Update
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim() || !serviceForm.shortDescription.trim()) {
      showToast('error', 'Please fill in Service Title and Short Description.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...serviceForm,
        ...(editingServiceId ? { id: editingServiceId } : {}),
        features: featuresList,
        machinery: machineryList,
      };

      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          'success',
          editingServiceId
            ? `Service "${serviceForm.title}" updated successfully!`
            : `Service "${serviceForm.title}" published! Live on website now.`
        );
        setIsServiceModalOpen(false);
        await fetchData();
      } else {
        showToast('error', data.error || 'Failed to save service');
      }
    } catch {
      showToast('error', 'Network error saving service');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteItem = async (id: string, type: 'product' | 'service', title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/items?id=${encodeURIComponent(id)}&type=${type}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('success', `"${title}" removed from catalogue.`);
        await fetchData();
      } else {
        showToast('error', 'Could not delete item.');
      }
    } catch {
      showToast('error', 'Network error deleting item.');
    }
  };

  // Filtered lists
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.detail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || p.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagFilter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || s.tagFilter === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1c1d1f] flex flex-col font-sans">
      {/* 1. Global Admin Header (Light Theme) */}
      <header className="sticky top-0 z-40 border-b border-[#e5dfd4] bg-[#ffffff]/95 backdrop-blur px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-[#e5dfd4] shadow-xs">
              <img src="/printone-logo.png" alt="Print One Graphics" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-display text-[#1c1d1f] tracking-tight">
                  Print One Graphics Desk
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#fff4eb] text-[#e97819] border border-[#ffd8be] uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-[#78746c]">Manage live products, print services &amp; Sanity CMS content</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ded6c9] bg-[#fcfaf6] text-xs font-semibold text-[#5a564d] hover:border-[#e97819] hover:text-[#e97819] hover:bg-white transition-colors"
              title="Refresh catalogue data"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-[#e97819]' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-colors shadow-xs"
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
              ? 'bg-[#f0fdf4] border-[#86efac] text-[#166534]'
              : 'bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 size={16} className="text-[#16a34a]" />
          ) : (
            <X size={16} className="text-[#dc2626]" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* 3. Sub-Navigation Tabs */}
      <div className="border-b border-[#e5dfd4] bg-[#f5efe6] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              setActiveTab('products');
              setSelectedTag('ALL');
            }}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-[#e97819] text-[#e97819] bg-white rounded-t-lg shadow-xs'
                : 'border-transparent text-[#6e695f] hover:text-[#1c1d1f]'
            }`}
          >
            <Package size={15} />
            <span>Products</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#ede6da] text-[10px] text-[#5c584f] font-semibold">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('services');
              setSelectedTag('ALL');
            }}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'services'
                ? 'border-[#e97819] text-[#e97819] bg-white rounded-t-lg shadow-xs'
                : 'border-transparent text-[#6e695f] hover:text-[#1c1d1f]'
            }`}
          >
            <Layers size={15} />
            <span>Services</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#ede6da] text-[10px] text-[#5c584f] font-semibold">
              {services.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-[#e97819] text-[#e97819] bg-white rounded-t-lg shadow-xs'
                : 'border-transparent text-[#6e695f] hover:text-[#1c1d1f]'
            }`}
          >
            <Settings size={15} />
            <span>CMS Connection</span>
            <span
              className={`w-2 h-2 rounded-full ${
                sanityStatus.configured ? 'bg-[#16a34a]' : 'bg-[#ca8a04]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 4. Tab Contents (Full Width Cards with Top "+ Add" Button) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {/* ================= PRODUCTS TAB ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Action Bar: Title, Search, Filter & "+ Add New Product" Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#e5dfd4] shadow-xs">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c1d1f]">
                  Live Products Catalogue ({products.length})
                </h2>
                <p className="text-xs text-[#78746c]">
                  Browse, edit, delete, or publish new printed products directly to the live website
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-[#8c877d]" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl bg-[#faf8f2] border border-[#dcd5c7] text-xs text-[#1c1d1f] placeholder-[#8c877d] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                </div>

                {/* Tag Filter */}
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#faf8f2] border border-[#dcd5c7] text-xs text-[#1c1d1f] focus:outline-none focus:bg-white focus:border-[#e97819]"
                >
                  <option value="ALL">All Categories</option>
                  {PRODUCT_TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                {/* Primary Action Button: Opens Modal */}
                <button
                  type="button"
                  onClick={openNewProductModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e5dfd4] p-12 text-center text-[#78746c]">
                <Package size={36} className="mx-auto mb-2 text-[#b0a99c]" />
                <p className="font-bold text-sm text-[#1c1d1f]">
                  {products.length === 0 ? 'No custom products in Sanity CMS yet' : 'No products found'}
                </p>
                <p className="text-xs mt-1 text-[#78746c] max-w-md mx-auto">
                  {products.length === 0
                    ? 'The main website is currently serving the backup catalog. Any product you publish here will be saved directly in Sanity CMS Cloud and shown first on the live site.'
                    : 'Try adjusting your search query or category filter.'}
                </p>
                {products.length === 0 && (
                  <button
                    type="button"
                    onClick={openNewProductModal}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Plus size={15} />
                    <span>Create Your First Product</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="group flex flex-col justify-between rounded-2xl border border-[#e5dfd4] bg-white overflow-hidden hover:border-[#cfc6b5] hover:shadow-md transition-all"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="relative aspect-4/3 w-full bg-[#f5efe6] overflow-hidden border-b border-[#eee8dc]">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/catalog/brochures.jpg';
                          }}
                        />
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#c45b0a] border border-[#ffd8be] shadow-2xs backdrop-blur-xs">
                          {p.tag}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-[#1c1d1f] line-clamp-1">{p.title}</h3>
                        <p className="text-xs text-[#706c64] line-clamp-2 mt-1">{p.intro || p.detail}</p>
                      </div>
                    </div>

                    {/* Card Actions: Edit & Delete */}
                    <div className="flex items-center justify-between gap-2 p-3 border-t border-[#f0eae0] bg-[#faf8f4]">
                      <button
                        type="button"
                        onClick={() => openEditProductModal(p)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#ded7cc] hover:border-[#e97819] hover:text-[#e97819] text-[#4d4a43] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                      >
                        <Pencil size={12} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteItem(p.id, 'product', p.title)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#fee2e2] text-[#8c877d] hover:text-[#dc2626] text-xs font-semibold transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= SERVICES TAB ================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Action Bar: Title, Search, Filter & "+ Add New Service" Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#e5dfd4] shadow-xs">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#1c1d1f]">
                  Live Services Portfolio ({services.length})
                </h2>
                <p className="text-xs text-[#78746c]">
                  Browse, edit, delete, or publish industrial print production services
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-[#8c877d]" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl bg-[#faf8f2] border border-[#dcd5c7] text-xs text-[#1c1d1f] placeholder-[#8c877d] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                </div>

                {/* Filter Tab */}
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#faf8f2] border border-[#dcd5c7] text-xs text-[#1c1d1f] focus:outline-none focus:bg-white focus:border-[#e97819]"
                >
                  <option value="ALL">All Categories</option>
                  {SERVICE_TAG_FILTERS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>

                {/* Primary Action Button: Opens Modal */}
                <button
                  type="button"
                  onClick={openNewServiceModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add New Service</span>
                </button>
              </div>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e5dfd4] p-12 text-center text-[#78746c]">
                <Layers size={36} className="mx-auto mb-2 text-[#b0a99c]" />
                <p className="font-bold text-sm text-[#1c1d1f]">
                  {services.length === 0 ? 'No custom services in Sanity CMS yet' : 'No services found'}
                </p>
                <p className="text-xs mt-1 text-[#78746c] max-w-md mx-auto">
                  {services.length === 0
                    ? 'The main website is currently serving the backup services. Any service you publish here will be saved directly in Sanity CMS Cloud and shown first on the live site.'
                    : 'Try adjusting your search query or category filter.'}
                </p>
                {services.length === 0 && (
                  <button
                    type="button"
                    onClick={openNewServiceModal}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Plus size={15} />
                    <span>Create Your First Service</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((s) => (
                  <div
                    key={s.id}
                    className="group flex flex-col justify-between rounded-2xl border border-[#e5dfd4] bg-white overflow-hidden hover:border-[#cfc6b5] hover:shadow-md transition-all"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative aspect-16/9 w-full bg-[#f5efe6] overflow-hidden border-b border-[#eee8dc]">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/annual-report.jpg';
                          }}
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#1c1d1f] text-white shadow-xs">
                            {s.number}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#c45b0a] border border-[#ffd8be] shadow-2xs backdrop-blur-xs">
                            {s.tagFilter}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-[11px] font-semibold text-[#8c877d] uppercase tracking-wider">
                          {s.category}
                        </p>
                        <h3 className="font-bold text-base text-[#1c1d1f] mt-1 line-clamp-1">
                          {s.title}
                        </h3>
                        <p className="text-xs text-[#706c64] line-clamp-2 mt-2 leading-relaxed">
                          {s.shortDescription}
                        </p>

                        {/* Features Tags */}
                        {s.features && s.features.length > 0 && (
                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {s.features.slice(0, 3).map((f, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-[#f5efe6] text-[10px] text-[#4d4941] border border-[#e5dfd4]"
                              >
                                {f}
                              </span>
                            ))}
                            {s.features.length > 3 && (
                              <span className="px-1.5 py-0.5 text-[10px] text-[#8c877d]">
                                +{s.features.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Actions: Edit & Delete */}
                    <div className="flex items-center justify-between gap-2 p-3 border-t border-[#f0eae0] bg-[#faf8f4]">
                      <button
                        type="button"
                        onClick={() => openEditServiceModal(s)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#ded7cc] hover:border-[#e97819] hover:text-[#e97819] text-[#4d4a43] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                      >
                        <Pencil size={12} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteItem(s.id, 'service', s.title)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#fee2e2] text-[#8c877d] hover:text-[#dc2626] text-xs font-semibold transition-colors cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= SETTINGS TAB ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-[#e5dfd4] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-6 border-b border-[#eee8dc]">
              <div className="w-10 h-10 rounded-xl bg-[#fff4eb] border border-[#ffd8be] flex items-center justify-center text-[#e97819]">
                <Database size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1c1d1f]">Sanity CMS Connection Status</h2>
                <p className="text-xs text-[#78746c]">Bridge between Next.js Admin Desk and Sanity Cloud</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#faf8f2] border border-[#e5dfd4]">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      sanityStatus.configured ? 'bg-[#16a34a]' : 'bg-[#ca8a04]'
                    }`}
                  />
                  <div>
                    <p className="font-bold text-[#1c1d1f]">Project ID Status</p>
                    <p className="text-[#78746c]">
                      {sanityStatus.configured
                        ? 'Connected & Valid'
                        : 'Using Local Fallback Store (Instant Publishing Active)'}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#eee7db] text-[#423f38]">
                  {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Not set in .env.local'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#faf8f2] border border-[#e5dfd4]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck
                    size={18}
                    className={sanityStatus.writeAccess ? 'text-[#16a34a]' : 'text-[#8c877d]'}
                  />
                  <div>
                    <p className="font-bold text-[#1c1d1f]">Direct Sanity Write Token</p>
                    <p className="text-[#78746c]">
                      {sanityStatus.writeAccess
                        ? 'Token active: Items write directly to Sanity Cloud'
                        : 'No write token set: Items publish instantly via Local Desk & ready for sync'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f5efe6] border border-[#e2dbce] font-mono text-[11px] leading-relaxed">
                <p className="text-[#7a756b] font-sans font-medium mb-1"># Your .env.local keys:</p>
                <p className="text-[#c45b0a]">NEXT_PUBLIC_SANITY_PROJECT_ID=...</p>
                <p className="text-[#55524b]">NEXT_PUBLIC_SANITY_DATASET=production</p>
                <p className="text-[#55524b]">SANITY_API_WRITE_TOKEN=...</p>
              </div>

              <div className="pt-2 text-[#5c584f] space-y-2 leading-relaxed">
                <p className="font-semibold text-[#1c1d1f]">How this screen works:</p>
                <p>
                  Whenever you publish or edit a product or service, it is <strong>immediately reflected on the main website</strong>.
                </p>
                <p>
                  If you have configured Sanity credentials in <code className="bg-[#f0ebe1] px-1 py-0.5 rounded text-[#c45b0a]">.env.local</code>, the items are additionally mirrored into your Sanity CMS database automatically!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= 5. POPUP MODAL: ADD / EDIT PRODUCT ================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-2xl border border-[#e5dfd4] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#eee8dc] bg-[#faf8f4]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#fff4eb] border border-[#ffd8be] flex items-center justify-center text-[#e97819]">
                  {editingProductId ? <Pencil size={15} /> : <Plus size={16} />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1c1d1f]">
                    {editingProductId ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <p className="text-[11px] text-[#78746c]">
                    {editingProductId
                      ? 'Update specifications and photos for this product'
                      : 'Create a new printed product to display across the site'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#eee7dc] text-[#6e6a60] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable Form) */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">
                  Product Title <span className="text-[#e97819]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Luxury Foil Stamped Presentation Boxes"
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819] focus:ring-1 focus:ring-[#e97819]"
                />
              </div>

              {/* Category Tag */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">Category Tag</label>
                <select
                  value={prodForm.tag}
                  onChange={(e) => setProdForm({ ...prodForm, tag: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] focus:outline-none focus:bg-white focus:border-[#e97819]"
                >
                  {PRODUCT_TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intro Tagline */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">Short Intro Tagline</label>
                <input
                  type="text"
                  placeholder="e.g., A lasting impression with custom velvet finish."
                  value={prodForm.intro}
                  onChange={(e) => setProdForm({ ...prodForm, intro: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">
                  Detailed Description <span className="text-[#e97819]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe paper weights, binding, finish treatments, standard formats, and application..."
                  value={prodForm.detail}
                  onChange={(e) => setProdForm({ ...prodForm, detail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                />
              </div>

              {/* Card Color Accent */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">Card Color Accent</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((c) => {
                    const isSelected = prodForm.color === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setProdForm({ ...prodForm, color: c.id })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all ${
                          isSelected
                            ? 'border-[#e97819] bg-[#fff5eb] text-[#c45b0a] shadow-2xs'
                            : 'border-[#ded7cb] bg-[#faf8f2] text-[#5e5a52] hover:border-[#b8b0a2] hover:bg-white'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                        <span>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Production Capabilities for this item */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-semibold text-[#302e29]">
                    Production Capabilities for this item
                  </label>
                  <span className="text-[10px] text-[#8c877d]">
                    Displayed on product card details
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Paper Stocks: 350 GSM Art Card or Specialty Finishes: Gold Foil..."
                    value={capabilityInput}
                    onChange={(e) => setCapabilityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (capabilityInput.trim()) {
                          setCapabilitiesList([...capabilitiesList, capabilityInput.trim()]);
                          setCapabilityInput('');
                        }
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (capabilityInput.trim()) {
                        setCapabilitiesList([...capabilitiesList, capabilityInput.trim()]);
                        setCapabilityInput('');
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-[#fff4eb] border border-[#ffd8be] hover:bg-[#ffe8d7] text-[#e97819] font-bold cursor-pointer"
                    title="Add capability"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Capabilities list */}
                <div className="mt-2.5 space-y-1.5">
                  {capabilitiesList.map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#f5efe6] text-[11px] text-[#423f38] border border-[#e5dfd4]"
                    >
                      <div className="flex items-center gap-2 overflow-hidden text-ellipsis">
                        <Check size={12} className="text-[#e97819] shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                      <X
                        size={13}
                        className="cursor-pointer text-[#8a8479] hover:text-[#dc2626] shrink-0"
                        onClick={() =>
                          setCapabilitiesList(capabilitiesList.filter((_, idx) => idx !== i))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload Component */}
              <AdminImageUploader
                label="Product Photo / Artwork"
                value={prodForm.image}
                onChange={(url, assetId) =>
                  setProdForm({ ...prodForm, image: url, ...(assetId ? { sanityAssetId: assetId } : {}) })
                }
              />

              {/* Modal Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#eee8dc]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#ded7cb] bg-[#faf8f2] hover:bg-white text-xs font-semibold text-[#5a564d] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingProductId ? 'Save Changes' : 'Publish Product Live'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 6. POPUP MODAL: ADD / EDIT SERVICE ================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-2xl border border-[#e5dfd4] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#eee8dc] bg-[#faf8f4]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#fff4eb] border border-[#ffd8be] flex items-center justify-center text-[#e97819]">
                  {editingServiceId ? <Pencil size={15} /> : <Wrench size={16} />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1c1d1f]">
                    {editingServiceId ? 'Edit Service' : 'Add New Print Service'}
                  </h3>
                  <p className="text-[11px] text-[#78746c]">
                    {editingServiceId
                      ? 'Update specifications, machinery and highlights for this service'
                      : 'Create a new production capability displayed across the site'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#eee7dc] text-[#6e6a60] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable Form) */}
            <form onSubmit={handleSaveService} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {/* Title & Index */}
              <div className="grid grid-cols-[1fr_80px] gap-3">
                <div>
                  <label className="block font-semibold text-[#302e29] mb-1.5">
                    Service Title <span className="text-[#e97819]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rigid Luxury Box Fabrication"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#302e29] mb-1.5">Index</label>
                  <input
                    type="text"
                    placeholder="10"
                    value={serviceForm.number}
                    onChange={(e) => setServiceForm({ ...serviceForm, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                </div>
              </div>

              {/* Subtitle Category & Filter Tab */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#302e29] mb-1.5">Subtitle Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Bespoke Rigid Packaging"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#302e29] mb-1.5">Filter Tab Category</label>
                  <select
                    value={serviceForm.tagFilter}
                    onChange={(e) => setServiceForm({ ...serviceForm, tagFilter: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] focus:outline-none focus:bg-white focus:border-[#e97819]"
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
                <label className="block font-semibold text-[#302e29] mb-1.5">
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">Full Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed explanation displayed inside modal dialog..."
                  value={serviceForm.fullDescription}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, fullDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                />
              </div>

              {/* Key Features Pill Adder */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">Key Highlights / Features</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add highlight and press Enter or +"
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
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (featureInput.trim()) {
                        setFeaturesList([...featuresList, featureInput.trim()]);
                        setFeatureInput('');
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-[#fff4eb] border border-[#ffd8be] hover:bg-[#ffe8d7] text-[#e97819] font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {featuresList.map((f, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f5efe6] text-[11px] text-[#423f38] border border-[#e5dfd4]"
                    >
                      <span>{f}</span>
                      <X
                        size={12}
                        className="cursor-pointer text-[#8a8479] hover:text-[#dc2626]"
                        onClick={() => setFeaturesList(featuresList.filter((_, idx) => idx !== i))}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Machinery Deployed */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">Machinery Deployed</label>
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
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#e97819]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (machineryInput.trim()) {
                        setMachineryList([...machineryList, machineryInput.trim()]);
                        setMachineryInput('');
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-[#fff4eb] border border-[#ffd8be] hover:bg-[#ffe8d7] text-[#e97819] font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {machineryList.map((m, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f5efe6] text-[11px] text-[#423f38] border border-[#e5dfd4]"
                    >
                      <span>{m}</span>
                      <X
                        size={12}
                        className="cursor-pointer text-[#8a8479] hover:text-[#dc2626]"
                        onClick={() => setMachineryList(machineryList.filter((_, idx) => idx !== i))}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Image Uploader */}
              <AdminImageUploader
                label="Service Cover Photo"
                value={serviceForm.image}
                onChange={(url, assetId) =>
                  setServiceForm({ ...serviceForm, image: url, ...(assetId ? { sanityAssetId: assetId } : {}) })
                }
                presetList={[
                  { name: 'Annual Report', url: '/annual-report.jpg' },
                  { name: 'Brochures', url: '/catalog/brochures.jpg' },
                  { name: 'Packaging', url: '/catalog/packaging-boxes.jpg' },
                  { name: 'Catalogues', url: '/catalog/product-catalogues.jpg' },
                ]}
              />

              {/* Modal Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#eee8dc]">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#ded7cb] bg-[#faf8f2] hover:bg-white text-xs font-semibold text-[#5a564d] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#e97819] hover:bg-[#d56a12] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingServiceId ? 'Save Changes' : 'Publish Service Live'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
