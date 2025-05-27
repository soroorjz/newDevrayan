import "./ContactUs.scss";
const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-us-top">
        <div className="info-section">
          <div className="info-card">
            <div className="infoCardTitle">
              <span className="icon">شماره تماس:📞</span>
              <span className="text">۰۲۶-۳۴۱۶۴۰۳۰ </span>
            </div>
          </div>
          <div className="info-card">
            <div className="infoCardTitle">
              <span className="icon"> ایمیل: ✉️</span>
              <span className="text">info@rayanegan.com</span>
            </div>
          </div>
          <div className="info-card">
            <div className="infoCardTitle">
              <span className="icon"> نشانی: 📍</span>
              <span className="text">کرج، آزادگان </span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="contactUsFormTop">
            <input type="email" placeholder="ایمیل" className="input email" />
            <input
              type="text"
              placeholder="شماره تماس"
              className="input phone"
            />
          </div>
          <input type="text" placeholder="نام" className="input name" />
          <textarea placeholder="پیام شما" className="input message"></textarea>
          <button className="submit-btn">ارسال</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
