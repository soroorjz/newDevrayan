import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // آیکون‌های تیک و نکته
import "./ProcessDescriptionModal.scss";

const MySwal = withReactContent(Swal);

const ProcessDescriptionModal = () => {
  const showModal = () => {
    MySwal.fire({
      title: "فرآیند سنجش در برنامه تربیت پانصد مدیر جوان و کارآمد",
      html: `
        <div class="process-description-content">
          <h2>برنامه "تربیت پانصد مدیر جوان و کارآمد"</h2>
          <p>این برنامه با هدف شناسایی و پرورش استعدادهای مدیریتی در دستگاه‌های اجرایی طراحی شده است. فرآیند سنجش به صورت سه‌مرحله‌ای و نظام‌مند انجام می‌شود تا تنها افراد واجد شرایط و دارای شایستگی‌های لازم وارد برنامه شوند.</p>

          <h2>مراحل سنجش داوطلبان</h2>
          <div class="stage-section">
            <h3>1. مرحله اول: سنجش تناسب شغل و شخصیت</h3>
            <p><strong>هدف:</strong> ارزیابی انطباق ویژگی‌های شخصیتی داوطلب با الزامات مدیریتی.</p>
            <p><strong>شرایط قبولی:</strong></p>
            <ul>
              <li>موفقیت در این آزمون، شرط لازم برای ورود به مرحله بعد است.</li>
              <li>هزینه آزمون بر عهده داوطلب است.</li>
            </ul>
            <p><strong>نحوه اجرا:</strong> توسط مرکز آموزش مدیریت دولتی و با همکاری کانون‌های ارزیابی شایستگی انجام می‌شود.</p>
          </div>

          <div class="stage-section">
            <h3>2. مرحله دوم: سنجش شایستگی‌های عمومی</h3>
            <p><strong>شایستگی‌های مورد ارزیابی (طبق جدول شماره ۳ سند):</strong></p>
            <ul>
              <li>تفکر سیستمی</li>
              <li>تفکر راهبردی و آینده‌نگری</li>
              <li>مسئولیت‌پذیری و پاسخگویی</li>
              <li>تاب‌آوری و انعطاف‌پذیری</li>
              <li>مدیریت منابع</li>
              <li>و سایر مهارت‌های رفتاری فردی</li>
            </ul>
            <p><strong>شرایط قبولی:</strong> کسب حداقل 70% از امتیاز کل آزمون.</p>
            <p><strong>نتیجه:</strong> افراد واجد شرایط به مرحله سوم معرفی می‌شوند.</p>
          </div>

          <div class="stage-section">
            <h3>3. مرحله سوم: سنجش شایستگی‌های اختصاصی</h3>
            <p><strong>ارزیابی توسط:</strong> دستگاه اجرایی مربوطه.</p>
            <p><strong>شایستگی‌های مورد سنجش:</strong></p>
            <ul>
              <li>متقاعدسازی و قدرت اقناع</li>
              <li>کار تیمی و شبکه‌سازی</li>
              <li>مشارکت‌پذیری</li>
              <li>شناخت چالش‌های مدیریتی دستگاه اجرایی</li>
            </ul>
            <p><strong>شرایط قبولی:</strong> کسب حداقل 60% از امتیاز کل آزمون.</p>
            <p><strong>امتیاز نهایی:</strong> ترکیب 60% شایستگی‌های عمومی + 40% شایستگی‌های اختصاصی.</p>
          </div>

          <h2>نحوه انتخاب نهایی و ورود به برنامه</h2>
          <p>پس از اتمام مراحل ارزیابی، سازمان اداری و استخدامی کشور بر اساس امتیاز کل داوطلبان و سهمیه هر دستگاه اجرایی، افراد واجد شرایط را برای شرکت در برنامه معرفی می‌کند.</p>
          <p><strong>سهمیه‌ها:</strong> حداقل 30% از سهمیه‌ها به زنان اختصاص دارد.</p>

          <h2>جمع‌بندی</h2>
          <p>فرآیند سنجش این برنامه به گونه‌ای طراحی شده است که:</p>
          <ul>
            <li><FaCheckCircle /> از روش‌های علمی و استاندارد برای ارزیابی استفاده می‌کند.</li>
            <li><FaCheckCircle /> شایستگی‌های عمومی و تخصصی را به صورت دقیق می‌سنجد.</li>
            <li><FaCheckCircle /> شفافیت و انصاف در گزینش را تضمین می‌کند.</li>
          </ul>
          <p>در صورت موفقیت در این مراحل، داوطلبان وارد دوره آموزشی-تربیتی خواهند شد که شامل کارگاه‌ها، پروژه‌های عملی، و مربی‌گری است.</p>

          <h2>نکته مهم</h2>
          <p><FaExclamationCircle /> عدم کسب حدنصاب در هر مرحله به معنای حذف از فرآیند است، اما در برخی موارد (مانند ارزیابی دوره‌های آموزشی) امکان تکرار وجود دارد.</p>
        </div>
      `,
      confirmButtonText: "بستن",
      customClass: {
        popup: "process-description-modal",
        title: "process-description-title",
        htmlContainer: "process-description-html",
        confirmButton: "process-description-confirm-btn",
      },
      didOpen: () => {
        const content = document.querySelector(".process-description-html");
        if (content && content.scrollHeight > content.clientHeight) {
          content.style.overflowY = "auto";
          content.style.maxHeight = "400px";
        }
      },
    });
  };

  return (
    <button onClick={showModal}>توضیحات فرایند سنجش</button>
  );
};

export default ProcessDescriptionModal;