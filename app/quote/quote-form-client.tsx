'use client';

import { useState, useEffect } from 'react';
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
  // Contact Information
  firstName: string;
  lastName: string;
  organisation: string;
  phone: string;
  email: string;
  fax: string;
  city: string;

  // Job Description
  jobTitle: string;
  projectType: string;
  quantity: string;
  sizeWidth: string;
  sizeHeight: string;
  sizeUnit: string;
  sizeFormat: 'Open' | 'Folded';

  // Material for Cover
  coverPaperGsm: string;
  coverColour: string;
  coverLamination: 'Yes' | 'No';

  // Material for Inside Pages
  insidePaperGsm: string;
  insideColour: string;

  // Pre / Post Printing
  fileFormat: string;
  binding: string;
  handsOnDetails: string;

  // Other Custom Inputs
  otherProjectType?: string;
  otherSizeUnit?: string;
  otherCoverColour?: string;
  otherInsideColour?: string;
  otherBinding?: string;

  // Free Form
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

  // Material for Cover
  coverPaperGsm: '',
  coverColour: '1 colour',
  coverLamination: 'Yes',

  // Material for Inside Pages
  insidePaperGsm: '',
  insideColour: '1 colour',

  // Pre / Post Printing
  fileFormat: '',
  binding: 'None',
  handsOnDetails: '',

  // Other Custom Inputs
  otherProjectType: '',
  otherSizeUnit: '',
  otherCoverColour: '',
  otherInsideColour: '',
  otherBinding: '',

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
  'Other',
];

const colourOptions = [
  '1 colour',
  '2 colours',
  '4 colours (CMYK)',
  '5+ colours / Special PMS',
  'Other',
];

const bindingOptions = [
  'None',
  'One Folde',
  'Multiple-Fold',
  'Center Pinning',
  'Perfect Binding',
  'Side Stitching',
  'Spiral Binding',
  'Wiro Binding',
  'Section Sewing',
  'With Hard Bound',
  'Other',
];

const sizeUnitOptions = [
  { value: 'mm', label: 'mm' },
  { value: 'inches', label: 'inches' },
  { value: 'cm', label: 'cm' },
  { value: 'Other', label: 'Other' },
];

