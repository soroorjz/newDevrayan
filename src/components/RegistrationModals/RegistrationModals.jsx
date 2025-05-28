import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../../AuthContext";
import "./RegistrationModals.scss";
import ProcessDescriptionModal from "../HomePageComp/NavbarTop/ProcessDescriptionModal/ProcessDescriptionModal";

const MySwal = withReactContent(Swal);

const RegistrationModals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showProcessModal, setShowProcessModal] = useState(false); // state برای نمایش مودال

  // تابع برای باز کردن مودال ProcessDescriptionModal
  window.openProcessDescriptionModal = () => {
    setShowProcessModal(true);
  };

  // تابع برای بستن مودال (اختیاری، بسته به طراحی ProcessDescriptionModal)
  const closeProcessModal = () => {
    setShowProcessModal(false);
  };

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
        customClass: {
          popup: "registration-modal",
          title: "registration-modal-title",
          htmlContainer: "registration-modal-html",
          confirmButton: "registration-modal-confirm-btn",
          cancelButton: "registration-modal-cancel-btn",
          denyButton: "registration-modal-deny-btn",
        },
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
          <p>لطفاً شرایط و قوانین زیر را به دقت مطالعه و تأیید کنید:</p>
          <ul>
            <li>داوطلب موظف است در زمان مقرر در آزمون شرکت کند.</li>
            <li>هرگونه تخلف یا تقلب در فرآیند ثبت‌نام یا آزمون منجر به رد صلاحیت داوطلب خواهد شد.</li>
            <li>اطلاعات شخصی، تحصیلی (دارای مدرک کارشناسی ارشد یا دکتری)، و سوابق کاری (حداقل ۴ سال، شامل حداقل ۲ سال تجربه مدیریتی) باید ارائه شود.</li>
            <li>محدودیت سنی: حداکثر ۴۰ سال برای دارندگان مدرک کارشناسی ارشد و ۴۵ سال برای دارندگان مدرک دکتری.</li>
            <li><strong>هشدار:</strong> در صورت عدم احراز شرایط فوق در هر مرحله از فرآیند (از جمله پیش از پرداخت یا پس از آن)، از ادامه فعالیت شما جلوگیری خواهد شد و سوابق فعالیتی شما قابل پیگیری یا استناد نخواهد بود.</li>
            <li>اطلاعات شما نزد ما محرمانه باقی خواهد ماند و صرفاً برای اهداف این برنامه استفاده می‌شود.</li>
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
      customClass: {
        popup: "registration-modal",
        title: "registration-modal-title",
        htmlContainer: "registration-modal-html",
        confirmButton: "registration-modal-confirm-btn",
        cancelButton: "registration-modal-cancel-btn",
      },
      preConfirm: () => {
        const checkbox = document.getElementById("terms-checkbox");
        if (!checkbox.checked) {
          MySwal.showValidationMessage("به منظور ادامه فرآیند، لطفاً شرایط و قوانین را مورد تأیید قرار دهید.");
          return false;
        }
        const userAge = 35;
        const userEducation = "کارشناسی ارشد";
        const workExperience = 5;
        const managementExperience = 2;

        if (
          (userEducation === "کارشناسی ارشد" && userAge > 40) ||
          (userEducation === "دکتری" && userAge > 45) ||
          workExperience < 4 ||
          managementExperience < 2
        ) {
          MySwal.showValidationMessage("شما شرایط سنی، تحصیلی یا سوابق کاری لازم را احراز نکرده‌اید.");
          return false;
        }
        return true;
      },
    });

    if (!termsResult.isConfirmed) return;

    // مودال دوم: تأیید توضیحات
    const acceptanceResult = await MySwal.fire({
      title: "تأیید توضیحات",
      html: `
        <div class="acceptance-modal-content">
          <p>داوطلب گرامی، لطفاً توضیحات زیر را مطالعه کنید:</p>
          <p>فرآیند سنجش برنامه "تربیت 500 مدیر جوان و کارآمد" با هدف شناسایی استعدادهای مدیریتی، به‌صورت سه‌مرحله‌ای (سنجش تناسب شغل، شایستگی‌های عمومی و اختصاصی) انجام می‌شود. موفقیت در آزمون‌ها (حداقل 70% و 60% امتیاز در مراحل دوم و سوم)، رعایت محدودیت سنی (40 سال برای ارشد، 45 سال برای دکتری) و داشتن حداقل 4 سال سابقه کاری (شامل 2 سال مدیریتی) الزامی است. انتخاب نهایی توسط سازمان اداری و استخدامی با سهمیه 30% برای زنان انجام می‌شود. در صورت موفقیت، دوره آموزشی شامل کارگاه‌ها و مربی‌گری برگزار خواهد شد.</p>
          <p><strong>نکته:</strong> عدم کسب حدنصاب در هر مرحله منجر به حذف می‌شود، اما در برخی موارد امکان تکرار وجود دارد. برای اطلاعات بیشتر، <span class="process-description-link" onclick="window.openProcessDescriptionModal()">توضیحات فرایند سنجش</span> را مشاهده کنید.</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "تأیید",
      cancelButtonText: "انصراف",
      customClass: {
        popup: "registration-modal",
        title: "registration-modal-title",
        htmlContainer: "registration-modal-html",
        confirmButton: "registration-modal-confirm-btn",
        cancelButton: "registration-modal-cancel-btn",
      },
      preConfirm: () => {
        return true; // بدون چک‌باکس، فقط تأیید ساده
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
      customClass: {
        popup: "registration-modal",
        title: "registration-modal-title",
        htmlContainer: "registration-modal-html",
        confirmButton: "registration-modal-confirm-btn",
        cancelButton: "registration-modal-cancel-btn",
      },
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
      customClass: {
        popup: "registration-modal",
        title: "registration-modal-title",
        htmlContainer: "registration-modal-html",
        confirmButton: "registration-modal-confirm-btn",
        cancelButton: "registration-modal-cancel-btn",
      },
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
      customClass: {
        popup: "registration-modal",
        title: "registration-modal-title",
        htmlContainer: "registration-modal-html",
        confirmButton: "registration-modal-confirm-btn",
        cancelButton: "registration-modal-cancel-btn",
      },
    });

    if (!cameraResult.isConfirmed) return;

    // مودال ششم: بررسی میکروفون
    const micResult = await MySwal.fire({
      title: "دستگاه شما",
      text: "آیا دستگاه شما مجهز به میکروفون است؟",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      customClass: {
        popup: "registration-modal",
        title: "registration-modal-title",
        htmlContainer: "registration-modal-html",
        confirmButton: "registration-modal-confirm-btn",
        cancelButton: "registration-modal-cancel-btn",
      },
    });

    if (!micResult.isConfirmed) return;

    // مودال جدید: انتقال به درگاه پرداخت با پروسس بار
    const paymentTransitionResult = await MySwal.fire({
      title: "انتقال به درگاه پرداخت",
      html: `
        <div class="payment-transition-content">
          <div class="progress-bar"></div>
          <p>لطفاً چند لحظه صبر کنید...</p>
        </div>
      `,
      showConfirmButton: false, // دکمه تأیید نمایش داده نمی‌شه
      showCancelButton: false, // دکمه لغو نمایش داده نمی‌شه
      customClass: {
        popup: "registration-modal",
        title: "registration-modal-title",
        htmlContainer: "registration-modal-html",
      },
      timer: 3000, // 3 ثانیه
      timerProgressBar: true, // نمایش پروگرس بار
      didOpen: () => {
        Swal.showLoading(); // فعال کردن انیمیشن بارگذاری
      },
      willClose: () => {
        // بعد از بستن، به درگاه پرداخت هدایت می‌شه
        localStorage.setItem("registrationConfirmed", "true");
        navigate("/payment");
      },
    });

    // ذخیره وضعیت تأیید در localStorage
    // (این خط به willClose منتقل شد تا فقط بعد از اتمام پروسس اجرا بشه)
  };

  return (
    <div className="registration-modals-container">
      <button className="blur-overlay-button" onClick={showModals}>
        ثبت‌نام در آزمون تست‌های روانشناختی
      </button>
      {showProcessModal && <ProcessDescriptionModal onClose={closeProcessModal} />}
    </div>
  );
};

export default RegistrationModals;