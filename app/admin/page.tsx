'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  Loader2,
  Lock,
  LogOut,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import type { Product } from '@/data/products';
import { AdminImageUploader } from '@/components/admin-image-uploader';

const PRODUCT_TAGS = [
  'Business essentials',
  'Books + learning',
  'Gifting + merchandise',
  'Packaging + displays',
  'Publications + reports',
];


const PRESET_COLORS = [
  { id: 'green', label: 'Emerald Green (Brand)', hex: '#10383A' },
  { id: 'blue', label: 'Royal Blue', hex: '#2563eb' },
  { id: 'pink', label: 'Crimson / Pink', hex: '#db2777' },
  { id: 'yellow', label: 'Golden Amber', hex: '#d97706' },
  { id: 'cyan', label: 'Cyan Teal', hex: '#0891b2' },
  { id: 'black', label: 'Obsidian Black', hex: '#1c1d1f' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sanityStatus, setSanityStatus] = useState({ configured: false, writeAccess: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

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


  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/items');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
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

  // Check if session is already active
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    } catch {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPassword.trim()) {
      setLoginError('Please enter your admin passcode.');
      return;
    }
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setLoginPassword('');
        showToast('success', 'Passcode verified. Welcome to Admin Portal!');
        fetchData();
      } else {
        setLoginError(data.error || 'Incorrect passcode. Please try again.');
      }
    } catch {
      setLoginError('Network error verifying passcode.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      showToast('success', 'Logged out safely.');
    } catch {
      setIsAuthenticated(false);
    }
  };

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


  // Handle Product Save / Update
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.title.trim()) {
      showToast('error', 'Please fill in Product Title.');
      return;
    }

    setSubmitting(true);
    try {
      const finalDetail = prodForm.detail?.trim() || prodForm.intro?.trim() || prodForm.title.trim();
      const payload = {
        ...prodForm,
        detail: finalDetail,
        color: prodForm.color || 'green',
        capabilities: capabilitiesList.length > 0 ? capabilitiesList : [],
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


  // Handle Delete
  const handleDeleteItem = async (id: string, type: 'product', title: string) => {
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


  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#faf8f2] flex flex-col items-center justify-center p-4">
        <Loader2 size={32} className="animate-spin text-[#10383A]" />
        <p className="mt-3 text-xs text-[#78746c] font-medium">Checking authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f2] text-[#1c1d1f] flex flex-col justify-between font-sans">
        {/* Simple top bar */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-[#e5dfd4] bg-white/70 backdrop-blur-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center border border-[#e5dfd4] shadow-xs">
              <img src="/printone-logo.png" alt="PrintOne Graphics" className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-sm text-[#1c1d1f]">PrintOne Graphics</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#6e6a60] hover:text-[#10383A] font-semibold transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Website</span>
          </Link>
        </header>

        {/* Center Login Box */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#e5dfd4] shadow-xl p-8 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#eaf3f0] border border-[#b8dbd2] flex items-center justify-center text-[#10383A] mb-5 shadow-xs">
              <Lock size={26} />
            </div>

            <h1 className="font-display font-bold text-xl sm:text-2xl text-[#1c1d1f] tracking-tight">
              Admin Portal
            </h1>
            <p className="mt-1.5 text-xs text-[#78746c] max-w-xs mx-auto leading-relaxed">
              Enter your administrative passcode to manage products, services &amp; Sanity CMS content.
            </p>

            {loginError && (
              <div className="mt-4 p-3 rounded-xl bg-[#fef2f2] border border-[#fca5a5] text-[#991b1b] text-xs font-medium text-left flex items-start gap-2">
                <X size={15} className="mt-0.5 shrink-0 text-[#dc2626]" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#302e29] mb-1.5">
                  Administrative Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password..."
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    autoFocus
                    required
                    className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-[#faf8f2] border border-[#dcd5c7] text-sm text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#10383A] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c877d] hover:text-[#1c1d1f] p-1 transition-colors cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#10383A] hover:bg-[#164a4d] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loginLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verifying Passcode...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Unlock Admin Desk</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#f0eae0] text-center">
              <p className="text-[11px] text-[#918c81]">
                Passcode is configured in your <code className="bg-[#f5efe6] px-1.5 py-0.5 rounded text-[#10383A] font-mono">.env.local</code> as <span className="font-semibold text-[#5a564d]">ADMIN_PASSWORD</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Simple bottom footer */}
        <footer className="py-4 text-center text-[11px] text-[#918c81]">
          PrintOne Graphics &copy; {new Date().getFullYear()} &bull; Secure Management Portal
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#1c1d1f] flex flex-col font-sans">
      {/* 1. Global Admin Header (Light Theme) */}
      <header className="sticky top-0 z-40 border-b border-[#e5dfd4] bg-[#ffffff]/95 backdrop-blur px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-[#e5dfd4] shadow-xs">
              <img src="/printone-logo.png" alt="PrintOne Graphics" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-display text-[#1c1d1f] tracking-tight">
                  PrintOne Graphics Desk
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#eaf3f0] text-[#10383A] border border-[#b8dbd2] uppercase tracking-wider">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ded6c9] bg-[#fcfaf6] text-xs font-semibold text-[#5a564d] hover:border-[#10383A] hover:text-[#10383A] hover:bg-white transition-colors cursor-pointer"
              title="Refresh catalogue data"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-[#10383A]' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#10383A] hover:bg-[#164a4d] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>View Live Website</span>
              <ExternalLink size={13} />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ded6c9] bg-[#fcfaf6] text-xs font-semibold text-[#78746c] hover:border-[#dc2626] hover:text-[#dc2626] hover:bg-white transition-colors cursor-pointer"
              title="Log out from admin"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
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
                ? 'border-[#10383A] text-[#10383A] bg-white rounded-t-lg shadow-xs'
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
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-[#10383A] text-[#10383A] bg-white rounded-t-lg shadow-xs'
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
                    className="pl-8 pr-3 py-2 rounded-xl bg-[#faf8f2] border border-[#dcd5c7] text-xs text-[#1c1d1f] placeholder-[#8c877d] focus:outline-none focus:bg-white focus:border-[#10383A]"
                  />
                </div>

                {/* Tag Filter */}
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#faf8f2] border border-[#dcd5c7] text-xs text-[#1c1d1f] focus:outline-none focus:bg-white focus:border-[#10383A]"
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10383A] hover:bg-[#164a4d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
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
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10383A] hover:bg-[#164a4d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
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
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#10383A] border border-[#b8dbd2] shadow-2xs backdrop-blur-xs">
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#ded7cc] hover:border-[#10383A] hover:text-[#10383A] text-[#4d4a43] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
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


        {/* ================= SETTINGS TAB ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-[#e5dfd4] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-6 border-b border-[#eee8dc]">
              <div className="w-10 h-10 rounded-xl bg-[#eaf3f0] border border-[#b8dbd2] flex items-center justify-center text-[#10383A]">
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
                <p className="text-[#10383A]">NEXT_PUBLIC_SANITY_PROJECT_ID=...</p>
                <p className="text-[#55524b]">NEXT_PUBLIC_SANITY_DATASET=production</p>
                <p className="text-[#55524b]">SANITY_API_WRITE_TOKEN=...</p>
              </div>

              <div className="pt-2 text-[#5c584f] space-y-2 leading-relaxed">
                <p className="font-semibold text-[#1c1d1f]">How this screen works:</p>
                <p>
                  Whenever you publish or edit a product or service, it is <strong>immediately reflected on the main website</strong>.
                </p>
                <p>
                  If you have configured Sanity credentials in <code className="bg-[#f0ebe1] px-1 py-0.5 rounded text-[#10383A]">.env.local</code>, the items are additionally mirrored into your Sanity CMS database automatically!
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
                <div className="w-8 h-8 rounded-lg bg-[#eaf3f0] border border-[#b8dbd2] flex items-center justify-center text-[#10383A]">
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
                  Product Title <span className="text-[#10383A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Luxury Foil Stamped Presentation Boxes"
                  value={prodForm.title}
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                />
              </div>

              {/* Category Tag */}
              <div>
                <label className="block font-semibold text-[#302e29] mb-1.5">Category Tag</label>
                <select
                  value={prodForm.tag}
                  onChange={(e) => setProdForm({ ...prodForm, tag: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] focus:outline-none focus:bg-white focus:border-[#10383A]"
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#10383A]"
                />
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
                  className="px-5 py-2.5 rounded-xl bg-[#10383A] hover:bg-[#164a4d] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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


    </div>
  );
}
