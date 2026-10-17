'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  MessageCircle,
  CheckCircle2,
  Copy,
  Printer,
  RotateCcw,
  ChevronRight,
  Check,
  Eye,
  EyeOff,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { createWhatsAppUrl, getWhatsAppNumber } from '@/context/cart-context';

export type FormState = {
  // Contact Information (Image 2)
  firstName: string;
  lastName: string;
  organisation: string;
  phone: string;
  email: string;
  fax: string;
  city: string;

  // Job Description (Image 2)
  jobTitle: string;
  projectType: string;
  quantity: string;
  sizeWidth: string;
  sizeHeight: string;
  sizeUnit: string;
  sizeFormat: 'Open' | 'Folded';
  numberOfPages: string;
  includingCover: 'Yes' | 'No';

  // Material for Cover (Image 2)
  coverPaperGsm: string;
  coverColour: string;
  coverMetallic: 'Yes' | 'No';
  coverFinish: 'Matt' | 'Gloss' | 'Plain (Maplitho/Creamwove)';
  coverLamination: 'Yes' | 'No';

  // Material for Inside Pages (Image 1)
  insidePaperGsm: string;
  insideColour: string;
  insideMetallic: 'Yes' | 'No';
  insideFinish: 'Matt' | 'Gloss' | 'Plain (Maplitho/Creamwove)';

  // Pre / Post Printing (Image 1)
  fileFormat: string;
  binding: string;
  handsOnDetails: string;

  // Free Form (Image 1)
  freeFormNotes: string;
};

const initialFormState: FormState = {
  // Contact Information
  firstName: '',
  lastName: '',
  organisation: '',
  phone: '',
  email: '',
  fax: '',
  city: '',

  // Job Description
  jobTitle: '',
  projectType: 'Flyer',
  quantity: '',
  sizeWidth: '',
  sizeHeight: '',
  sizeUnit: 'mm',
  sizeFormat: 'Folded',
  numberOfPages: '',
  includingCover: 'Yes',

  // Material for Cover
  coverPaperGsm: '',
  coverColour: '1 colour',
  coverMetallic: 'No',
  coverFinish: 'Matt',
  coverLamination: 'Yes',

  // Material for Inside Pages
  insidePaperGsm: '',
  insideColour: '1 colour',
  insideMetallic: 'No',
  insideFinish: 'Matt',

  // Pre / Post Printing
  fileFormat: '',
  binding: 'None',
  handsOnDetails: '',

  // Free Form
  freeFormNotes: '',
};

const projectTypeOptions = [
  'Flyer',
  'Brochure',
  'Booklet',
  'Annual Reports',
  'Magazine / Publication',
  'Packaging Box',
  'Business Cards',
  'Calendar',
  'Poster',
  'Hard Bound Book',
  'Custom Job',
];

const colourOptions = [
  '1 colour',
  '2 colours',
  '4 colours (CMYK)',
  '5+ colours / Special PMS',
];

const bindingOptions = [
  'None',
  'Saddle Stitch / Stapled',
  'Perfect Binding',
  'Hard Bound',
  'Spiral / Wire-O',
  'Section Sewn',
];

const sizeUnitOptions = [
  { value: 'mm', label: 'mm' },
  { value: 'inches', label: 'inches' },
  { value: 'cm', label: 'cm' },
];

