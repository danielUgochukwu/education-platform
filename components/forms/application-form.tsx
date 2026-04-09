"use client";

import React, { useState } from 'react';
import {
    User, GraduationCap, FileText, DollarSign, CheckCircle,
    Upload, ArrowRight, ArrowLeft, AlertCircle
} from 'lucide-react';
import { toast } from "sonner";
import { submitStudentApplication } from '@/lib/supabase/actions';
import { useRouter } from 'next/navigation';

export interface UniversityProgram {
    id: string;
    name: string;
    type?: string;
}

export interface University {
    id: string;
    name: string;
    programs: UniversityProgram[];
}

export default function ApplicationForm({ initialUniversities = [] }: { initialUniversities?: University[] }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        state: '',
        city: '',
        address: '',
        highestQualification: '',
        institutionName: '',
        graduationYear: '',
        gpa: '',
        universityId: '',
        programId: '',
        familyIncomeRange: '',
        fundingNeeded: '',
        otherFunding: '',
        whyNeedFunding: '',
        careerGoals: '',
        whyThisProgram: '',
        transcript: null as File | null,
        certificate: null as File | null,
        recommendationLetter: null as File | null
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

    const steps = [
        { id: 0, title: 'Personal Info', icon: User, description: 'Tell us about yourself' },
        { id: 1, title: 'Education', icon: GraduationCap, description: 'Your academic background' },
        { id: 2, title: 'Program', icon: FileText, description: 'Choose your program' },
        { id: 3, title: 'Financial', icon: DollarSign, description: 'Funding details' },
        { id: 4, title: 'Essays', icon: FileText, description: 'Personal statements' },
        { id: 5, title: 'Documents', icon: Upload, description: 'Upload required files' }
    ];

    const universities = initialUniversities;

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileUpload = (field: string, file: File | null) => {
        if (file) {
            setUploadProgress(prev => ({ ...prev, [field]: 0 }));
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    const newProgress = Math.min((prev[field] || 0) + 10, 100);
                    if (newProgress === 100) clearInterval(interval);
                    return { ...prev, [field]: newProgress };
                });
            }, 200);
            setFormData(prev => ({ ...prev, [field]: file }));
        }
    };

    const validateStep = () => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 0) {
            if (!formData.firstName) newErrors.firstName = 'First name is required';
            if (!formData.lastName) newErrors.lastName = 'Last name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            if (!formData.phone) newErrors.phone = 'Phone is required';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        }

        if (currentStep === 1) {
            if (!formData.highestQualification) newErrors.highestQualification = 'Qualification is required';
            if (!formData.institutionName) newErrors.institutionName = 'Institution name is required';
            if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        }

        if (currentStep === 2) {
            if (!formData.universityId) newErrors.universityId = 'Please select a university';
            if (!formData.programId) newErrors.programId = 'Please select a program';
        }

        if (currentStep === 3) {
            if (!formData.familyIncomeRange) newErrors.familyIncomeRange = 'Income range is required';
            if (!formData.fundingNeeded) newErrors.fundingNeeded = 'Funding amount is required';
        }

        if (currentStep === 4) {
            if (!formData.whyNeedFunding || formData.whyNeedFunding.length < 100) {
                newErrors.whyNeedFunding = 'Please write at least 100 characters';
            }
            if (!formData.careerGoals || formData.careerGoals.length < 100) {
                newErrors.careerGoals = 'Please write at least 100 characters';
            }
            if (!formData.whyThisProgram || formData.whyThisProgram.length < 100) {
                newErrors.whyThisProgram = 'Please write at least 100 characters';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        if (validateStep()) {
            setIsSubmitting(true);
            try {
                const payloadData = new FormData();

                Object.entries(formData).forEach(([key, value]) => {
                    if (value !== null && value !== '') {
                        payloadData.append(key, value as string | Blob);
                    }
                });

                const result = await submitStudentApplication(payloadData);

                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success('Application submitted successfully!');
                    router.push("/dashboard");
                }
            } catch (err) {
                toast.error("Failed to submit application");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const InputField = ({ label, field, type = 'text', placeholder, required = true, options = null as any[] | null }: any) => (
        <div className="mb-6">
            <label className="block text-sm font-medium text-[#2a2520] mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'select' ? (
                <select
                    value={(formData as any)[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#c87941] transition-colors ${errors[field] ? 'border-red-500' : 'border-gray-200'
                        }`}
                >
                    <option value="">Select {label}</option>
                    {options?.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <div>
                    <textarea
                        value={(formData as any)[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        placeholder={placeholder}
                        rows={6}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#c87941] transition-colors resize-none ${errors[field] ? 'border-red-500' : 'border-gray-200'
                            }`}
                    />
                    <div className="text-sm text-gray-500 mt-1">
                        {(formData as any)[field]?.length || 0} / 500 characters (minimum 100)
                    </div>
                </div>
            ) : (
                <input
                    type={type}
                    value={(formData as any)[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#c87941] transition-colors ${errors[field] ? 'border-red-500' : 'border-gray-200'
                        }`}
                />
            )}
            {errors[field] && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    {errors[field]}
                </div>
            )}
        </div>
    );

    const FileUploadField = ({ label, field, accept = '.pdf,.doc,.docx' }: any) => {
        const fieldValue = (formData as any)[field] as File | null;
        return (
            <div className="mb-6">
                <label className="block text-sm font-medium text-[#2a2520] mb-2">
                    {label} <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${fieldValue ? 'border-[#c87941] bg-[#c87941]/5' : 'border-gray-300 hover:border-[#c87941]'
                    }`}>
                    <input
                        type="file"
                        accept={accept}
                        onChange={(e) => handleFileUpload(field, e.target.files ? e.target.files[0] : null)}
                        className="hidden"
                        id={field}
                    />
                    <label htmlFor={field} className="cursor-pointer block w-full h-full">
                        {fieldValue ? (
                            <div>
                                <CheckCircle className="w-8 h-8 text-[#c87941] mx-auto mb-2" />
                                <div className="font-medium text-[#2a2520]">{fieldValue.name}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {uploadProgress[field] === 100 ? 'Uploaded successfully' : `Uploading... ${uploadProgress[field] || 0}%`}
                                </div>
                                {(uploadProgress[field] || 0) < 100 && (
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-[#c87941] h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress[field] || 0}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <div className="font-medium text-[#2a2520]">Click to upload</div>
                                <div className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (max 10MB)</div>
                            </div>
                        )}
                    </label>
                </div>
            </div>
        )
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4">
            {/* Header */}
            <div className="text-center mb-12 border-b pb-8">
                <h1 className="font-serif text-5xl text-[#2a2520] mb-4 font-bold">
                    Scholarship Application
                </h1>
                <p className="text-lg text-gray-600">
                    Take the first step toward your educational dreams
                </p>
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx === currentStep;
                        const isCompleted = idx < currentStep;

                        return (
                            <div key={step.id} className="flex-1 flex items-center">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                        ? 'bg-[#c87941] text-white shadow-md scale-110'
                                        : isCompleted
                                            ? 'bg-[#c87941]/10 text-[#c87941]'
                                            : 'bg-gray-50 text-gray-400 border border-gray-100'
                                        }`}>
                                        {isCompleted ? (
                                            <CheckCircle className="w-6 h-6" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className={`mt-3 text-xs font-semibold uppercase tracking-wider text-center ${isActive ? 'text-[#c87941]' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                                        }`}>
                                        {step.title}
                                    </div>
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className={`flex-1 h-1 mx-2 rounded-full overflow-hidden bg-gray-100`}>
                                        <div className={`h-full transition-all duration-500 ease-in-out ${isCompleted ? 'bg-[#c87941] w-full' : 'w-0'}`} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 mt-4">
                <div className="mb-8 border-b pb-4">
                    <h2 className="font-serif font-bold text-2xl text-[#2a2520] mb-2 flex items-center gap-3">
                        <span className="bg-[#c87941] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                            {currentStep + 1}
                        </span>
                        {steps[currentStep].title}
                    </h2>
                    <p className="text-gray-500 pl-11">{steps[currentStep].description}</p>
                </div>

                {/* Step 0: Personal Information */}
                {currentStep === 0 && (
                    <div className="grid md:grid-cols-2 gap-x-6">
                        <InputField label="First Name" field="firstName" placeholder="John" />
                        <InputField label="Last Name" field="lastName" placeholder="Doe" />
                        <InputField label="Email Address" field="email" type="email" placeholder="john@example.com" />
                        <InputField label="Phone Number" field="phone" placeholder="+234 800 000 0000" />
                        <InputField label="Date of Birth" field="dateOfBirth" type="date" />
                        <InputField
                            label="Gender"
                            field="gender"
                            type="select"
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Prefer not to say' }
                            ]}
                        />
                        <InputField label="State" field="state" placeholder="Lagos" />
                        <InputField label="City" field="city" placeholder="Ikeja" />
                        <div className="md:col-span-2">
                            <InputField label="Home Address" field="address" placeholder="Street address" />
                        </div>
                    </div>
                )}

                {/* Step 1: Education Background */}
                {currentStep === 1 && (
                    <div className="grid md:grid-cols-2 gap-x-6">
                        <InputField
                            label="Highest Qualification"
                            field="highestQualification"
                            type="select"
                            options={[
                                { value: 'ssce', label: 'SSCE / WAEC / NECO' },
                                { value: 'ond', label: 'OND' },
                                { value: 'hnd', label: 'HND' },
                                { value: 'bachelor', label: "Bachelor's Degree" },
                                { value: 'master', label: "Master's Degree" }
                            ]}
                        />
                        <InputField label="Institution Name" field="institutionName" placeholder="University of Lagos" />
                        <InputField
                            label="Graduation Year"
                            field="graduationYear"
                            type="number"
                            placeholder="2024"
                        />
                        <InputField label="GPA / Grade" field="gpa" placeholder="3.5 / First Class" />
                    </div>
                )}

                {/* Step 2: Program Selection */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <InputField
                            label="Select University"
                            field="universityId"
                            type="select"
                            options={universities.map(u => ({ value: u.id, label: u.name }))}
                        />
                        {formData.universityId && (
                            <InputField
                                label="Select Program"
                                field="programId"
                                type="select"
                                options={
                                    universities
                                        .find(u => u.id === formData.universityId)
                                        ?.programs.map((p: any) => ({ value: p.id || p.name, label: p.name })) || []
                                }
                            />
                        )}
                    </div>
                )}

                {/* Step 3: Financial Information */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <InputField
                            label="Family Annual Income Range"
                            field="familyIncomeRange"
                            type="select"
                            options={[
                                { value: 'below-500k', label: 'Below ₦500,000' },
                                { value: '500k-1m', label: '₦500,000 - ₦1,000,000' },
                                { value: '1m-2m', label: '₦1,000,000 - ₦2,000,000' },
                                { value: 'above-2m', label: 'Above ₦2,000,000' }
                            ]}
                        />
                        <InputField
                            label="Funding Amount Needed (₦)"
                            field="fundingNeeded"
                            type="number"
                            placeholder="500000"
                        />
                        <InputField
                            label="Other Funding Sources (if any)"
                            field="otherFunding"
                            type="textarea"
                            placeholder="Describe any other scholarships or funding you have or are applying for..."
                            required={false}
                        />
                    </div>
                )}

                {/* Step 4: Essays */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <InputField
                            label="Why do you need this funding?"
                            field="whyNeedFunding"
                            type="textarea"
                            placeholder="Tell us about your financial situation and why this scholarship is important to you..."
                        />
                        <InputField
                            label="What are your career goals?"
                            field="careerGoals"
                            type="textarea"
                            placeholder="Describe your aspirations and how this education will help you achieve them..."
                        />
                        <InputField
                            label="Why did you choose this program?"
                            field="whyThisProgram"
                            type="textarea"
                            placeholder="Explain why this specific program and university align with your goals..."
                        />
                    </div>
                )}

                {/* Step 5: Documents */}
                {currentStep === 5 && (
                    <div className="space-y-6">
                        <FileUploadField label="Academic Transcript" field="transcript" />
                        <FileUploadField label="Certificate / Diploma" field="certificate" />
                        <FileUploadField label="Recommendation Letter" field="recommendationLetter" />

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-900">
                                    <strong>Required Documents:</strong> All documents must be clear, legible scans or photos.
                                    Maximum file size is 10MB per document. Accepted formats: PDF, DOC, DOCX.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center px-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0 || isSubmitting}
                    className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${currentStep === 0
                        ? 'bg-transparent text-gray-300 cursor-not-allowed invisible'
                        : 'bg-white text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-50'
                        }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                <div className="flex-1" />

                {currentStep < steps.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-[#2a2520] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-black transition-all shadow-md group"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-8 py-3 bg-[#c87941] text-white rounded-lg font-bold flex items-center gap-2 hover:bg-[#b06734] transition-all shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        <CheckCircle className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
