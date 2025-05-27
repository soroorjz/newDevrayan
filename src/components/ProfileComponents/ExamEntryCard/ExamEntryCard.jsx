import "./ExamEntryCard.scss";

const user = {
  fullName: "محمد معروفی",
  fatherName: "احمد",
  nationalCode: "0015838791",
  birthDate: "۱۳۷۵/۰۵/۲۰",
  religion: "اسلام (شیعه)",
  leftHand: false,
  preRegisterCode: "1802142",
};

const exam = {
  name: " در یازدهمین آزمون مشترک دستگاه های اجرایی",
  date: "۱۴۰۲/۱۲/۱۵",
  province: "تهران",
  zone: "حوزه ۵",
  address: "خیابان آزادی، دانشگاه صنعتی شریف",
  needSecretary: false,
};

const qrCode = "/assets/images/QrCode.png";

const ExamEntryCard = () => {
  return (
    <div className="Evaluationexam-entry-card">
      <h2 className="exam-entry-card__title">کارت ورود به ارزیابی تکمیلی</h2>
      <div className="exam-entry-card__content">
        <div className="exam-entry-card__info">
          <div className="exam-entry-card__profile">
            <div className="exam-entry-card__profile-image">

              <img className="ExamEntryCardImg" src="/assets/images/shxfdb.jpg" alt="" />
            </div>
            <p className="exam-entry-card__profile-name">{user.fullName}</p>
          </div>
          <p className="exam-entry-card__code">
            شماره داوطلب: {user.preRegisterCode}
          </p>
          <div className="exam-entry-card__qr">
            <img src={qrCode} alt="QR Code" />
          </div>
        </div>
        <div className="exam-entry-card__details">
          <p>نام و نام خانوادگی: {user.fullName}</p>
          <p>نام پدر: {user.fatherName}</p>
          <p>کد ملی: {user.nationalCode}</p>
          <p>تاریخ تولد: {user.birthDate}</p>
          <p>دین: {user.religion}</p>
          <p>چپ دست: {user.leftHand ? "بله" : "خیر"}</p>
          <p>عنوان آزمون: {exam.name}</p>
          <p>تاریخ آزمون: {exam.date}</p>
          <p>استان محل آزمون: {exam.province}</p>
          <p>حوزه: {exam.zone}</p>
          <p>آدرس حوزه: {exam.address}</p>
          <p>نیاز به منشی: {exam.needSecretary ? "بله" : "خیر"}</p>
        </div>
        <div className="signingPart">
          <div className="fingerPrint">اثر انگشت داوطلب</div>
          <div className="sign"> امضا داوطلب</div>
        </div>
      </div>
    </div>
  );
};

export default ExamEntryCard;
