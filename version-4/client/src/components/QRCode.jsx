// Generates a scannable QR code client-side from any text/URL — used for
// donation links that don't have a pre-made QR image (e.g. Venmo, until a
// real handle replaces the placeholder below).
import { useEffect, useState } from "react";
import QRCodeLib from "qrcode";

function QRCode({ value, alt, size = 200 }) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    QRCodeLib.toDataURL(value, { width: size, margin: 1 }).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!dataUrl) {
    return <div className="qr-placeholder" style={{ width: size, height: size }} />;
  }

  return <img className="qr-code" src={dataUrl} alt={alt} width={size} height={size} />;
}

export default QRCode;