export function QuoteFormClient() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service');
      if (serviceParam) {
        setFormData((prev) => ({
          ...prev,
          jobTitle: prev.jobTitle || serviceParam,
          freeFormNotes: prev.freeFormNotes || `Inquiry regarding: ${serviceParam}`,
        }));
      }
    }
  }, []);

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
    const unit =
      formData.sizeUnit === 'Other'
        ? formData.otherSizeUnit?.trim() || 'units'
        : formData.sizeUnit;

    const dimensions =
      formData.sizeWidth && formData.sizeHeight
        ? `${formData.sizeWidth} × ${formData.sizeHeight} ${unit} (${formData.sizeFormat})`
        : 'Not specified';

    const projectTypeDisplay =
      formData.projectType === 'Other'
        ? formData.otherProjectType?.trim() || 'Other'
        : formData.projectType || 'Flyer';

    const coverColourDisplay =
      formData.coverColour === 'Other'
        ? formData.otherCoverColour?.trim() || 'Other'
        : formData.coverColour;

    const insideColourDisplay =
      formData.insideColour === 'Other'
        ? formData.otherInsideColour?.trim() || 'Other'
        : formData.insideColour;

    const bindingDisplay =
      formData.binding === 'Other'
        ? formData.otherBinding?.trim() || 'Other'
        : formData.binding;

    const lines: string[] = [
      '📋 *PRINT JOB SPECIFICATION & QUOTATION*',
      '*Print One Graphics — Byculla East, Mumbai*',
      '────────────────────────────',
      '👤 *CONTACT INFORMATION*',
      `• First Name: ${formData.firstName || 'Not provided'}`,
      `• Last Name: ${formData.lastName || 'Not provided'}`,
      formData.organisation ? `• Organisation: ${formData.organisation}` : null,
      `• Mobile / Phone: ${formData.phone || 'Not provided'}`,
      `• Email: ${formData.email || 'Not provided'}`,
      formData.fax ? `• Fax: ${formData.fax}` : null,
      formData.city ? `• City: ${formData.city}` : null,
      '',
      '📄 *JOB DESCRIPTION*',
      formData.jobTitle ? `• Job Title: ${formData.jobTitle}` : '• Job Title: Print Enquiry',
      `• Project Type: ${projectTypeDisplay}`,
      `• Quantity: ${formData.quantity || 'Not specified'}`,
      `• Size: ${dimensions}`,
      '',
      '🎨 *MATERIAL FOR COVER*',
      formData.coverPaperGsm ? `• Paper / GSM: ${formData.coverPaperGsm}` : '• Paper / GSM: Standard recommended',
      `• Colour: ${coverColourDisplay}`,
      `• Lamination: ${formData.coverLamination}`,
      '',
      '📖 *MATERIAL FOR INSIDE PAGES*',
      formData.insidePaperGsm ? `• Paper / GSM: ${formData.insidePaperGsm}` : '• Paper / GSM: Standard recommended',
      `• Colour: ${insideColourDisplay}`,
      '',
      '⚙️ *PRE / POST PRINTING*',
      formData.fileFormat ? `• Format in which job is stored: ${formData.fileFormat}` : null,
      `• Binding: ${bindingDisplay}`,
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
      newErrors.phone = 'Mobile / Phone number is required';
    } else if (formData.phone.replace(/[^\d]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid mobile / phone number';
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
            <Link href="/" className="hover:text-[#10383A] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#10383A]">Print Specification Form</span>
          </div>

          <div className="mt-3">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1c1d1f]">
              Print Job Specification <span className="text-[#10383A]">&amp; Quote Form</span>
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
            {/* Top Brand Accent Card */}
            <div className="relative rounded-xl border border-[#d8d0c6] bg-white shadow-xs overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#10383A] via-[#666E51] to-[#DAA112]" />

              {/* SECTION 1: Contact Information */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#10383A]">
                  Contact Information
                </h2>

                <div className="mt-5 space-y-4">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>
                          First Name <span className="text-[#bd4a3a]">*</span> :
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        placeholder="First Name"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] ${
                          errors.firstName ? 'border-[#bd4a3a] bg-red-50/30' : 'border-[#cfc9bf] bg-white'
                        }`}
                        data-testid="input-first-name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-[#bd4a3a]">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>
                          Last Name <span className="text-[#bd4a3a]">*</span> :
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        placeholder="Last Name"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] ${
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
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                      <span className="text-[#DAA112] font-bold">▸</span>
                      <span>Organisation :</span>
                    </label>
                    <input
                      type="text"
                      value={formData.organisation}
                      onChange={(e) => updateField('organisation', e.target.value)}
                      placeholder="Organisation / Company"
                      className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                      data-testid="input-organisation"
                    />
                  </div>

                  {/* Mobile/Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <Phone size={13} className="text-[#10383A]" />
                        <span>
                          Mobile / Phone <span className="text-[#bd4a3a]">*</span> :
                        </span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="Mobile or Phone Number"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] ${
                          errors.phone ? 'border-[#bd4a3a] bg-red-50/30' : 'border-[#cfc9bf] bg-white'
                        }`}
                        data-testid="input-phone"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-[#bd4a3a]">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>
                          Email <span className="text-[#bd4a3a]">*</span> :
                        </span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="Email Address"
                        className={`mt-1.5 w-full rounded border px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] ${
                          errors.email ? 'border-[#bd4a3a] bg-red-50/30' : 'border-[#cfc9bf] bg-white'
                        }`}
                        data-testid="input-email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-[#bd4a3a]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Fax / Landline & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Fax / Landline :</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fax}
                        onChange={(e) => updateField('fax', e.target.value)}
                        placeholder="Fax / Landline"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="input-fax"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>City :</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="City"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="input-city"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Job Description */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#10383A]">
                  Job Description
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Job Title & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Job Title :</span>
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => updateField('jobTitle', e.target.value)}
                        placeholder="e.g. Annual Reports"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="input-job-title"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Project Type :</span>
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => updateField('projectType', e.target.value)}
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="select-project-type"
                      >
                        {projectTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {formData.projectType === 'Other' && (
                        <input
                          type="text"
                          value={formData.otherProjectType || ''}
                          onChange={(e) => updateField('otherProjectType', e.target.value)}
                          placeholder="Please specify project type..."
                          className="mt-2 w-full rounded border border-[#10383A] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] animate-in fade-in duration-200"
                          data-testid="input-other-project-type"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>

                  {/* Quantity & Size IN ONE ROW (Reduced width & compact row) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-1">
                    {/* Quantity */}
                    <div className="md:col-span-4">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Quantity :</span>
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => updateField('quantity', e.target.value)}
                        placeholder="e.g. 1000"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="input-quantity"
                      />
                    </div>

                    {/* Size: Width, Height, Unit dropdown, and Open / Folded radios */}
                    <div className="md:col-span-8">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Size :</span>
                      </label>
                      <div className="mt-1.5 flex flex-wrap sm:flex-nowrap items-center gap-2">
                        <input
                          type="text"
                          value={formData.sizeWidth}
                          onChange={(e) => updateField('sizeWidth', e.target.value)}
                          placeholder="Width"
                          className="w-full sm:w-24 rounded border border-[#cfc9bf] bg-white px-2.5 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                          data-testid="input-size-width"
                        />
                        <span className="hidden sm:inline text-xs text-[#77736d] font-bold">×</span>
                        <input
                          type="text"
                          value={formData.sizeHeight}
                          onChange={(e) => updateField('sizeHeight', e.target.value)}
                          placeholder="Height"
                          className="w-full sm:w-24 rounded border border-[#cfc9bf] bg-white px-2.5 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                          data-testid="input-size-height"
                        />
                        <select
                          value={formData.sizeUnit}
                          onChange={(e) => updateField('sizeUnit', e.target.value)}
                          className="w-full sm:w-24 rounded border border-[#cfc9bf] bg-white px-2 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                          data-testid="select-size-unit"
                        >
                          {sizeUnitOptions.map((unit) => (
                            <option key={unit.value} value={unit.value}>
                              {unit.label}
                            </option>
                          ))}
                        </select>

                        {/* Open / Folded Radios */}
                        <div className="flex items-center gap-3 shrink-0 ml-1 py-1">
                          <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer text-[#333]">
                            <input
                              type="radio"
                              name="sizeFormat"
                              checked={formData.sizeFormat === 'Open'}
                              onChange={() => updateField('sizeFormat', 'Open')}
                              className="h-3.5 w-3.5 text-[#10383A] focus:ring-[#10383A]"
                            />
                            <span>Open</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer text-[#333]">
                            <input
                              type="radio"
                              name="sizeFormat"
                              checked={formData.sizeFormat === 'Folded'}
                              onChange={() => updateField('sizeFormat', 'Folded')}
                              className="h-3.5 w-3.5 text-[#10383A] focus:ring-[#10383A]"
                            />
                            <span>Folded</span>
                          </label>
                        </div>
                      </div>

                      {formData.sizeUnit === 'Other' && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={formData.otherSizeUnit || ''}
                            onChange={(e) => updateField('otherSizeUnit', e.target.value)}
                            placeholder="Please specify unit (e.g. ft, pt, px)..."
                            className="w-full sm:w-64 rounded border border-[#10383A] bg-white px-3 py-1.5 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] animate-in fade-in duration-200"
                            data-testid="input-other-size-unit"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Material for Cover */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#10383A]">
                  Material for Cover
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Paper GSM and Colour in ONE ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Paper / GSM :</span>
                      </label>
                      <input
                        type="text"
                        value={formData.coverPaperGsm}
                        onChange={(e) => updateField('coverPaperGsm', e.target.value)}
                        placeholder="e.g. 300 GSM Art Card"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="input-cover-paper-gsm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Colour :</span>
                      </label>
                      <select
                        value={formData.coverColour}
                        onChange={(e) => updateField('coverColour', e.target.value)}
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="select-cover-colour"
                      >
                        {colourOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {formData.coverColour === 'Other' && (
                        <input
                          type="text"
                          value={formData.otherCoverColour || ''}
                          onChange={(e) => updateField('otherCoverColour', e.target.value)}
                          placeholder="Please specify cover colour..."
                          className="mt-2 w-full rounded border border-[#10383A] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] animate-in fade-in duration-200"
                          data-testid="input-other-cover-colour"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>

                  {/* Lamination (compact inline row) */}
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                      <span className="text-[#DAA112] font-bold">▸</span>
                      <span>Lamination :</span>
                    </label>
                    <div className="flex items-center gap-5">
                      <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverLamination"
                          checked={formData.coverLamination === 'Yes'}
                          onChange={() => updateField('coverLamination', 'Yes')}
                          className="h-4 w-4 text-[#10383A] focus:ring-[#10383A]"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer text-[#333]">
                        <input
                          type="radio"
                          name="coverLamination"
                          checked={formData.coverLamination === 'No'}
                          onChange={() => updateField('coverLamination', 'No')}
                          className="h-4 w-4 text-[#10383A] focus:ring-[#10383A]"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Material for Inside Pages */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#10383A]">
                  Material for Inside Pages
                </h2>

                <div className="mt-5">
                  {/* Paper GSM and Colour in ONE ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Paper / GSM :</span>
                      </label>
                      <input
                        type="text"
                        value={formData.insidePaperGsm}
                        onChange={(e) => updateField('insidePaperGsm', e.target.value)}
                        placeholder="e.g. 130 GSM Art Paper"
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="input-inside-paper-gsm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Colour :</span>
                      </label>
                      <select
                        value={formData.insideColour}
                        onChange={(e) => updateField('insideColour', e.target.value)}
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="select-inside-colour"
                      >
                        {colourOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {formData.insideColour === 'Other' && (
                        <input
                          type="text"
                          value={formData.otherInsideColour || ''}
                          onChange={(e) => updateField('otherInsideColour', e.target.value)}
                          placeholder="Please specify inside colour..."
                          className="mt-2 w-full rounded border border-[#10383A] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] animate-in fade-in duration-200"
                          data-testid="input-other-inside-colour"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 5: Pre / Post Printing */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-[#e8e1d8]">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#10383A]">
                  Pre / Post Printing
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Format & Binding in ONE ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>
                          Job Format <span className="text-[#77736d] font-normal">(PDF, CDR etc.)</span> :
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.fileFormat}
                        onChange={(e) => updateField('fileFormat', e.target.value)}
                        placeholder="e.g. PDF, InDesign, CDR, etc."
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="input-file-format"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                        <span className="text-[#DAA112] font-bold">▸</span>
                        <span>Binding :</span>
                      </label>
                      <select
                        value={formData.binding}
                        onChange={(e) => updateField('binding', e.target.value)}
                        className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                        data-testid="select-binding"
                      >
                        {bindingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {formData.binding === 'Other' && (
                        <input
                          type="text"
                          value={formData.otherBinding || ''}
                          onChange={(e) => updateField('otherBinding', e.target.value)}
                          placeholder="Please specify binding method..."
                          className="mt-2 w-full rounded border border-[#10383A] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A] animate-in fade-in duration-200"
                          data-testid="input-other-binding"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>

                  {/* Other hands-on details */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A]">
                      <span className="text-[#DAA112] font-bold">▸</span>
                      <span>Other hands-on details :</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.handsOnDetails}
                      onChange={(e) => updateField('handsOnDetails', e.target.value)}
                      placeholder="Other hands-on details"
                      className="mt-1.5 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                      data-testid="textarea-hands-on-details"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 6: Free Form */}
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#10383A]">
                  Free Form
                </h2>

                <div className="mt-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#10383A] leading-relaxed">
                    <span className="text-[#DAA112] font-bold">▸</span>
                    <span>Provide as much detail as you need for your job or ask us a question:</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.freeFormNotes}
                    onChange={(e) => updateField('freeFormNotes', e.target.value)}
                    placeholder="Provide additional details or ask a question here..."
                    className="mt-2 w-full rounded border border-[#cfc9bf] bg-white px-3 py-2 text-base sm:text-sm transition-colors focus:border-[#10383A] focus:ring-1 focus:ring-[#10383A]"
                    data-testid="textarea-free-form"
                  />
                </div>

                {/* Submit Button inside Form */}
                <div className="mt-8 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#e8e1d8]">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#10383A] hover:bg-[#0c2b2c] text-white px-8 py-3 text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer rounded-sm"
                    data-testid="button-submit-form"
                  >
                    <span>Submit</span>
                    <MessageCircle size={17} className="ml-1" fill="currentColor" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-[#cfc9bf] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#494a49] hover:border-[#10383A] hover:text-[#10383A] transition-colors rounded-sm"
                    >
                      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-[#cfc9bf] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#73716c] hover:border-[#1c1d1f] hover:text-[#1c1d1f] transition-colors rounded-sm"
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
              <div className="bg-[#10383A] px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-white/15 font-bold text-white text-xs">
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
                  <div className="font-bold text-[#10383A] text-xs pb-1 border-b border-[#e5ded4] mb-2">
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer rounded-sm"
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
                <Printer size={15} className="text-[#10383A]" />
                Byculla Press Team
              </h4>
              <p className="leading-relaxed text-[11px]">
                Byculla Service Industrial Premises, A-Wing, Unit No. 309, Byculla East, Mumbai.
              </p>
              <div className="pt-2 border-t border-[#e5ded4] space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span>Jogendra:</span>
                  <a href="tel:+919594005894" className="font-bold text-[#10383A] hover:underline">
                    +91 95940 05894
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shashank:</span>
                  <a href="tel:+919819124907" className="font-bold text-[#10383A] hover:underline">
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
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 text-xs font-bold shadow-sm transition-all rounded-sm"
          data-testid="button-mobile-floating-whatsapp"
        >
          <MessageCircle size={16} fill="currentColor" />
          <span>Send via WhatsApp</span>
        </button>
      </div>
    </main>
  );
}