export function QuoteFormClient() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const buildWhatsAppMessage = () => {
    const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(' ') || 'Customer';
    const dimensions = formData.sizeWidth && formData.sizeHeight
      ? `${formData.sizeWidth} × ${formData.sizeHeight} ${formData.sizeUnit} (${formData.sizeFormat})`
      : 'Not specified';

    const lines: string[] = [
      '📋 *PRINT JOB SPECIFICATION & QUOTATION*',
      '*Print One Graphics — Byculla East, Mumbai*',
      '────────────────────────────',
      '👤 *CONTACT INFORMATION*',
      `• First Name: ${formData.firstName || 'Not provided'}`,
      `• Last Name: ${formData.lastName || 'Not provided'}`,
      formData.organisation ? `• Organisation: ${formData.organisation}` : null,
      `• Phone: ${formData.phone || 'Not provided'}`,
      `• Email: ${formData.email || 'Not provided'}`,
      formData.fax ? `• Fax: ${formData.fax}` : null,
      formData.city ? `• City: ${formData.city}` : null,
      '',
      '📄 *JOB DESCRIPTION*',
      formData.jobTitle ? `• Job Title: ${formData.jobTitle}` : '• Job Title: Print Enquiry',
      `• Project Type: ${formData.projectType || 'Flyer'}`,
      `• Quantity: ${formData.quantity || 'Not specified'}`,
      `• Size: ${dimensions}`,
      formData.numberOfPages ? `• Number of Pages: ${formData.numberOfPages}` : null,
      `• Including Cover: ${formData.includingCover}`,
      '',
      '🎨 *MATERIAL FOR COVER*',
      formData.coverPaperGsm ? `• Paper / GSM: ${formData.coverPaperGsm}` : '• Paper / GSM: Standard recommended',
      `• Colour: ${formData.coverColour}`,
      `• Metallic / Special Colour: ${formData.coverMetallic}`,
      `• Finish: ${formData.coverFinish}`,
      `• Lamination: ${formData.coverLamination}`,
      '',
      '📖 *MATERIAL FOR INSIDE PAGES*',
      formData.insidePaperGsm ? `• Paper / GSM: ${formData.insidePaperGsm}` : '• Paper / GSM: Standard recommended',
      `• Colour: ${formData.insideColour}`,
      `• Metallic / Special Colour: ${formData.insideMetallic}`,
      `• Finish: ${formData.insideFinish}`,
      '',
      '⚙️ *PRE / POST PRINTING*',
      formData.fileFormat ? `• Format in which job is stored: ${formData.fileFormat}` : null,
      `• Binding: ${formData.binding}`,
      formData.handsOnDetails ? `• Other hands-on details: ${formData.handsOnDetails}` : null,
      '',
      formData.freeFormNotes
        ? `💬 *FREE FORM / ADDITIONAL DETAILS:*\n${formData.freeFormNotes}\n`
        : null,
      '────────────────────────────',
      '⚡ _Sent via Print One Graphics Specification Form_',
    ].filter((item): item is string => item !== null);

    return lines.join('\n');
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^\d]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    const message = buildWhatsAppMessage();
    const url = createWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleCopy = async () => {
    const message = buildWhatsAppMessage();
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all fields in this form?')) {
      setFormData(initialFormState);
      setErrors({});
      setSubmitted(false);
    }
  };

  const targetNumber = getWhatsAppNumber();

  return (
    <main className="min-h-screen bg-[#faf8f2] text-[#1c1d1f] pb-24 lg:pb-16">
      {/* Top Banner & Breadcrumb */}
      <section className="border-b border-[#e5ded4] bg-[#ede8de] py-6 sm:py-10">
        <div className="page-wrap">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#73716c]">
            <Link href="/" className="hover:text-[#e97819] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#00828a]">Print Specification Form</span>
          </div>

          <div className="mt-3">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1c1d1f]">
              Print Job Specification <span className="text-[#00828a]">&amp; Quote Form</span>
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#615e58]">
              Fill out the required printing, paper, and finishing specifications below.
              All information will be formatted into a structured message and directed to WhatsApp for an instant quote.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form on Left, Sticky WhatsApp Preview on Right */}
      <section className="page-wrap py-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
          {/* Main Form Body */}
          <form
            onSubmit={handleWhatsAppSubmit}
            noValidate
            className="space-y-6 sm:space-y-8"
            aria-label="Print Specification Form"
          >
            {/* Top Teal Accent Card Header */}
            <div className="rounded-xl border border-[#d8d0c6] bg-white shadow-xs overflow-hidden border-t-4 border-t-[#00828a]">
              
              {/* SECTION 1: Contact Information */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#00828a]">
                  Contact Information
                </h2>

                <div className="mt-5 space-y-4">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        First Name <span className="text-[#bd4a3a]">*</span> :
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        placeholder="First Name"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a] ${
                          errors.firstName ? 'border-[#bd4a3a] bg-red-50/30' : 'border-[#cfc9bf] bg-white'
                        }`}
                        data-testid="input-first-name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-[#bd4a3a]">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        Last Name <span className="text-[#bd4a3a]">*</span> :
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        placeholder="Last Name"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a] ${
                          errors.lastName ? 'border-[#bd4a3a] bg-red-50/30' : 'border-[#cfc9bf] bg-white'
                        }`}
                        data-testid="input-last-name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-[#bd4a3a]">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Organisation :
                    </label>
                    <input
                      type="text"
                      value={formData.organisation}
                      onChange={(e) => updateField('organisation', e.target.value)}
                      placeholder="Organisation / Company"
                      className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="input-organisation"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        Phone <span className="text-[#bd4a3a]">*</span> :
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="Phone / Mobile Number"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a] ${
                          errors.phone ? 'border-[#bd4a3a] bg-red-50/30' : 'border-[#cfc9bf] bg-white'
                        }`}
                        data-testid="input-phone"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-[#bd4a3a]">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        Email <span className="text-[#bd4a3a]">*</span> :
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="Email Address"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a] ${
                          errors.email ? 'border-[#bd4a3a] bg-red-50/30' : 'border-[#cfc9bf] bg-white'
                        }`}
                        data-testid="input-email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-[#bd4a3a]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Fax & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        Fax :
                      </label>
                      <input
                        type="text"
                        value={formData.fax}
                        onChange={(e) => updateField('fax', e.target.value)}
                        placeholder="Fax / Landline"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                        data-testid="input-fax"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        City :
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="City"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                        data-testid="input-city"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Job Description */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#00828a]">
                  Job Description
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Job Title */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Job Title :
                    </label>
                    <div className="mt-1.5 flex flex-col sm:flex-row sm:items-center gap-2">
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => updateField('jobTitle', e.target.value)}
                        placeholder="e.g. Annual Reports"
                        className="flex-1 rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                        data-testid="input-job-title"
                      />
                      <span className="text-xs text-[#77736d] shrink-0">
                        e.g. Annual Reports
                      </span>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Project Type :
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => updateField('projectType', e.target.value)}
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="select-project-type"
                    >
                      {projectTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Quantity :
                    </label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => updateField('quantity', e.target.value)}
                      placeholder="Quantity"
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="input-quantity"
                    />
                  </div>

                  {/* Size: Width, Height, Unit dropdown, and Open / Folded radios */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Size :
                    </label>
                    <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-[140px_140px_120px] gap-2.5">
                      <input
                        type="text"
                        value={formData.sizeWidth}
                        onChange={(e) => updateField('sizeWidth', e.target.value)}
                        placeholder="Width"
                        className="rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                        data-testid="input-size-width"
                      />
                      <input
                        type="text"
                        value={formData.sizeHeight}
                        onChange={(e) => updateField('sizeHeight', e.target.value)}
                        placeholder="Height"
                        className="rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                        data-testid="input-size-height"
                      />
                      <div className="col-span-2 sm:col-span-1">
                        <select
                          value={formData.sizeUnit}
                          onChange={(e) => updateField('sizeUnit', e.target.value)}
                          className="w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                          data-testid="select-size-unit"
                        >
                          <option value="">--Select--</option>
                          {sizeUnitOptions.map((unit) => (
                            <option key={unit.value} value={unit.value}>
                              {unit.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Open / Folded Radios */}
                    <div className="mt-2.5 flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="sizeFormat"
                          checked={formData.sizeFormat === 'Open'}
                          onChange={() => updateField('sizeFormat', 'Open')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Open</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="sizeFormat"
                          checked={formData.sizeFormat === 'Folded'}
                          onChange={() => updateField('sizeFormat', 'Folded')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Folded</span>
                      </label>
                    </div>
                  </div>

                  {/* Number of Pages & Including Cover */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        Number of Pages :
                      </label>
                      <input
                        type="text"
                        value={formData.numberOfPages}
                        onChange={(e) => updateField('numberOfPages', e.target.value)}
                        placeholder="Number of Pages"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                        data-testid="input-number-of-pages"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#494a49]">
                        Including Cover :
                      </label>
                      <div className="mt-3 flex items-center gap-6">
                        <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                          <input
                            type="radio"
                            name="includingCover"
                            checked={formData.includingCover === 'Yes'}
                            onChange={() => updateField('includingCover', 'Yes')}
                            className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                          <input
                            type="radio"
                            name="includingCover"
                            checked={formData.includingCover === 'No'}
                            onChange={() => updateField('includingCover', 'No')}
                            className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Material for Cover */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#00828a]">
                  Material for Cover
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Paper / GSM */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Paper / GSM :
                    </label>
                    <input
                      type="text"
                      value={formData.coverPaperGsm}
                      onChange={(e) => updateField('coverPaperGsm', e.target.value)}
                      placeholder="e.g. 300 GSM Art Card"
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="input-cover-paper-gsm"
                    />
                  </div>

                  {/* Colour */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Colour :
                    </label>
                    <select
                      value={formData.coverColour}
                      onChange={(e) => updateField('coverColour', e.target.value)}
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="select-cover-colour"
                    >
                      {colourOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Metallic / Special Colour */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Metallic / Special Colour :
                    </label>
                    <div className="mt-2 flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverMetallic"
                          checked={formData.coverMetallic === 'Yes'}
                          onChange={() => updateField('coverMetallic', 'Yes')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverMetallic"
                          checked={formData.coverMetallic === 'No'}
                          onChange={() => updateField('coverMetallic', 'No')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  {/* Finish */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Finish :
                    </label>
                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverFinish"
                          checked={formData.coverFinish === 'Matt'}
                          onChange={() => updateField('coverFinish', 'Matt')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Matt</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverFinish"
                          checked={formData.coverFinish === 'Gloss'}
                          onChange={() => updateField('coverFinish', 'Gloss')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Gloss</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverFinish"
                          checked={formData.coverFinish === 'Plain (Maplitho/Creamwove)'}
                          onChange={() => updateField('coverFinish', 'Plain (Maplitho/Creamwove)')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Plain (Maplitho/Creamwove)</span>
                      </label>
                    </div>
                  </div>

                  {/* Lamination */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Lamination :
                    </label>
                    <div className="mt-2 flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverLamination"
                          checked={formData.coverLamination === 'Yes'}
                          onChange={() => updateField('coverLamination', 'Yes')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverLamination"
                          checked={formData.coverLamination === 'No'}
                          onChange={() => updateField('coverLamination', 'No')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Material for Inside Pages */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#00828a]">
                  Material for Inside Pages
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Paper / GSM */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Paper / GSM :
                    </label>
                    <input
                      type="text"
                      value={formData.insidePaperGsm}
                      onChange={(e) => updateField('insidePaperGsm', e.target.value)}
                      placeholder="e.g. 130 GSM Art Paper"
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="input-inside-paper-gsm"
                    />
                  </div>

                  {/* Colour */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Colour :
                    </label>
                    <select
                      value={formData.insideColour}
                      onChange={(e) => updateField('insideColour', e.target.value)}
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="select-inside-colour"
                    >
                      {colourOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Metallic / Special Colour */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Metallic / Special Colour :
                    </label>
                    <div className="mt-2 flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="insideMetallic"
                          checked={formData.insideMetallic === 'Yes'}
                          onChange={() => updateField('insideMetallic', 'Yes')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="insideMetallic"
                          checked={formData.insideMetallic === 'No'}
                          onChange={() => updateField('insideMetallic', 'No')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  {/* Finish */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Finish :
                    </label>
                    <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="insideFinish"
                          checked={formData.insideFinish === 'Matt'}
                          onChange={() => updateField('insideFinish', 'Matt')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Matt</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="insideFinish"
                          checked={formData.insideFinish === 'Gloss'}
                          onChange={() => updateField('insideFinish', 'Gloss')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Gloss</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="insideFinish"
                          checked={formData.insideFinish === 'Plain (Maplitho/Creamwove)'}
                          onChange={() => updateField('insideFinish', 'Plain (Maplitho/Creamwove)')}
                          className="h-4 w-4 text-[#00828a] focus:ring-[#00828a]"
                        />
                        <span>Plain (Maplitho/Creamwove)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 5: Pre / Post Printing */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#00828a]">
                  Pre / Post Printing
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Format in which the job is stored */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Format in which the job is stored: <br className="sm:hidden" />
                      <span className="text-[#77736d] font-normal">(PDF, Pagemaker etc) :</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fileFormat}
                      onChange={(e) => updateField('fileFormat', e.target.value)}
                      placeholder="e.g. PDF, Pagemaker, InDesign, CDR, etc."
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="input-file-format"
                    />
                  </div>

                  {/* Binding */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Binding :
                    </label>
                    <select
                      value={formData.binding}
                      onChange={(e) => updateField('binding', e.target.value)}
                      className="mt-1.5 w-full sm:max-w-md rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="select-binding"
                    >
                      {bindingOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Other hands-on details */}
                  <div>
                    <label className="block text-xs font-semibold text-[#494a49]">
                      Other hands-on details :
                    </label>
                    <textarea
                      rows={3}
                      value={formData.handsOnDetails}
                      onChange={(e) => updateField('handsOnDetails', e.target.value)}
                      placeholder="Other hands-on details"
                      className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                      data-testid="textarea-hands-on-details"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 6: Free Form */}
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#00828a]">
                  Free Form
                </h2>

                <div className="mt-5">
                  <label className="block text-xs font-semibold text-[#494a49] leading-relaxed">
                    Provide as much detail as you need for your job or ask us a question using the space below:
                  </label>
                  <textarea
                    rows={4}
                    value={formData.freeFormNotes}
                    onChange={(e) => updateField('freeFormNotes', e.target.value)}
                    placeholder="Provide additional details or ask a question here..."
                    className="mt-2 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#00828a] focus:ring-1 focus:ring-[#00828a]"
                    data-testid="textarea-free-form"
                  />
                </div>

                {/* Submit Button inside Form matching image */}
                <div className="mt-8 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#e8e1d8]">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#00828a] hover:bg-[#006e75] text-white px-8 py-3 text-sm font-bold shadow-sm transition-all cursor-pointer"
                    data-testid="button-submit-form"
                  >
                    <span>Submit</span>
                    <MessageCircle size={17} className="ml-1" fill="currentColor" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-[#cfc9bf] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#494a49] hover:border-[#00828a] hover:text-[#00828a] transition-colors"
                    >
                      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-[#cfc9bf] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#73716c] hover:border-[#1c1d1f] hover:text-[#1c1d1f] transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Confirmation message */}
                {submitted && (
                  <div className="mt-4 rounded border border-[#25D366]/40 bg-[#f0fbf4] p-3.5 text-xs text-[#166534] flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="shrink-0 text-[#25D366] mt-0.5" />
                    <div>
                      <p className="font-bold">WhatsApp Direct Message Ready</p>
                      <p className="text-[#1e7e40] mt-0.5">
                        Your specifications were sent to WhatsApp (+91 {targetNumber.slice(-10)}). You can also click &quot;Copy&quot; above to copy the full specs.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Sticky Sidebar on Desktop / Expandable on Mobile */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* WhatsApp Real-Time Message Preview Card */}
            <div className="rounded-xl border border-[#d8d0c6] bg-white shadow-xs overflow-hidden">
              <div className="bg-[#075e54] px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20 font-bold text-white text-xs">
                    PO
                  </div>
                  <div>
                    <h3 className="text-xs font-bold leading-none">Print One Graphics</h3>
                    <p className="text-[10px] text-white/80 mt-1">Direct WhatsApp Message</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMobilePreview(!showMobilePreview)}
                  className="lg:hidden text-white/90 hover:text-white text-xs flex items-center gap-1"
                >
                  {showMobilePreview ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showMobilePreview ? 'Hide' : 'View'}</span>
                </button>
              </div>

              {/* Chat preview content */}
              <div
                className={`bg-[#efeae2] p-4 text-xs leading-relaxed text-[#111b21] font-mono ${
                  showMobilePreview ? 'block' : 'hidden lg:block'
                }`}
                style={{
                  backgroundImage: `radial-gradient(#00000008 1px, transparent 1px)`,
                  backgroundSize: '12px 12px',
                }}
              >
                <div className="rounded-lg bg-white p-3.5 shadow-2xs border border-black/5 whitespace-pre-wrap font-sans text-[11px] leading-5 max-h-[380px] overflow-y-auto">
                  <div className="font-bold text-[#075e54] text-xs pb-1 border-b border-[#e5ded4] mb-2">
                    📋 PRINT JOB SPECIFICATION
                  </div>
                  {buildWhatsAppMessage()}
                </div>
              </div>

              {/* Action Buttons in Sidebar */}
              <div className="p-3.5 bg-[#faf8f2] border-t border-[#e8e1d8] space-y-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppSubmit()}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                  data-testid="button-sidebar-whatsapp"
                >
                  <MessageCircle size={16} fill="currentColor" />
                  <span>Send via WhatsApp (+91 {targetNumber.slice(-10)})</span>
                </button>
              </div>
            </div>

            {/* Press Facility Contact Details */}
            <div className="rounded-xl border border-[#e5ded4] bg-[#f8f6f0] p-4 text-xs text-[#615e58] space-y-2.5">
              <h4 className="font-bold uppercase tracking-wider text-[#1c1d1f] flex items-center gap-1.5">
                <Printer size={15} className="text-[#00828a]" />
                Byculla Press Team
              </h4>
              <p className="leading-relaxed text-[11px]">
                Byculla Service Industrial Premises, A-Wing, Unit No. 309, Byculla East, Mumbai.
              </p>
              <div className="pt-2 border-t border-[#e5ded4] space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span>Jogendra:</span>
                  <a href="tel:+919594005894" className="font-bold text-[#e97819] hover:underline">
                    +91 95940 05894
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shashank:</span>
                  <a href="tel:+919819124907" className="font-bold text-[#e97819] hover:underline">
                    +91 98191 24907
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Floating Sticky Bottom Bar for Mobile Devices */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[#d8d0c6] bg-[#faf8f2]/95 backdrop-blur-md px-4 py-2.5 shadow-lg lg:hidden flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#494a49] py-2 px-2.5 rounded border border-[#cfc9bf] bg-white"
        >
          {showMobilePreview ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{showMobilePreview ? 'Hide' : 'Preview'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleWhatsAppSubmit()}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 text-xs font-bold shadow-sm transition-all"
          data-testid="button-mobile-floating-whatsapp"
        >
          <MessageCircle size={16} fill="currentColor" />
          <span>Send via WhatsApp</span>
        </button>
      </div>
    </main>
  );
}
