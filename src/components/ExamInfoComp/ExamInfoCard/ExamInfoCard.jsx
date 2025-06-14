//#region for dynamic

// import "./ExamInfoCard.scss";

// const ExamInfoCard = ({
//   startDate,
//   endDate,
//   cardIssueDate,
//   eventDate,
//   toPersianDigits,
//   examName,
// }) => {
//   return (
//     <div className="registration-card">
//       <h2> {examName} </h2>
//       <ul className="registration-card-list">
//         <li>
//           <strong>تاریخ شروع ثبت‌نام:</strong>
//           {toPersianDigits(startDate.format("jYYYY/jMM/jDD"))}
//         </li>
//         <li>
//           <strong>تاریخ پایان ثبت‌نام:</strong>
//           {toPersianDigits(endDate.format("jYYYY/jMM/jDD"))}
//         </li>
//         <li>
//           <strong>تاریخ دریافت کارت:</strong>
//           {toPersianDigits(cardIssueDate.format("jYYYY/jMM/jDD"))}
//         </li>
//         <li>
//           <strong>تاریخ برگزاری آزمون:</strong>
//           {toPersianDigits(eventDate.format("jYYYY/jMM/jDD"))}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default ExamInfoCard;
//#endregionendregion

import "./ExamInfoCard.scss";

const ExamInfoCard = ({
  startDate,
  endDate,
  cardIssueDate,
  eventDate,
  examName,
  description,
}) => {
  return (
    <div className="registration-card">
      <h2>{examName}</h2>
      <ul className="registration-card-list">
        <li>
          <strong>تاریخ شروع ثبت‌نام:</strong> {startDate}
        </li>
        <li>
          <strong>تاریخ پایان ثبت‌نام:</strong> {endDate}
        </li>
        <li>
          <strong>تاریخ دریافت کارت:</strong> {cardIssueDate}
        </li>
        <li>
          <strong>تاریخ برگزاری آزمون:</strong> {eventDate}
        </li>
       
      </ul>
    </div>
  );
};

export default ExamInfoCard;
