
// import "./ReportModal.scss";
import Swal from "sweetalert2";
const ReportModal = ({ trackingCode }) => {
  Swal.fire({
    title: "کد پیگیری اعتراض",
    html: `
      <p class="tracking-code">${trackingCode}</p>
      <p class="tracking-desc">اطلاعات شما با موفقیت ثبت گردید. در صورت لزوم با شما تماس گرفته می‌شود.</p>
      <a href="/" class="home-button" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
      ">صفحه آغازین</a>
    `,
    icon: "success",
    showConfirmButton: false,
    allowOutsideClick: true,
    customClass:{
      popup:"swal-custom-popup"
    }
  });
};

export default ReportModal;
