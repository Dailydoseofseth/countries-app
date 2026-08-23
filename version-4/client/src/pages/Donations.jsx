// "SUPPORT PAGE": Cash App / Venmo / Zelle donation options.
import { Link } from "react-router-dom";

import QRCode from "../components/QRCode";
import { useLanguage } from "../context/LanguageContext";

function Donations() {
  const { t } = useLanguage();

  return (
    <div className="donations-page">
      <Link to="/" className="back-btn">
        {t("back")}
      </Link>

      <h1 className="donations-heading">{t("donationsHeading")}</h1>
      <p className="donations-intro">{t("donationsIntro")}</p>

      <div className="donations-grid">
        {/* CASH APP — real QR, live handle */}
        <div className="donation-card donation-card--cashapp">
          <div className="donation-icon">☕</div>
          <h2>{t("cashappTitle")}</h2>
          <img
            className="donation-qr"
            src="/cashapp-qr.png"
            alt="Cash App QR code for $PeepsHelpingPeeps"
          />
          <p className="donation-caption">{t("cashappCaption")}</p>
          <p className="donation-handle">$PeepsHelpingPeeps</p>
        </div>

        {/* VENMO — real QR, live handle */}
        <div className="donation-card donation-card--venmo">
          <div className="donation-icon">🪙</div>
          <h2>{t("venmoTitle")}</h2>
          <QRCode
            value="https://venmo.com/u/Seth-Patterson-38"
            alt="Venmo QR code for @Seth-Patterson-38"
          />
          <p className="donation-caption">{t("venmoCaption")}</p>
          <p className="donation-handle">@Seth-Patterson-38</p>
        </div>

        {/* ZELLE — real QR (from the banking app's own share flow), live contact */}
        <div className="donation-card donation-card--zelle">
          <div className="donation-icon">💸</div>
          <h2>{t("zelleTitle")}</h2>
          <img
            className="donation-qr"
            src="/zelle-qr.png"
            alt="Zelle QR code for oldbrasstoes@gmail.com"
          />
          <p className="donation-caption">{t("zelleCaption")}</p>
          <p className="donation-handle">oldbrasstoes@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Donations;
