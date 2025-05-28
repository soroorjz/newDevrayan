import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../../AuthContext";
import "./RegistrationModals.scss";

const MySwal = withReactContent(Swal);

const RegistrationModals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // تعریف شغل‌های کلیدی برای هر حوزه کلیدی
  const keyJobsByDomain = {
    "نفت و انرژی": ["مهندس نفت", "کارشناس بهره‌برداری", "مدیر پروژه انرژی", "تحلیلگر انرژی"],
    "سلامت و رفاه اجتماعی": ["کارشناس سلامت عمومی", "مدیر بیمارستان", "مشاور رفاه اجتماعی", "پژوهشگر سلامت"],
    "سیاسی، روابط بین‌الملل و دیپلماسی": ["دیپلمات", "کارشناس روابط بین‌الملل", "تحلیلگر سیاسی", "مشاور سیاست خارجی"],
    "اقتصاد، بانکداری و بیمه": ["کارشناس اقتصادی", "مدیر بانک", "تحلیلگر بیمه", "مشاور مالی"],
    "فناوری اطلاعات و ارتباطات": ["مهندس نرم‌افزار", "کارشناس امنیت سایبری", "مدیر پروژه فناوری", "تحلیلگر داده"],
    "فرهنگ، جوانان و گردشگری": ["کارشناس فرهنگی", "مدیر گردشگری", "برنامه‌ریز رویدادهای جوانان", "مشاور فرهنگی"],
    "صنعت و معدن": ["مهندس معدن", "کارشناس تولید صنعتی", "مدیر کارخانه", "تحلیلگر زنجیره تأمین"],
    "برنامه و بودجه": ["کارشناس بودجه‌ریزی", "تحلیلگر برنامه‌ریزی", "مدیر مالی پروژه", "مشاور برنامه‌ریزی"],
    "آموزش، علوم و فناوری": ["پژوهشگر آموزشی", "کارشناس فناوری آموزشی", "استاد دانشگاه", "مدیر مرکز تحقیقاتی"],
    "حکمرانی، نظام اداری و مدیریت شرکتی": ["کارشناس مدیریت دولتی", "مشاور نظام اداری", "مدیر ارشد سازمان", "تحلیلگر سیاست‌گذاری"],
    "امور زیربنایی و حمل و نقل": ["مهندس عمران", "کارشناس حمل و نقل", "مدیر پروژه زیرساختی", "برنامه‌ریز شهری"],
    "محیط زیست و کشاورزی": ["کارشناس محیط زیست", "مهندس کشاورزی", "مدیر منابع طبیعی", "پژوهشگر پایداری"],
  };

  const showModals = async () => {
    // بررسی ورود کاربر
    if (!user) {
      await MySwal.fire({
        title: "نیاز به ورود",
        text: "جهت ثبت نام در فرایند شناسایی پانصد مدیر جوان لازم است وارد حساب کاربری خود شوید.",
        showCancelButton: true,
        confirmButtonText: "ورود به حساب کاربری",
        cancelButtonText: "لغو",
        showDenyButton: true,
        denyButtonText: "ایجاد حساب کاربری",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/logIn");
        } else if (result.isDenied) {
          navigate("/signUpForm");
        }
      });
      return;
    }

    // مودال اول: شرایط و قوانین
    const termsResult = await MySwal.fire({
      title: "شرایط و قوانین",
      html: `
        <div class="terms-modal-content">
          <p>لطفاً شرایط و قوانین زیر را به دقت مطالعه کنید:</p>
          <ul>
            <li>شما باید در زمان مقرر در آزمون شرکت کنید.</li>
            <li>هرگونه تقلب منجر به رد صلاحیت شما خواهد شد.</li>
            <li>اطلاعات شما نزد ما محفوظ خواهد ماند.</li>
          </ul>
          <div class="checkbox-container">
            <input type="checkbox" id="terms-checkbox" />
            <label for="terms-checkbox">با شرایط و قوانین موافق هستم</label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "تأیید",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const checkbox = document.getElementById("terms-checkbox");
        if (!checkbox.checked) {
          MySwal.showValidationMessage("لطفاً با شرایط و قوانین موافق باشید.");
          return false;
        }
        return true;
      },
    });

    if (!termsResult.isConfirmed) return;

    // مودال دوم: توضیحات با چک‌باکس
    const acceptanceResult = await MySwal.fire({
      title: "تأیید توضیحات",
      html: `
        <div class="acceptance-modal-content">
          <p>لطفاً توضیحات زیر را مطالعه کرده و تأیید کنید:</p>
          <p>این آزمون به منظور شناسایی مدیران جوان و با استعداد طراحی شده است و شرکت در آن نیازمند رعایت تمامی قوانین و شرایط اعلام‌شده می‌باشد.</p>
          <div class="checkbox-container">
            <input type="checkbox" id="acceptance-checkbox" />
            <label for="acceptance-checkbox">شرایط را مطالعه کرده و مورد پذیرش این‌جانب می‌باشد</label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "تأیید",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const checkbox = document.getElementById("acceptance-checkbox");
        if (!checkbox.checked) {
          MySwal.showValidationMessage("لطفاً تأیید کنید که شرایط را مطالعه کرده‌اید.");
          return false;
        }
        return true;
      },
    });

    if (!acceptanceResult.isConfirmed) return;

    // مودال سوم: انتخاب حوزه کلیدی
    const domainResult = await MySwal.fire({
      title: "انتخاب حوزه کلیدی",
      html: `
        <div class="domain-modal-content">
          <label for="domain-select">حوزه کلیدی:</label>
          <select id="domain-select" class="swal2-select">
            <option value="" disabled selected>یک حوزه انتخاب کنید</option>
            <option value="نفت و انرژی">نفت و انرژی</option>
            <option value="سلامت و رفاه اجتماعی">سلامت و رفاه اجتماعی</option>
            <option value="سیاسی، روابط بین‌الملل و دیپلماسی">سیاسی، روابط بین‌الملل و دیپلماسی</option>
            <option value="اقتصاد، بانکداری و بیمه">اقتصاد، بانکداری و بیمه</option>
            <option value="فناوری اطلاعات و ارتباطات">فناوری اطلاعات و ارتباطات</option>
            <option value="فرهنگ، جوانان و گردشگری">فرهنگ، جوانان و گردشگری</option>
            <option value="صنعت و معدن">صنعت و معدن</option>
            <option value="برنامه و بودجه">برنامه و بودجه</option>
            <option value="آموزش، علوم و فناوری">آموزش، علوم و فناوری</option>
            <option value="حکمرانی، نظام اداری و مدیریت شرکتی">حکمرانی، نظام اداری و مدیریت شرکتی</option>
            <option value="امور زیربنایی و حمل و نقل">امور زیربنایی و حمل و نقل</option>
            <option value="محیط زیست و کشاورزی">محیط زیست و کشاورزی</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "تأیید",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const domain = document.getElementById("domain-select").value;
        if (!domain) {
          MySwal.showValidationMessage("لطفاً یک حوزه کلیدی انتخاب کنید.");
          return false;
        }
        return domain;
      },
    });

    if (!domainResult.isConfirmed) return;
    const selectedDomain = domainResult.value;

    // مودال چهارم: نمایش حوزه کلیدی و انتخاب شغل کلیدی
    const jobResult = await MySwal.fire({
      title: "انتخاب شغل کلیدی",
      html: `
        <div class="job-modal-content">
          <p>حوزه کلیدی انتخاب‌شده: <strong>${selectedDomain}</strong></p>
          <label for="job-select">شغل کلیدی:</label>
          <select id="job-select" class="swal2-select">
            <option value="" disabled selected>یک شغل انتخاب کنید</option>
            ${keyJobsByDomain[selectedDomain]
              .map((job) => `<option value="${job}">${job}</option>`)
              .join("")}
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "تأیید",
      cancelButtonText: "انصراف",
      preConfirm: () => {
        const job = document.getElementById("job-select").value;
        if (!job) {
          MySwal.showValidationMessage("لطفاً یک شغل کلیدی انتخاب کنید.");
          return false;
        }
        return job;
      },
    });

    if (!jobResult.isConfirmed) return;

    // مودال پنجم: بررسی دوربین
    const cameraResult = await MySwal.fire({
      title: "دستگاه شما",
      text: "آیا دستگاه شما مجهز به دوربین است؟",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!cameraResult.isConfirmed) return;

    // مودال ششم: بررسی میکروفون
    const micResult = await MySwal.fire({
      title: "دستگاه شما",
      text: "آیا دستگاه شما مجهز به میکروفون است؟",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!micResult.isConfirmed) return;

    // ذخیره وضعیت تأیید در localStorage
    localStorage.setItem("registrationConfirmed", "true");

    // هدایت به کامپوننت PaymentGateway
    navigate("/payment");
  };

  return (
    <div className="registration-modals-container">
      <button className="blur-overlay-button" onClick={showModals}>
        ثبت‌نام در آزمون تست‌های روانشناختی
      </button>
    </div>
  );
};

export default RegistrationModals;