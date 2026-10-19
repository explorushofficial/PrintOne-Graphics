'use client';

import { useState, useRef } from 'react';
import { UploadCloud, Check, Loader2, Trash2 } from 'lucide-react';

interface AdminImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string, assetId?: string) => void;
  presetList?: { name: string; url: string }[];
}

export function AdminImageUploader({
  label,
  value,
  onChange,
}: AdminImageUploaderProps) {
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
    <div className="space-y-2">
      <label className="block font-semibold text-[#302e29] text-xs">
        {label}
      </label>

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

      {/* Direct File Upload Zone */}
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
                <span className="text-xs font-bold">Uploading image to Sanity CMS...</span>
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
                  Upload directly from your computer (PNG, JPG, WEBP, SVG)
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Uploaded Photo Preview */
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

      {uploadError && (
        <p className="text-[11px] text-[#dc2626] font-medium">{uploadError}</p>
      )}
    </div>
  );
}
