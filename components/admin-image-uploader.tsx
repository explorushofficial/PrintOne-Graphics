'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Check, X, Loader2, Trash2 } from 'lucide-react';

interface AdminImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string, assetId?: string) => void;
  presetList?: { name: string; url: string }[];
}

const DEFAULT_PRESETS = [
  { name: 'Brochures', url: '/catalog/brochures.jpg' },
  { name: 'Boxes', url: '/catalog/packaging-boxes.jpg' },
  { name: 'Notebooks', url: '/catalog/notebooks.jpg' },
  { name: 'Catalogues', url: '/catalog/product-catalogues.jpg' },
  { name: 'Diaries', url: '/catalog/diaries.jpg' },
  { name: 'Annual Report', url: '/annual-report.jpg' },
];

export function AdminImageUploader({
  label,
  value,
  onChange,
  presetList = DEFAULT_PRESETS,
}: AdminImageUploaderProps) {
  const [tab, setTab] = useState<'upload' | 'preset'>('upload');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url, data.sanityAssetId);
      } else {
        setUploadError(data.error || 'Failed to upload image directly to Sanity CMS.');
      }
    } catch {
      setUploadError('Network error uploading image to Sanity.');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-[#302e29] text-xs">
          {label}
        </label>
        <div className="flex items-center gap-1 text-[11px] bg-[#f5efe6] p-0.5 rounded-lg border border-[#e5dfd4]">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              tab === 'upload'
                ? 'bg-white text-[#10383A] shadow-2xs'
                : 'text-[#6e6a60] hover:text-[#1c1d1f]'
            }`}
          >
            Upload from Computer
          </button>
          <button
            type="button"
            onClick={() => setTab('preset')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              tab === 'preset'
                ? 'bg-white text-[#10383A] shadow-2xs'
                : 'text-[#6e6a60] hover:text-[#1c1d1f]'
            }`}
          >
            Or Presets / URL
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* Mode 1: Direct File Upload Zone */}
      {tab === 'upload' && (
        <div>
          {!value ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                dragOver
                  ? 'border-[#10383A] bg-[#f0f7f5]'
                  : 'border-[#ded7cb] bg-[#faf8f2] hover:border-[#10383A] hover:bg-white'
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center justify-center py-3 text-[#10383A]">
                  <Loader2 size={24} className="animate-spin mb-1.5" />
                  <span className="text-xs font-bold">Uploading image...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-11 h-11 rounded-full bg-[#eaf3f0] border border-[#b8dbd2] flex items-center justify-center text-[#10383A] mb-2 shadow-2xs">
                    <UploadCloud size={22} />
                  </div>
                  <p className="text-xs font-bold text-[#1c1d1f]">
                    Click to select photo <span className="font-normal text-[#6e6a60]">or drag and drop here</span>
                  </p>
                  <p className="text-[10px] text-[#8c877d] mt-1">
                    Supports PNG, JPG, WEBP, SVG
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Uploaded Photo Preview (Only shown after the user uploads/selects a photo) */
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] shadow-2xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-14 rounded-lg bg-white border border-[#86efac] overflow-hidden shrink-0 shadow-xs">
                  <img
                    src={value}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-white px-2 py-0.5 rounded border border-[#86efac]">
                    <Check size={11} className="text-[#16a34a]" /> Photo Uploaded
                  </span>
                  <p className="text-[11px] font-mono text-[#15803d] truncate mt-1">{value}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 text-xs font-bold text-[#15803d] bg-white border border-[#86efac] hover:bg-[#dcfce7] rounded-lg transition-colors cursor-pointer"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 text-[#991b1b] hover:bg-[#fee2e2] rounded-lg transition-colors cursor-pointer"
                  title="Remove uploaded photo"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Presets & Manual URL */}
      {tab === 'preset' && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="/catalog/brochures.jpg or https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-[#faf8f2] border border-[#dcd5c7] text-[#1c1d1f] text-xs placeholder-[#938e83] focus:outline-none focus:bg-white focus:border-[#10383A]"
          />

          <div>
            <p className="text-[11px] font-semibold text-[#6e6a60] mb-1.5">Preset Samples:</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetList.map((p) => {
                const isSelected = value === p.url;
                return (
                  <button
                    type="button"
                    key={p.url}
                    onClick={() => onChange(p.url)}
                    className={`group relative rounded-lg border overflow-hidden p-1 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#10383A] ring-2 ring-[#10383A]/30 bg-[#eaf3f0]'
                        : 'border-[#e5dfd4] bg-[#faf8f2] hover:border-[#c5beaf]'
                    }`}
                  >
                    <div className="aspect-square w-full rounded bg-[#ede7dc] overflow-hidden">
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="block mt-1 text-[10px] font-bold text-[#3d3a33] truncate">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {value && (
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#faf8f2] border border-[#e5dfd4] text-[11px]">
              <span className="text-[#6e6a60] truncate font-mono">{value}</span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-[#dc2626] hover:underline font-bold ml-2 shrink-0 cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-[11px] text-[#dc2626] font-medium">{uploadError}</p>
      )}
    </div>
  );
}
