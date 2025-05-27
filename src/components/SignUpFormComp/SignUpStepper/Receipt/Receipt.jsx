import React from "react";
import candidateData from "../../../ExamCardFile/data.json";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./Receipt.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Receipt = ({ onClose }) => {
  return (
    <Container fluid className="receipt-modal">
      <Container className="mt-3 Receipt-card-body position-relative">
        {/* دکمه ضربدر */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <Row className="card-title">
          <h4>رسید ثبت نام داوطلب</h4>
        </Row>

        <Card className="header-card">
          <Card.Body>
            <Row className="headerRow">
              <Col md={9}>
                <Row className="d-flex justify-content-center">
                  <div className="applicant-code mt-3">
                    <strong className="row d-flex justify-content-center">
                      نام و نام خانوادگی{" "}
                      <span>
                        {candidateData.firstName} {candidateData.lastName}
                      </span>
                    </strong>
                  </div>
                </Row>
              </Col>
              <Col md={3}>
                <Row className="d-flex justify-content-center ">
                  <div className="personal-img-div d-flex justify-content-center">
                    <Image
                      src={candidateData.logo}
                      alt="personal photo"
                      fluid
                    />
                  </div>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="info-div-col personalInfo">
          <Col md={3} className="info-div">
            <div className="mt-1">
              <label>
                کد ملی: <span>{candidateData.nationalCode}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                جنسیت: <span>{candidateData.gender}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                تاریخ تولد: <span>{candidateData.birthDate}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                سن: <span>{candidateData.age}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                نام پدر: <span>{candidateData.fatherName}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                تلفن: <span>{candidateData.phone}</span>
              </label>
            </div>
          </Col>

          <Col md={3} className="info-div">
            <div className="mt-1">
              <label>
                شماره شناسنامه: <span>{candidateData.BirthCertificate}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                محل تولد: <span>{candidateData.placeOfBirth}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                مدرک تحصیلی: <span>{candidateData.EducationalLevel}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                رشته تحصیلی: <span>{candidateData.fieldOfStudy}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                وضعیت تاهل: <span>{candidateData.Marriage}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                شماره همراه: <span>{candidateData.mobile}</span>
              </label>
            </div>
          </Col>

          <Col md={3} className="info-div">
            <div className="mt-1">
              <label>
                کد پستی: <span>{candidateData.postCode}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                آدرس: <span className="wrap-text">{candidateData.address}</span>
              </label>
            </div>
          </Col>
        </Row>

        <div className="info-div-col">
          <Row>
            <small>
              ثبت نام شما در دوازدهمین آزمون مشترک با موفقیت انجام شد.
            </small>
          </Row>
          <Row>
            <small>
              مبلغ پرداخت شده: <span>{candidateData.amountPaid}</span>
            </small>
          </Row>
          <Row>
            <label>
              کد رهگیری پرداخت شما: <span>{candidateData.paymentCode}</span>
            </label>
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default Receipt;
