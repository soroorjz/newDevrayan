import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCcw } from 'lucide-react';
import './PaymentGateway.scss';
import Receipt from '../SignUpFormComp/SignUpStepper/Receipt/Receipt';

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv2, setCvv2] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [internetPassword, setInternetPassword] = useState('');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 4); // 14:04 in seconds
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCardNumberChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) setCardNumber(value);
  }, []);

  const formatCardNumber = useCallback((value) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/;
    const onlyNumbers = value.replace(/\D/g, '');
    return onlyNumbers.replace(regex, (_, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter((group) => group).join(' ')
    );
  }, []);

  const refreshCaptcha = useCallback(() => {
    console.log('Refreshing captcha...');
  }, []);

  const handlePayment = useCallback(() => {
    console.log('Processing payment...');
    setShowReceipt(true);
  }, []);

  const handleCancel = useCallback(() => {
    console.log('Payment cancelled...');
  }, []);

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  return (
    <div className="payment-gateway">
      <header className="header">
        <div className="logo-left">
          <img src="https://www.behpardakht.com/wp-content/uploads/2022/10/logo-1.png" alt="Behpardakht Logo" />
        </div>
        <h1 className="title">پرداخت اینترنتی به‌پرداخت ملت</h1>
        <div className="logo-right">
          <img src="https://www.behpardakht.com/wp-content/uploads/2022/10/mellat-logo.png" alt="Bank Mellat Logo" />
        </div>
      </header>

      <section className="content">
        <div className="tabs" role="tablist">
          <button className="tab active" role="tab" aria-selected="true">اطلاعات کارت</button>
          <button className="tab" role="tab" aria-selected="false">اطلاعات پذیرنده</button>
        </div>

        <div className="timer">
          <span className="timer-label">زمان باقی مانده: </span>
          <span className="timer-value">{formatTime(timeLeft)}</span>
        </div>

        <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-container">
            <div className="left-section">
              <div className="merchant-info">
                <div className="info-row">
                  <span className="label">نام پذیرنده: </span>
                  <span className="value">رایان پی</span>
                </div>
                <div className="info-row">
                  <span className="label">شماره پذیرنده:</span>
                  <span className="value">2374257</span>
                </div>
                <div className="info-row">
                  <span className="label">شماره ترمینال:</span>
                  <span className="value">5841895</span>
                </div>
                <div className="info-row">
                  <span className="label">آدرس وب‌سایت:</span>
                  <span className="value website">
                    <a href="https://store.dashtclub.ir" target="_blank" rel="noopener noreferrer">
                      https://store.dashtclub.ir
                    </a>
                  </span>
                </div>
                <div className="payment-amount">
                  <span className="amount-label">مبلغ قابل پرداخت:</span>
                  <span className="amount-value">
                    3,000,000 <span className="currency">ریال</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="right-section">
              <div className="form-group">
                <label htmlFor="card-number" className="form-label">شماره کارت</label>
                <div className="form-field card-number">
                  <div className="card-icon" aria-hidden="true" />
                  <input
                    id="card-number"
                    type="text"
                    value={formatCardNumber(cardNumber)}
                    onChange={handleCardNumberChange}
                    placeholder="شماره 16 رقمی درج شده روی کارت را وارد نمایید"
                    dir="ltr"
                    maxLength={19}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cvv2" className="form-label">شماره شناسایی دوم (CVV2)</label>
                <div className="form-field">
                  <input
                    id="cvv2"
                    type="password"
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="شماره 3 تا 4 رقمی درج شده روی کارت را وارد نمایید"
                    dir="ltr"
                    maxLength={4}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">تاریخ انقضای کارت</label>
                <div className="form-field expiry-date">
                  <div className="expiry-inputs">
                    <select value={month} onChange={(e) => setMonth(e.target.value)} className="month-select" aria-label="ماه انقضا" required>
                      <option value="" disabled>ماه</option>
                      {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>)}
                    </select>
                    <select value={year} onChange={(e) => setYear(e.target.value)} className="year-select" aria-label="سال انقضا" required>
                      <option value="" disabled>سال</option>
                      {Array.from({ length: 10 }, (_, i) => <option key={i} value={new Date().getFullYear() + i - 2000}>{new Date().getFullYear() + i - 2000}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="captcha" className="form-label">کد امنیتی</label>
                <div className="form-field captcha-container">
                  <input
                    id="captcha"
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    placeholder="لطفا کد امنیتی داخل کادر را وارد نمایید"
                    dir="ltr"
                    required
                    aria-required="true"
                  />
                  <div className="captcha-box">
                    <img src="https://via.placeholder.com/150x50?text=59652" alt="تصویر کد امنیتی" className="captcha-image" />
                    <button type="button" className="refresh-captcha" onClick={refreshCaptcha} aria-label="تازه‌سازی کد امنیتی">
                      <RefreshCcw size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="internet-password" className="form-label">رمز اینترنتی کارت</label>
                <div className="form-field">
                  <input
                    id="internet-password"
                    type="password"
                    value={internetPassword}
                    onChange={(e) => setInternetPassword(e.target.value)}
                    placeholder="رمز اینترنتی را وارد نمایید"
                    dir="ltr"
                    required
                    aria-required="true"
                  />
                  <button type="button" className="otp-button" aria-label="دریافت رمز پویا">
                    <span>دریافت رمز پویا</span>
                    <span className="otp-icon" aria-hidden="true">✉️</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">ایمیل</label>
                <div className="form-field">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="لطفا ایمیل معتبر وارد کنید (اختیاری)"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="action-buttons">
                <button type="button" className="pay-button" onClick={handlePayment}>پرداخت</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>انصراف</button>
              </div>
            </div>
          </div>
        </form>

        {showReceipt && (
          <div className="modal-overlay" onClick={handleCloseReceipt}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Receipt onClose={handleCloseReceipt} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PaymentGateway;