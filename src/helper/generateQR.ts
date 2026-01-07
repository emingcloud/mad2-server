import qr from "qrcode";
export default function generateQR(data: string) {
  qr.toDataURL(data, function (err, url) {
    return url;
  });
}
