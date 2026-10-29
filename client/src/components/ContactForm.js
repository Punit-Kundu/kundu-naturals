import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [submitMessage, setSubmitMessage] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'नाम आवश्यक है';
        if (value.trim().length < 2) return 'नाम कम से कम 2 अक्षर का होना चाहिए';
        if (value.trim().length > 100) return 'नाम 100 अक्षरों से अधिक नहीं होना चाहिए';
        return '';
      case 'phone': {
        if (!value.trim()) return 'फोन नंबर आवश्यक है';
        const digits = value.replace(/\D/g, '');
        if (!/^[\d\s\-+()]+$/.test(value) || digits.length < 10 || digits.length > 15) {
          return 'मान्य फोन नंबर दर्ज करें';
        }
        return '';
      }
      case 'email':
        if (!value.trim()) return 'ईमेल आवश्यक है';
        if (value.length > 254) return 'ईमेल 254 अक्षरों से अधिक नहीं होना चाहिए';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'मान्य ईमेल दर्ज करें';
        return '';
      case 'subject':
        if (!value.trim()) return 'विषय आवश्यक है';
        if (value.trim().length < 3) return 'विषय कम से कम 3 अक्षर का होना चाहिए';
        if (value.trim().length > 150) return 'विषय 150 अक्षरों से अधिक नहीं होना चाहिए';
        return '';
      case 'message':
        if (!value.trim()) return 'संदेश आवश्यक है';
        if (value.trim().length < 10) return 'संदेश कम से कम 10 अक्षर का होना चाहिए';
        if (value.trim().length > 5000) return 'संदेश 5000 अक्षरों से अधिक नहीं होना चाहिए';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setSubmitMessage('');
    }
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    setSubmitMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setSubmitMessage(data.message || 'आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        setTouched({});
      } else {
        if (data.errors) {
          setErrors((previous) => ({ ...previous, ...data.errors }));
          setTouched((previous) => ({
            ...previous,
            ...Object.keys(data.errors).reduce((fields, field) => ({ ...fields, [field]: true }), {}),
          }));
        }
        setStatus('error');
        setSubmitMessage(data.message || 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।');
      }
    } catch (error) {
      setStatus('error');
      setSubmitMessage('नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।');
      console.error('Contact form submission failed:', error);
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setSubmitMessage('');
  };

  const fields = [
    { name: 'name', label: 'पूरा नाम', type: 'text', placeholder: 'आपका पूरा नाम', icon: 'user', maxLength: 100, autoComplete: 'name' },
    { name: 'phone', label: 'फोन नंबर', type: 'tel', placeholder: '+91 98765 43210', icon: 'phone', maxLength: 25, autoComplete: 'tel' },
    { name: 'email', label: 'ईमेल', type: 'email', placeholder: 'आपका@ईमेल.com', icon: 'mail', maxLength: 254, autoComplete: 'email' },
    { name: 'subject', label: 'विषय', type: 'text', placeholder: 'आपकी पूछताछ का विषय', icon: 'tag', maxLength: 150 },
  ];

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label text-hindi">
              {field.label} <span className="required" aria-hidden="true">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                {field.icon === 'user' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                {field.icon === 'phone' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                {field.icon === 'mail' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                {field.icon === 'tag' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>}
              </span>
              <input
                type={field.type}
                maxLength={field.maxLength}
                autoComplete={field.autoComplete}
                id={field.name}
                name={field.name}
                className={`form-input ${errors[field.name] && touched[field.name] ? 'error' : ''}`}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors[field.name] && touched[field.name] ? 'true' : 'false'}
                aria-describedby={errors[field.name] && touched[field.name] ? `${field.name}-error` : undefined}
                disabled={status === 'submitting'}
              />
            </div>
            {errors[field.name] && touched[field.name] && (
              <span id={`${field.name}-error`} className="form-error" role="alert">
                <AlertCircle width="14" height="14" aria-hidden="true" />
                {errors[field.name]}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label text-hindi">
          संदेश <span className="required" aria-hidden="true">*</span>
        </label>
        <div className="input-wrapper">
          <span className="input-icon input-icon-top" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </span>
          <textarea
            id="message"
            name="message"
            className={`form-textarea ${errors.message && touched.message ? 'error' : ''}`}
            placeholder="अपना संदेश यहाँ लिखें..."
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.message && touched.message ? 'true' : 'false'}
            aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
            disabled={status === 'submitting'}
            rows={5}
            maxLength={5000}
          />
        </div>
        {errors.message && touched.message && (
          <span id="message-error" className="form-error" role="alert">
            <AlertCircle width="14" height="14" aria-hidden="true" />
            {errors.message}
          </span>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary btn-lg form-submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 width="20" height="20" className="spinning" aria-hidden="true" />
              <span>भेजा जा रहा है...</span>
            </>
          ) : (
            <>
              <Send width="20" height="20" aria-hidden="true" />
              <span>संदेश भेजें</span>
            </>
          )}
        </button>

        {status === 'success' && (
          <button type="button" className="btn btn-outline btn-lg" onClick={resetForm}>
            <span>नया संदेश लिखें</span>
          </button>
        )}
      </div>

      {(status === 'success' || status === 'error') && (
        <motion.div
          className={`form-status ${status}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="polite"
        >
          <div className="status-content">
            {status === 'success' ? (
              <CheckCircle width="24" height="24" aria-hidden="true" />
            ) : (
              <AlertCircle width="24" height="24" aria-hidden="true" />
            )}
            <p className="text-hindi">{submitMessage}</p>
          </div>
        </motion.div>
      )}
    </form>
  );
}

export default ContactForm;